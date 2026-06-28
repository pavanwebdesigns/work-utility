export type FourOhOneKYearRow = {
  year: number;
  age: number;
  yourContributions: number;
  employerMatch: number;
  balance: number;
};

export type FourOhOneKResult = {
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  currentBalance: number;
  annualSalary: number;
  contributionRate: number;
  employeeAnnualContribution: number;
  employerAnnualContribution: number;
  totalAnnualContribution: number;
  expectedReturn: number;
  irsLimit: number;
  contributionCapped: boolean;
  cappedEmployeeContribution: number;
  projectedBalance: number;
  totalYourContributions: number;
  totalEmployerContributions: number;
  investmentGrowth: number;
  monthlyRetirementIncome: number;
  annualTaxSavings22: number;
  monthlyTakeHomeReduction: number;
  yearRows: FourOhOneKYearRow[];
};

export const FOUR_OH_ONE_K_DISCLAIMER =
  "Based on 2026 IRS contribution limits. Projections are estimates — actual returns vary. Not financial advice. Consult a CFP for personalized retirement planning.";

const IRS_LIMIT_UNDER_50 = 24_500;
const IRS_LIMIT_CATCH_UP = 32_500;
const IRS_LIMIT_SUPER_CATCH_UP = 35_750;

export function get401kIrsLimit(age: number): number {
  if (age >= 60 && age <= 63) return IRS_LIMIT_SUPER_CATCH_UP;
  if (age >= 50) return IRS_LIMIT_CATCH_UP;
  return IRS_LIMIT_UNDER_50;
}

export function calculateEmployerMatch(
  annualSalary: number,
  employeeContribution: number,
  matchPercent: number,
  matchUpToSalaryPercent: number,
): number {
  const maxMatchable = annualSalary * (matchUpToSalaryPercent / 100);
  const matchableContribution = Math.min(employeeContribution, maxMatchable);
  return matchableContribution * (matchPercent / 100);
}

export function calculate401k(input: {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualSalary: number;
  contributionRatePercent: number;
  employerMatchEnabled: boolean;
  employerMatchPercent: number;
  employerMatchUpToPercent: number;
  expectedReturnPercent: number;
}): FourOhOneKResult | null {
  const {
    currentAge,
    retirementAge,
    currentBalance,
    annualSalary,
    contributionRatePercent,
    employerMatchEnabled,
    employerMatchPercent,
    employerMatchUpToPercent,
    expectedReturnPercent,
  } = input;

  if (
    currentAge < 22 ||
    currentAge > 70 ||
    retirementAge < 55 ||
    retirementAge > 75 ||
    retirementAge <= currentAge ||
    annualSalary <= 0 ||
    contributionRatePercent < 1 ||
    contributionRatePercent > 100 ||
    expectedReturnPercent < 0 ||
    currentBalance < 0
  ) {
    return null;
  }

  const yearsToRetirement = retirementAge - currentAge;
  const irsLimit = get401kIrsLimit(currentAge);
  const desiredEmployeeContribution =
    annualSalary * (contributionRatePercent / 100);
  const cappedEmployeeContribution = Math.min(desiredEmployeeContribution, irsLimit);
  const contributionCapped = desiredEmployeeContribution > irsLimit;

  const employerAnnualContribution = employerMatchEnabled
    ? calculateEmployerMatch(
        annualSalary,
        cappedEmployeeContribution,
        employerMatchPercent,
        employerMatchUpToPercent,
      )
    : 0;

  const r = expectedReturnPercent / 100;
  const yearRows: FourOhOneKYearRow[] = [];
  let balance = currentBalance;
  let totalYourContributions = 0;
  let totalEmployerContributions = 0;

  for (let year = 1; year <= yearsToRetirement; year++) {
    const age = currentAge + year - 1;
    const yearLimit = get401kIrsLimit(age);
    const employeeContrib = Math.min(
      annualSalary * (contributionRatePercent / 100),
      yearLimit,
    );
    const employerContrib = employerMatchEnabled
      ? calculateEmployerMatch(
          annualSalary,
          employeeContrib,
          employerMatchPercent,
          employerMatchUpToPercent,
        )
      : 0;

    totalYourContributions += employeeContrib;
    totalEmployerContributions += employerContrib;
    balance = balance * (1 + r) + employeeContrib + employerContrib;

    yearRows.push({
      year,
      age: currentAge + year,
      yourContributions: totalYourContributions,
      employerMatch: totalEmployerContributions,
      balance,
    });
  }

  const projectedBalance = balance;
  const totalAnnualContribution =
    cappedEmployeeContribution + employerAnnualContribution;
  const investmentGrowth =
    projectedBalance -
    currentBalance -
    totalYourContributions -
    totalEmployerContributions;
  const monthlyRetirementIncome = (projectedBalance * 0.04) / 12;
  const annualTaxSavings22 = cappedEmployeeContribution * 0.22;
  const monthlyTakeHomeReduction =
    (cappedEmployeeContribution - annualTaxSavings22) / 12;

  return {
    currentAge,
    retirementAge,
    yearsToRetirement,
    currentBalance,
    annualSalary,
    contributionRate: contributionRatePercent,
    employeeAnnualContribution: desiredEmployeeContribution,
    employerAnnualContribution,
    totalAnnualContribution,
    expectedReturn: expectedReturnPercent,
    irsLimit,
    contributionCapped,
    cappedEmployeeContribution,
    projectedBalance,
    totalYourContributions,
    totalEmployerContributions,
    investmentGrowth,
    monthlyRetirementIncome,
    annualTaxSavings22,
    monthlyTakeHomeReduction,
    yearRows,
  };
}
