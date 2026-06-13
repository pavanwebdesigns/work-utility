export type EmiResult = {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  principal: number;
};

export function calculateEmi(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number
): EmiResult | null {
  if (principal <= 0 || tenureMonths <= 0 || annualRatePercent < 0) {
    return null;
  }

  const monthlyRate = annualRatePercent / 12 / 100;

  if (monthlyRate === 0) {
    const emi = principal / tenureMonths;
    return {
      emi,
      totalInterest: 0,
      totalAmount: principal,
      principal,
    };
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;

  return {
    emi,
    totalInterest,
    totalAmount,
    principal,
  };
}

export function tenureToMonths(value: number, unit: "months" | "years"): number {
  if (value <= 0) return 0;
  return unit === "years" ? Math.round(value * 12) : Math.round(value);
}
