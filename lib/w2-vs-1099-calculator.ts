import {
  calculateEmployeeFica,
  calculateFederalIncomeTax,
  calculateSelfEmploymentTax,
  QBI_DEDUCTION_RATE,
  STANDARD_DEDUCTION_2026,
  WORK_DAYS_PER_YEAR,
  WORK_HOURS_PER_YEAR,
  type USFilingStatus,
} from "@/lib/us-federal-tax-2026";

export type W2Vs1099Input = {
  w2AnnualSalary: number;
  filingStatus: USFilingStatus;
  employerHealthInsuranceMonthly: number;
  employer401kMatchAnnual: number;
  ptoDays: number;
  businessExpensesAnnual: number;
};

export type W2Breakdown = {
  grossSalary: number;
  employeeFica: number;
  federalIncomeTax: number;
  employerFica: number;
  healthInsuranceValue: number;
  employer401kMatch: number;
  ptoCashValue: number;
  totalCompensationValue: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
};

export type Equivalent1099Steps = {
  w2TakeHomeTarget: number;
  benefitsToSelfPay: number;
  seTaxAmount: number;
  seTaxDeduction: number;
  businessExpenseDeduction: number;
  qbiDeduction: number;
  federalIncomeTax: number;
  minimum1099Rate: number;
  hourlyRate: number;
};

export type W2Vs1099Result = {
  w2: W2Breakdown;
  equivalent1099: Equivalent1099Steps;
};

function calculateW2(input: W2Vs1099Input): W2Breakdown {
  const grossSalary = Math.max(0, input.w2AnnualSalary);
  const employeeFica = calculateEmployeeFica(grossSalary, input.filingStatus);
  const taxableIncome = Math.max(
    0,
    grossSalary - STANDARD_DEDUCTION_2026[input.filingStatus],
  );
  const federalIncomeTax = calculateFederalIncomeTax(
    taxableIncome,
    input.filingStatus,
  );
  const employerFica = calculateEmployeeFica(grossSalary, input.filingStatus);
  const healthInsuranceValue = Math.max(0, input.employerHealthInsuranceMonthly) * 12;
  const employer401kMatch = Math.max(0, input.employer401kMatchAnnual);
  const dailyRate = grossSalary / WORK_DAYS_PER_YEAR;
  const ptoCashValue = Math.max(0, input.ptoDays) * dailyRate;

  const annualTakeHome =
    grossSalary - employeeFica.total - federalIncomeTax;

  return {
    grossSalary,
    employeeFica: employeeFica.total,
    federalIncomeTax,
    employerFica: employerFica.total,
    healthInsuranceValue,
    employer401kMatch,
    ptoCashValue,
    totalCompensationValue:
      grossSalary +
      employerFica.total +
      healthInsuranceValue +
      employer401kMatch +
      ptoCashValue,
    annualTakeHome,
    monthlyTakeHome: annualTakeHome / 12,
  };
}

function net1099AfterCosts(
  gross1099: number,
  w2TakeHome: number,
  input: W2Vs1099Input,
): {
  net: number;
  seTax: number;
  seDeduction: number;
  qbi: number;
  federalTax: number;
  benefitsCost: number;
} {
  const netBusinessIncome = gross1099 - input.businessExpensesAnnual;
  if (netBusinessIncome <= 0) {
    return {
      net: -Infinity,
      seTax: 0,
      seDeduction: 0,
      qbi: 0,
      federalTax: 0,
      benefitsCost: 0,
    };
  }

  const se = calculateSelfEmploymentTax(netBusinessIncome, 0, input.filingStatus);
  const qbi = netBusinessIncome * QBI_DEDUCTION_RATE;
  const agi = netBusinessIncome - se.seTaxDeduction;
  const taxableIncome = Math.max(
    0,
    agi - STANDARD_DEDUCTION_2026[input.filingStatus] - qbi,
  );
  const federalTax = calculateFederalIncomeTax(
    taxableIncome,
    input.filingStatus,
  );

  const benefitsCost =
    Math.max(0, input.employerHealthInsuranceMonthly) * 12 +
    Math.max(0, input.employer401kMatchAnnual) +
    (Math.max(0, input.ptoDays) * input.w2AnnualSalary) / WORK_DAYS_PER_YEAR;

  const net =
    gross1099 -
    input.businessExpensesAnnual -
    se.totalSeTax -
    federalTax -
    benefitsCost;

  return {
    net,
    seTax: se.totalSeTax,
    seDeduction: se.seTaxDeduction,
    qbi,
    federalTax,
    benefitsCost,
  };
}

function findMinimum1099Rate(
  w2TakeHome: number,
  input: W2Vs1099Input,
): Equivalent1099Steps {
  let low = w2TakeHome;
  let high = Math.max(w2TakeHome * 2.5, input.w2AnnualSalary * 1.5);
  let best = high;
  let stepsAtBest = net1099AfterCosts(high, w2TakeHome, input);

  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const result = net1099AfterCosts(mid, w2TakeHome, input);
    if (result.net >= w2TakeHome) {
      best = mid;
      stepsAtBest = result;
      high = mid;
    } else {
      low = mid;
    }
  }

  return {
    w2TakeHomeTarget: w2TakeHome,
    benefitsToSelfPay: stepsAtBest.benefitsCost,
    seTaxAmount: stepsAtBest.seTax,
    seTaxDeduction: stepsAtBest.seDeduction,
    businessExpenseDeduction: input.businessExpensesAnnual,
    qbiDeduction: stepsAtBest.qbi,
    federalIncomeTax: stepsAtBest.federalTax,
    minimum1099Rate: Math.ceil(best),
    hourlyRate: Math.ceil(best) / WORK_HOURS_PER_YEAR,
  };
}

export function compareW2Vs1099(input: W2Vs1099Input): W2Vs1099Result | null {
  if (input.w2AnnualSalary <= 0) return null;

  const w2 = calculateW2(input);
  const equivalent1099 = findMinimum1099Rate(w2.annualTakeHome, input);

  return { w2, equivalent1099 };
}
