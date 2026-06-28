export type PpfFrequency = "yearly" | "monthly";

export type PpfYearRow = {
  year: number;
  investment: number;
  interest: number;
  balance: number;
};

export type PpfResult = {
  annualInvestment: number;
  tenureYears: number;
  interestRate: number;
  totalInvested: number;
  totalInterest: number;
  maturityValue: number;
  estimatedTaxSaved: number;
  yearRows: PpfYearRow[];
  partialWithdrawalEligibleFromYear: number;
  partialWithdrawalEligibleFy: string;
  loanEligibleFromYear: number;
  loanEligibleUntilYear: number;
  loanEligibleFromFy: string;
  loanEligibleUntilFy: string;
  extensionBlocks: number;
};

const MIN_INVESTMENT = 500;
const MAX_INVESTMENT = 150_000;

function fyLabel(startYear: number): string {
  const end = (startYear + 1) % 100;
  return `FY ${startYear}-${String(end).padStart(2, "0")}`;
}

export function calculatePpf(
  annualInvestment: number,
  tenureYears: number,
  interestRatePercent: number,
): PpfResult | null {
  if (
    annualInvestment < MIN_INVESTMENT ||
    annualInvestment > MAX_INVESTMENT ||
    tenureYears < 15 ||
    tenureYears > 50 ||
    interestRatePercent < 0
  ) {
    return null;
  }

  const r = interestRatePercent / 100;
  const yearRows: PpfYearRow[] = [];
  let balance = 0;
  let totalInvested = 0;

  for (let year = 1; year <= tenureYears; year++) {
    balance += annualInvestment;
    totalInvested += annualInvestment;
    const interest = balance * r;
    balance += interest;
    yearRows.push({
      year,
      investment: annualInvestment,
      interest,
      balance,
    });
  }

  const totalInterest = balance - totalInvested;
  const extensionBlocks =
    tenureYears > 15 ? Math.ceil((tenureYears - 15) / 5) : 0;

  const baseYear = 2026;
  const partialWithdrawalEligibleFromYear = 7;
  const loanEligibleFromYear = 3;
  const loanEligibleUntilYear = 6;

  return {
    annualInvestment,
    tenureYears,
    interestRate: interestRatePercent,
    totalInvested,
    totalInterest,
    maturityValue: balance,
    estimatedTaxSaved: totalInvested * 0.3,
    yearRows,
    partialWithdrawalEligibleFromYear,
    partialWithdrawalEligibleFy: fyLabel(baseYear + partialWithdrawalEligibleFromYear - 1),
    loanEligibleFromYear,
    loanEligibleUntilYear,
    loanEligibleFromFy: fyLabel(baseYear + loanEligibleFromYear - 1),
    loanEligibleUntilFy: fyLabel(baseYear + loanEligibleUntilYear - 1),
    extensionBlocks,
  };
}

export const PPF_DEFAULT_RATE = 7.1;
