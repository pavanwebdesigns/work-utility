export const HSA_LIMITS_2026 = {
  individual: 4_300,
  family: 8_550,
  catchUp: 1_000,
  catchUpAge: 55,
  minDeductibleIndividual: 1_650,
  minDeductibleFamily: 3_300,
  maxOopIndividual: 8_300,
  maxOopFamily: 16_600,
} as const;

export const HSA_DISCLAIMER =
  "Based on 2026 IRS HSA contribution limits. You must be enrolled in a qualifying High Deductible Health Plan (HDHP) to contribute to an HSA. Not financial advice.";

export type HsaCoverageType = "individual" | "family";

export type FederalBracket = 10 | 12 | 22 | 24 | 32;

export const HSA_FEDERAL_BRACKETS: FederalBracket[] = [10, 12, 22, 24, 32];

export type HsaResult = {
  coverageType: HsaCoverageType;
  currentAge: number;
  contribution: number;
  maxContribution: number;
  remainingRoom: number;
  catchUpEligible: boolean;
  catchUpAmount: number;
  federalBracket: number;
  stateTaxRate: number;
  federalTaxSavings: number;
  stateTaxSavings: number;
  totalTaxSavings: number;
  effectiveCost: number;
  expectedReturn: number;
  yearsUntilRetirement: number;
  projectedBalance: number;
  monthlyHealthcareBudget: number;
  annualHealthcareBudget: number;
  isCaOrNjWarning: boolean;
};

function futureValueAnnuity(
  annualPayment: number,
  annualRatePercent: number,
  years: number,
): number {
  if (years <= 0 || annualPayment <= 0) return 0;
  const r = annualRatePercent / 100;
  if (r === 0) return annualPayment * years;
  return annualPayment * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
}

export function getHsaMaxContribution(
  coverageType: HsaCoverageType,
  age: number,
): number {
  const base =
    coverageType === "individual"
      ? HSA_LIMITS_2026.individual
      : HSA_LIMITS_2026.family;
  const catchUp = age >= HSA_LIMITS_2026.catchUpAge ? HSA_LIMITS_2026.catchUp : 0;
  return base + catchUp;
}

export function calculateHsa(input: {
  coverageType: HsaCoverageType;
  currentAge: number;
  contribution: number;
  federalBracket: number;
  stateTaxRate: number;
  expectedReturn: number;
  yearsUntilRetirement?: number;
}): HsaResult | null {
  const {
    coverageType,
    currentAge,
    contribution,
    federalBracket,
    stateTaxRate,
    expectedReturn,
  } = input;

  if (
    currentAge < 18 ||
    currentAge > 64 ||
    contribution < 0 ||
    expectedReturn < 0
  ) {
    return null;
  }

  const maxContribution = getHsaMaxContribution(coverageType, currentAge);
  const catchUpEligible = currentAge >= HSA_LIMITS_2026.catchUpAge;
  const catchUpAmount = catchUpEligible ? HSA_LIMITS_2026.catchUp : 0;
  const yearsUntilRetirement =
    input.yearsUntilRetirement ?? Math.max(65 - currentAge, 1);

  const federalTaxSavings = contribution * (federalBracket / 100);
  const stateTaxSavings = contribution * (stateTaxRate / 100);
  const totalTaxSavings = federalTaxSavings + stateTaxSavings;
  const effectiveCost = contribution - totalTaxSavings;
  const projectedBalance = futureValueAnnuity(
    contribution,
    expectedReturn,
    yearsUntilRetirement,
  );
  const annualHealthcareBudget = projectedBalance * 0.04;
  const monthlyHealthcareBudget = annualHealthcareBudget / 12;

  return {
    coverageType,
    currentAge,
    contribution,
    maxContribution,
    remainingRoom: Math.max(0, maxContribution - contribution),
    catchUpEligible,
    catchUpAmount,
    federalBracket,
    stateTaxRate,
    federalTaxSavings,
    stateTaxSavings,
    totalTaxSavings,
    effectiveCost,
    expectedReturn,
    yearsUntilRetirement,
    projectedBalance,
    monthlyHealthcareBudget,
    annualHealthcareBudget,
    isCaOrNjWarning: false,
  };
}
