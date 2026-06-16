export function calculateGratuity(
  lastDrawnSalary: number,
  yearsOfService: number,
  isCoveredUnderAct: boolean = true,
): {
  gratuityAmount: number;
  roundedYears: number;
  formula: string;
} {
  const roundedYears =
    Math.floor(yearsOfService) + (yearsOfService % 1 >= 0.5 ? 1 : 0);

  let gratuityAmount: number;
  let formula: string;

  if (isCoveredUnderAct) {
    gratuityAmount = (15 * lastDrawnSalary * roundedYears) / 26;
    formula = "(15 × Salary × Years) / 26";
  } else {
    gratuityAmount = (15 * lastDrawnSalary * roundedYears) / 30;
    formula = "(15 × Salary × Years) / 30";
  }

  const maxLimit = 2000000;
  gratuityAmount = Math.min(gratuityAmount, maxLimit);

  return {
    gratuityAmount: Math.round(gratuityAmount),
    roundedYears,
    formula,
  };
}

export const GRATUITY_MAX_LIMIT = 2000000;
export const MIN_YEARS_ELIGIBLE = 5;
