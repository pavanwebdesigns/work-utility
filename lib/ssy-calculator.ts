export type SsyYearRow = {
  year: number;
  girlAge: number;
  deposit: number;
  interest: number;
  balance: number;
};

export type SsyResult = {
  annualInvestment: number;
  girlCurrentAge: number;
  interestRate: number;
  accountOpenYear: number;
  depositEndYear: number;
  maturityYear: number;
  partialWithdrawalYear: number;
  totalDeposited: number;
  totalInterest: number;
  maturityAmount: number;
  partialWithdrawalAmount: number;
  yearRows: SsyYearRow[];
};

export const SSY_DEFAULT_RATE = 8.2;
export const SSY_DEPOSIT_YEARS = 15;
export const SSY_MATURITY_YEARS = 21;
export const SSY_MIN_INVESTMENT = 250;
export const SSY_MAX_INVESTMENT = 150_000;
export const SSY_MAX_GIRL_AGE = 10;

export const SSY_DISCLAIMER =
  "SSY interest rates are revised quarterly by the Government. Current rate: 8.2% for Q1 FY2026-27. Verify current rate at nsiindia.gov.in before investing.";

export function calculateSsy(
  annualInvestment: number,
  girlCurrentAge: number,
  interestRatePercent: number,
  accountOpenYear = new Date().getFullYear(),
): SsyResult | null {
  if (
    annualInvestment < SSY_MIN_INVESTMENT ||
    annualInvestment > SSY_MAX_INVESTMENT ||
    girlCurrentAge < 0 ||
    girlCurrentAge > SSY_MAX_GIRL_AGE ||
    interestRatePercent < 0
  ) {
    return null;
  }

  const rate = interestRatePercent / 100;
  const yearRows: SsyYearRow[] = [];
  let balance = 0;
  let totalDeposited = 0;
  let partialWithdrawalAmount = 0;

  for (let year = 1; year <= SSY_MATURITY_YEARS; year++) {
    const deposit = year <= SSY_DEPOSIT_YEARS ? annualInvestment : 0;
    balance += deposit;
    totalDeposited += deposit;
    const interest = balance * rate;
    balance += interest;

    const girlAge = girlCurrentAge + year;
    yearRows.push({
      year,
      girlAge,
      deposit,
      interest,
      balance,
    });

    if (girlAge === 18) {
      const prevBalance = yearRows[year - 2]?.balance ?? 0;
      partialWithdrawalAmount = prevBalance * 0.5;
    }
  }

  const maturityAmount = balance;
  const totalInterest = maturityAmount - totalDeposited;

  return {
    annualInvestment,
    girlCurrentAge,
    interestRate: interestRatePercent,
    accountOpenYear,
    depositEndYear: accountOpenYear + SSY_DEPOSIT_YEARS,
    maturityYear: accountOpenYear + SSY_MATURITY_YEARS,
    partialWithdrawalYear: accountOpenYear + (18 - girlCurrentAge),
    totalDeposited,
    totalInterest,
    maturityAmount,
    partialWithdrawalAmount,
    yearRows,
  };
}
