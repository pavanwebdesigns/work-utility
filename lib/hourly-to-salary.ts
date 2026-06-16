export function hourlyToSalary(
  hourlyRate: number,
  hoursPerWeek: number = 40,
  weeksPerYear: number = 52,
): {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
} {
  const weekly = hourlyRate * hoursPerWeek;
  const annual = weekly * weeksPerYear;

  return {
    hourly: hourlyRate,
    daily: weekly / 5,
    weekly,
    biweekly: weekly * 2,
    monthly: annual / 12,
    annual,
  };
}

export function salaryToHourly(
  annualSalary: number,
  hoursPerWeek: number = 40,
  weeksPerYear: number = 52,
): number {
  return annualSalary / (hoursPerWeek * weeksPerYear);
}
