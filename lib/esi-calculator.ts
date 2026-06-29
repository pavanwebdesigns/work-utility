export const ESI_WAGE_CEILING = 21_000;
export const ESI_DISABLED_WAGE_CEILING = 25_000;
export const ESI_EMPLOYEE_RATE = 0.75;
export const ESI_EMPLOYER_RATE = 3.25;
export const ESI_TOTAL_RATE = 4;

export const ESI_DISCLAIMER =
  "ESI rates and wage ceiling per ESIC guidelines FY 2026-27. Professional Tax and EPF estimates are illustrative — verify with your employer.";

export type EsiEligibility = "applicable" | "not_applicable";

export type EsiResult = {
  monthlyGrossWages: number;
  isDisabled: boolean;
  eligibility: EsiEligibility;
  eligibilityMessage: string;
  employeeMonthly: number;
  employerMonthly: number;
  totalMonthly: number;
  employeeAnnual: number;
  employerAnnual: number;
  totalAnnual: number;
  estimatedProfessionalTax: number;
  estimatedEpfEmployee: number;
  estimatedNetTakeHome: number;
};

export function calculateEsi(
  monthlyGrossWages: number,
  isDisabled: boolean,
): EsiResult | null {
  if (monthlyGrossWages <= 0) return null;

  const ceiling = isDisabled ? ESI_DISABLED_WAGE_CEILING : ESI_WAGE_CEILING;
  const applicable = monthlyGrossWages <= ceiling;

  const employeeMonthly = applicable
    ? monthlyGrossWages * (ESI_EMPLOYEE_RATE / 100)
    : 0;
  const employerMonthly = applicable
    ? monthlyGrossWages * (ESI_EMPLOYER_RATE / 100)
    : 0;
  const totalMonthly = employeeMonthly + employerMonthly;

  const estimatedProfessionalTax = Math.min(200, monthlyGrossWages * 0.01);
  const estimatedEpfEmployee = Math.min(monthlyGrossWages, 15_000) * 0.12;

  const eligibilityMessage = applicable
    ? isDisabled
      ? "✅ ESI applicable (extended limit for disabled employees)"
      : "✅ ESI applicable — you and your employer both contribute"
    : "❌ ESI not applicable — gross wages exceed the ESI wage ceiling";

  return {
    monthlyGrossWages,
    isDisabled,
    eligibility: applicable ? "applicable" : "not_applicable",
    eligibilityMessage,
    employeeMonthly,
    employerMonthly,
    totalMonthly,
    employeeAnnual: employeeMonthly * 12,
    employerAnnual: employerMonthly * 12,
    totalAnnual: totalMonthly * 12,
    estimatedProfessionalTax,
    estimatedEpfEmployee,
    estimatedNetTakeHome:
      monthlyGrossWages -
      employeeMonthly -
      estimatedProfessionalTax -
      estimatedEpfEmployee,
  };
}
