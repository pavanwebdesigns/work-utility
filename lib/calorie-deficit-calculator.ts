export type UnitSystem = "metric" | "imperial";
export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "lightly-active"
  | "moderately-active"
  | "very-active"
  | "extra-active";

export type DeficitGoal =
  | "maintain"
  | "mild"
  | "moderate"
  | "aggressive";

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  "lightly-active": 1.375,
  "moderately-active": 1.55,
  "very-active": 1.725,
  "extra-active": 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little or no exercise)",
  "lightly-active": "Lightly active (1–3 days/week)",
  "moderately-active": "Moderately active (3–5 days/week)",
  "very-active": "Very active (6–7 days/week)",
  "extra-active": "Extra active (physical job or 2× training)",
};

export const GOAL_DEFICITS: Record<DeficitGoal, number> = {
  maintain: 0,
  mild: 250,
  moderate: 500,
  aggressive: 750,
};

export const GOAL_LABELS: Record<DeficitGoal, string> = {
  maintain: "Maintain weight",
  mild: "Mild deficit (~250 cal/day)",
  moderate: "Moderate deficit (~500 cal/day)",
  aggressive: "Aggressive deficit (~750+ cal/day)",
};

function toKg(weight: number, unit: UnitSystem): number {
  return unit === "metric" ? weight : weight * 0.453592;
}

function toCm(height: number, unit: UnitSystem): number {
  return unit === "metric" ? height : height * 2.54;
}

/** Mifflin-St Jeor BMR formula */
export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  unit: UnitSystem,
): number {
  const kg = toKg(weight, unit);
  const cm = toCm(height, unit);
  const base = 10 * kg + 6.25 * cm - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

export function calculateTDEE(bmr: number, activity: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activity]);
}

export function calculateTargetCalories(
  tdee: number,
  goal: DeficitGoal,
): number {
  return Math.max(Math.round(tdee - GOAL_DEFICITS[goal]), 1200);
}

export type CalorieDeficitResult = {
  bmr: number;
  tdee: number;
  targetCalories: number;
  deficit: number;
};

export function calculateCalorieDeficit(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  unit: UnitSystem,
  activity: ActivityLevel,
  goal: DeficitGoal,
): CalorieDeficitResult {
  const bmr = Math.round(calculateBMR(weight, height, age, gender, unit));
  const tdee = calculateTDEE(bmr, activity);
  const targetCalories = calculateTargetCalories(tdee, goal);
  return {
    bmr,
    tdee,
    targetCalories,
    deficit: tdee - targetCalories,
  };
}
