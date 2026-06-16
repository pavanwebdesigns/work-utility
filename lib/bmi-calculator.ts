export type UnitSystem = "metric" | "imperial";

export function calculateBMI(
  weight: number,
  height: number,
  unit: UnitSystem,
): number {
  if (unit === "metric") {
    const heightM = height / 100;
    return weight / (heightM * heightM);
  }
  return (weight / (height * height)) * 703;
}

export function getBMICategory(bmi: number): {
  category: string;
  color: string;
} {
  if (bmi < 18.5) return { category: "Underweight", color: "#3B82F6" };
  if (bmi < 25) return { category: "Normal weight", color: "#10B981" };
  if (bmi < 30) return { category: "Overweight", color: "#F59E0B" };
  return { category: "Obese", color: "#EF4444" };
}

export function getHealthyWeightRange(
  height: number,
  unit: UnitSystem,
): { min: number; max: number } {
  if (unit === "metric") {
    const heightM = height / 100;
    return {
      min: 18.5 * heightM * heightM,
      max: 24.9 * heightM * heightM,
    };
  }
  return {
    min: (18.5 * height * height) / 703,
    max: (24.9 * height * height) / 703,
  };
}
