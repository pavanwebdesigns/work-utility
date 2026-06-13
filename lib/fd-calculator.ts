export type CompoundingFrequency = "monthly" | "quarterly" | "yearly";

export type FdResult = {
  principal: number;
  maturityAmount: number;
  interestEarned: number;
  effectiveAnnualRate: number;
  tenureYears: number;
  yearlyGrowth: { year: number; amount: number }[];
};

export function tenureToYears(
  value: number,
  unit: "months" | "years"
): number {
  if (value <= 0) return 0;
  return unit === "months" ? value / 12 : value;
}

function getCompoundingPeriodsPerYear(frequency: CompoundingFrequency): number {
  switch (frequency) {
    case "monthly":
      return 12;
    case "quarterly":
      return 4;
    case "yearly":
      return 1;
  }
}

export function calculateFdReturns(
  principal: number,
  annualRatePercent: number,
  tenureYears: number,
  frequency: CompoundingFrequency
): FdResult | null {
  if (principal <= 0 || tenureYears <= 0 || annualRatePercent < 0) {
    return null;
  }

  const n = getCompoundingPeriodsPerYear(frequency);
  const r = annualRatePercent / 100;
  const maturityAmount = principal * Math.pow(1 + r / n, n * tenureYears);
  const interestEarned = maturityAmount - principal;
  const effectiveAnnualRate = (Math.pow(maturityAmount / principal, 1 / tenureYears) - 1) * 100;

  const yearlyGrowth: { year: number; amount: number }[] = [];
  const totalYears = Math.max(1, Math.ceil(tenureYears));

  for (let year = 1; year <= totalYears; year++) {
    const elapsedYears = Math.min(year, tenureYears);
    yearlyGrowth.push({
      year,
      amount: principal * Math.pow(1 + r / n, n * elapsedYears),
    });
  }

  return {
    principal,
    maturityAmount,
    interestEarned,
    effectiveAnnualRate,
    tenureYears,
    yearlyGrowth,
  };
}
