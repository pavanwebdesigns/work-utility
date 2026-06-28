export type NpsYearRow = {
  year: number;
  age: number;
  invested: number;
  balance: number;
};

export type NpsTaxSavings = {
  annualContribution: number;
  ccd1Deduction: number;
  ccd1bDeduction: number;
  taxSavedCcd1At30: number;
  taxSavedCcd1bAt30: number;
  totalTaxSavedAt30: number;
};

export type NpsResult = {
  monthlyContribution: number;
  currentAge: number;
  retirementAge: number;
  investmentYears: number;
  expectedReturn: number;
  annuityPercent: number;
  annuityRate: number;
  totalInvested: number;
  corpus: number;
  lumpSumWithdrawal: number;
  annuityCorpus: number;
  monthlyPension: number;
  taxSavings: NpsTaxSavings;
  yearRows: NpsYearRow[];
};

export const NPS_DISCLAIMER =
  "Estimates based on PFRDA NPS guidelines. Actual returns are market-linked and not guaranteed. Monthly pension depends on the annuity rate offered by your Annuity Service Provider (ASP) at the time of retirement.";

const MIN_MONTHLY = 500;
const MAX_MONTHLY = 50_000;
const MIN_AGE = 18;
const MAX_AGE = 59;
const RETIREMENT_AGE = 60;
const CCD1_MAX = 150_000;
const CCD1B_MAX = 50_000;

function sipFutureValue(
  monthlyInvestment: number,
  annualRatePercent: number,
  months: number,
): number {
  if (months <= 0) return 0;
  const monthlyRate = annualRatePercent / 12 / 100;
  if (monthlyRate === 0) return monthlyInvestment * months;
  const growth = Math.pow(1 + monthlyRate, months);
  return monthlyInvestment * ((growth - 1) / monthlyRate) * (1 + monthlyRate);
}

function computeTaxSavings(annualContribution: number): NpsTaxSavings {
  const ccd1Deduction = Math.min(annualContribution, CCD1_MAX);
  const ccd1bDeduction = Math.min(CCD1B_MAX, annualContribution);
  const taxSavedCcd1At30 = ccd1Deduction * 0.3;
  const taxSavedCcd1bAt30 = ccd1bDeduction * 0.3;

  return {
    annualContribution,
    ccd1Deduction,
    ccd1bDeduction,
    taxSavedCcd1At30,
    taxSavedCcd1bAt30,
    totalTaxSavedAt30: taxSavedCcd1At30 + taxSavedCcd1bAt30,
  };
}

export function calculateNps(
  monthlyContribution: number,
  currentAge: number,
  expectedReturnPercent: number,
  annuityPercent: number,
  annuityRatePercent: number,
): NpsResult | null {
  if (
    monthlyContribution < MIN_MONTHLY ||
    monthlyContribution > MAX_MONTHLY ||
    currentAge < MIN_AGE ||
    currentAge > MAX_AGE ||
    expectedReturnPercent < 8 ||
    expectedReturnPercent > 14 ||
    annuityPercent < 40 ||
    annuityPercent > 100 ||
    annuityRatePercent < 0
  ) {
    return null;
  }

  const investmentYears = RETIREMENT_AGE - currentAge;
  const months = investmentYears * 12;
  const corpus = sipFutureValue(
    monthlyContribution,
    expectedReturnPercent,
    months,
  );
  const totalInvested = monthlyContribution * months;

  const effectiveAnnuityPercent = Math.max(40, annuityPercent);
  const annuityCorpus = corpus * (effectiveAnnuityPercent / 100);
  const lumpSumWithdrawal = corpus - annuityCorpus;
  const monthlyPension =
    (annuityCorpus * (annuityRatePercent / 100)) / 12;

  const yearRows: NpsYearRow[] = [];
  for (let year = 1; year <= investmentYears; year++) {
    const elapsedMonths = year * 12;
    const invested = monthlyContribution * elapsedMonths;
    const balance = sipFutureValue(
      monthlyContribution,
      expectedReturnPercent,
      elapsedMonths,
    );
    yearRows.push({
      year,
      age: currentAge + year,
      invested,
      balance,
    });
  }

  return {
    monthlyContribution,
    currentAge,
    retirementAge: RETIREMENT_AGE,
    investmentYears,
    expectedReturn: expectedReturnPercent,
    annuityPercent: effectiveAnnuityPercent,
    annuityRate: annuityRatePercent,
    totalInvested,
    corpus,
    lumpSumWithdrawal,
    annuityCorpus,
    monthlyPension,
    taxSavings: computeTaxSavings(monthlyContribution * 12),
    yearRows,
  };
}
