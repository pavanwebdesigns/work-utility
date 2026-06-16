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
    const employerEPFContribution = salary * 0.0367;

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
