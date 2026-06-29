export const BONUS_WAGE_CEILING = 7_000;
export const BONUS_ELIGIBILITY_THRESHOLD = 21_000;
export const BONUS_MIN_RATE = 8.33;
export const BONUS_MAX_RATE = 20;

export const BONUS_DISCLAIMER =
  "Based on Payment of Bonus Act, 1965 (amended 2015). Wage ceiling ₹7,000 and eligibility threshold ₹21,000 have not been revised since 2015. Consult HR for actual company policy.";

export type BonusEligibility = "eligible" | "ex_gratia";

export type BonusResult = {
  monthlySalary: number;
  bonusRate: number;
  employmentMonths: number;
  calculationWage: number;
  annualCalculationBasis: number;
  selectedBonus: number;
  minimumBonus: number;
  maximumBonus: number;
  eligibility: BonusEligibility;
  eligibilityMessage: string;
};

export function calculateBonus(
  monthlySalary: number,
  bonusRatePercent: number,
  employmentMonths: number,
): BonusResult | null {
  if (
    monthlySalary <= 0 ||
    bonusRatePercent < BONUS_MIN_RATE ||
    bonusRatePercent > BONUS_MAX_RATE ||
    employmentMonths < 1 ||
    employmentMonths > 12
  ) {
    return null;
  }

  const calculationWage = Math.min(monthlySalary, BONUS_WAGE_CEILING);
  const annualCalculationBasis = calculationWage * employmentMonths;
  const rate = bonusRatePercent / 100;

  const minimumBonus = annualCalculationBasis * (BONUS_MIN_RATE / 100);
  const maximumBonus = annualCalculationBasis * (BONUS_MAX_RATE / 100);
  const selectedBonus = annualCalculationBasis * rate;

  const eligibility: BonusEligibility =
    monthlySalary <= BONUS_ELIGIBILITY_THRESHOLD ? "eligible" : "ex_gratia";

  const eligibilityMessage =
    eligibility === "eligible"
      ? "✅ Eligible for statutory bonus under Payment of Bonus Act, 1965"
      : "ℹ️ Above ₹21,000/month — statutory bonus not applicable. Any bonus paid is ex-gratia (goodwill) at employer's discretion.";

  return {
    monthlySalary,
    bonusRate: bonusRatePercent,
    employmentMonths,
    calculationWage,
    annualCalculationBasis,
    selectedBonus,
    minimumBonus,
    maximumBonus,
    eligibility,
    eligibilityMessage,
  };
}
