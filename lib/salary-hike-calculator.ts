export type SalaryHikeResult = {
  currentSalary: number;
  hikeAmount: number;
  newSalary: number;
  monthlyIncrease: number;
  hikePercent: number;
};

export function calculateSalaryHike(
  currentSalary: number,
  hikePercent: number
): SalaryHikeResult | null {
  if (currentSalary <= 0 || hikePercent < 0) return null;

  const hikeAmount = (currentSalary * hikePercent) / 100;
  const newSalary = currentSalary + hikeAmount;

  return {
    currentSalary,
    hikeAmount,
    newSalary,
    monthlyIncrease: hikeAmount / 12,
    hikePercent,
  };
}

export function calculateHikeFromNewSalary(
  currentSalary: number,
  desiredNewSalary: number
): SalaryHikeResult | null {
  if (currentSalary <= 0 || desiredNewSalary <= 0) return null;

  const hikeAmount = desiredNewSalary - currentSalary;
  const hikePercent = (hikeAmount / currentSalary) * 100;

  return {
    currentSalary,
    hikeAmount,
    newSalary: desiredNewSalary,
    monthlyIncrease: hikeAmount / 12,
    hikePercent,
  };
}
