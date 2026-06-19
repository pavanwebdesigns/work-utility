import { calculateEmi, tenureToMonths } from "@/lib/emi-calculator";

export type LoanType =
  | "home"
  | "personal"
  | "car"
  | "education";

export const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  home: "Home Loan",
  personal: "Personal Loan",
  car: "Car Loan",
  education: "Education Loan",
};

export const FOIR_CONSERVATIVE = 0.4;
export const FOIR_OPTIMISTIC = 0.5;

export type EligibilityStatus =
  | "eligible"
  | "marginally_eligible"
  | "exceeds_recommended";

export type LoanEligibilityResult = {
  maxEmiConservative: number;
  maxEmiOptimistic: number;
  maxLoanConservative: number;
  maxLoanOptimistic: number;
  desiredEmi: number | null;
  totalEmiWithDesired: number;
  foirWithDesired: number;
  status: EligibilityStatus;
  comfortableLoanAmount: number;
};

export function calculateMaxEmiCapacity(
  monthlyIncome: number,
  existingEmis: number,
  foir: number
): number {
  if (monthlyIncome <= 0) return 0;
  return Math.max(0, monthlyIncome * foir - existingEmis);
}

export function calculateMaxLoanFromEmi(
  maxEmi: number,
  annualRatePercent: number,
  tenureMonths: number
): number {
  if (maxEmi <= 0 || tenureMonths <= 0 || annualRatePercent < 0) return 0;

  const monthlyRate = annualRatePercent / 12 / 100;
  if (monthlyRate === 0) return maxEmi * tenureMonths;

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  return (maxEmi * (factor - 1)) / (monthlyRate * factor);
}

export function getEligibilityStatus(
  desiredEmi: number,
  monthlyIncome: number,
  existingEmis: number
): EligibilityStatus {
  if (monthlyIncome <= 0) return "exceeds_recommended";
  const totalEmi = desiredEmi + existingEmis;
  const foirRatio = totalEmi / monthlyIncome;
  if (foirRatio <= FOIR_CONSERVATIVE) return "eligible";
  if (foirRatio <= FOIR_OPTIMISTIC) return "marginally_eligible";
  return "exceeds_recommended";
}

export function calculateLoanEligibility(input: {
  monthlyIncome: number;
  existingEmis: number;
  desiredLoanAmount: number;
  annualRatePercent: number;
  tenureYears: number;
}): LoanEligibilityResult | null {
  const {
    monthlyIncome,
    existingEmis,
    desiredLoanAmount,
    annualRatePercent,
    tenureYears,
  } = input;

  if (monthlyIncome <= 0 || tenureYears <= 0) return null;

  const tenureMonths = tenureToMonths(tenureYears, "years");
  const maxEmiConservative = calculateMaxEmiCapacity(
    monthlyIncome,
    existingEmis,
    FOIR_CONSERVATIVE
  );
  const maxEmiOptimistic = calculateMaxEmiCapacity(
    monthlyIncome,
    existingEmis,
    FOIR_OPTIMISTIC
  );

  const maxLoanConservative = calculateMaxLoanFromEmi(
    maxEmiConservative,
    annualRatePercent,
    tenureMonths
  );
  const maxLoanOptimistic = calculateMaxLoanFromEmi(
    maxEmiOptimistic,
    annualRatePercent,
    tenureMonths
  );

  const desiredEmiResult =
    desiredLoanAmount > 0
      ? calculateEmi(desiredLoanAmount, annualRatePercent, tenureMonths)
      : null;
  const desiredEmi = desiredEmiResult?.emi ?? 0;
  const totalEmiWithDesired = desiredEmi + existingEmis;
  const foirWithDesired =
    monthlyIncome > 0 ? totalEmiWithDesired / monthlyIncome : 0;

  const status = getEligibilityStatus(
    desiredEmi,
    monthlyIncome,
    existingEmis
  );

  const comfortableLoanAmount = calculateMaxLoanFromEmi(
    maxEmiConservative,
    annualRatePercent,
    tenureMonths
  );

  return {
    maxEmiConservative,
    maxEmiOptimistic,
    maxLoanConservative,
    maxLoanOptimistic,
    desiredEmi: desiredEmiResult?.emi ?? null,
    totalEmiWithDesired,
    foirWithDesired,
    status,
    comfortableLoanAmount,
  };
}

export const ELIGIBILITY_STATUS_LABELS: Record<EligibilityStatus, string> = {
  eligible: "Eligible",
  marginally_eligible: "Marginally eligible",
  exceeds_recommended: "Exceeds recommended FOIR",
};
