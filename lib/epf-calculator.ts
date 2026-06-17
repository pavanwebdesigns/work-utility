export interface EPFInput {
  basicSalary: number;
  employeeContribution: number;
  employerContribution: number;
  currentAge: number;
  retirementAge: number;
  currentEPFBalance: number;
  annualIncrement: number;
  interestRate: number;
}

/** EPFO-declared rate for FY2025-26. Review/update when EPFO announces a new rate (typically Feb–Mar, government approval follows). */
export const DEFAULT_EPF_INTEREST_RATE = 8.25;

/** Employer EPF share (3.67% of basic); remainder of the 12% employer contribution goes to EPS. */
export const EMPLOYER_EPF_CONTRIBUTION_RATE = 3.67;

export function calculateEPF(input: EPFInput): {
  maturityAmount: number;
  totalEmployeeContribution: number;
  totalEmployerContribution: number;
  totalInterestEarned: number;
  yearlyBreakdown: { year: number; balance: number }[];
} {
  const months = (input.retirementAge - input.currentAge) * 12;
  let balance = input.currentEPFBalance;
  let salary = input.basicSalary;
  let totalEmployee = 0;
  let totalEmployer = 0;
  const yearlyBreakdown: { year: number; balance: number }[] = [];

  const monthlyRate = input.interestRate / 12 / 100;

  for (let month = 1; month <= months; month++) {
    const empContribution = salary * (input.employeeContribution / 100);
    const employerEPFContribution =
      salary * (EMPLOYER_EPF_CONTRIBUTION_RATE / 100);

    balance += empContribution + employerEPFContribution;
    balance += balance * monthlyRate;

    totalEmployee += empContribution;
    totalEmployer += employerEPFContribution;

    if (month % 12 === 0) {
      salary = salary * (1 + input.annualIncrement / 100);
      yearlyBreakdown.push({
        year: Math.floor(month / 12),
        balance: Math.round(balance),
      });
    }
  }

  const totalContributions =
    totalEmployee + totalEmployer + input.currentEPFBalance;
  const totalInterestEarned = balance - totalContributions;

  return {
    maturityAmount: Math.round(balance),
    totalEmployeeContribution: Math.round(totalEmployee),
    totalEmployerContribution: Math.round(totalEmployer),
    totalInterestEarned: Math.round(totalInterestEarned),
    yearlyBreakdown,
  };
}
