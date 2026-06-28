import {
  calculateFederalIncomeTax,
  calculateSelfEmploymentTax,
  QBI_DEDUCTION_RATE,
  QUARTERLY_PAYMENT_SCHEDULE,
  SS_WAGE_BASE_2026,
  STANDARD_DEDUCTION_2026,
  type USFilingStatus,
} from "@/lib/us-federal-tax-2026";

export type SelfEmploymentTaxInput = {
  netSeIncome: number;
  w2Income: number;
  filingStatus: USFilingStatus;
  includeQbi: boolean;
};

export type SelfEmploymentTaxStep = {
  label: string;
  value: number;
  note?: string;
};

export type QuarterlyPayment = {
  quarter: string;
  period: string;
  dueDate: string;
  amount: number;
};

export type SelfEmploymentTaxResult = {
  steps: SelfEmploymentTaxStep[];
  seTax: ReturnType<typeof calculateSelfEmploymentTax>;
  qbiDeduction: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalIncomeTax: number;
  totalTax: number;
  effectiveRate: number;
  quarterlyPayment: number;
  quarterlySchedule: QuarterlyPayment[];
  incomeTaxSavedBySeDeduction: number;
};

export function calculateSelfEmploymentTaxFull(
  input: SelfEmploymentTaxInput,
): SelfEmploymentTaxResult | null {
  const netSeIncome = Math.max(0, input.netSeIncome);
  const w2Income = Math.max(0, input.w2Income);

  if (netSeIncome <= 0 && w2Income <= 0) return null;

  const seTax = calculateSelfEmploymentTax(
    netSeIncome,
    w2Income,
    input.filingStatus,
  );

  const qbiDeduction = input.includeQbi ? netSeIncome * QBI_DEDUCTION_RATE : 0;
  const totalIncome = w2Income + netSeIncome;
  const adjustedGrossIncome = totalIncome - seTax.seTaxDeduction;
  const taxableIncome = Math.max(
    0,
    adjustedGrossIncome -
      STANDARD_DEDUCTION_2026[input.filingStatus] -
      qbiDeduction,
  );

  const federalIncomeTax = calculateFederalIncomeTax(
    taxableIncome,
    input.filingStatus,
  );

  const totalTax = seTax.totalSeTax + federalIncomeTax;
  const effectiveRate =
    netSeIncome > 0 ? (totalTax / netSeIncome) * 100 : 0;
  const quarterlyPayment = totalTax / 4;

  const taxableWithoutSeDeduction = Math.max(
    0,
    totalIncome -
      STANDARD_DEDUCTION_2026[input.filingStatus] -
      qbiDeduction,
  );
  const federalWithoutSeDeduction = calculateFederalIncomeTax(
    taxableWithoutSeDeduction,
    input.filingStatus,
  );
  const incomeTaxSavedBySeDeduction = Math.max(
    0,
    federalWithoutSeDeduction - federalIncomeTax,
  );

  const steps: SelfEmploymentTaxStep[] = [
    {
      label: "SE Tax Base (92.35% of net SE income)",
      value: seTax.seTaxBase,
    },
    {
      label: "Social Security Tax (12.4%)",
      value: seTax.socialSecurityTax,
      note: `Wage base remaining after W-2 wages: $${Math.max(0, SS_WAGE_BASE_2026 - w2Income).toLocaleString("en-US")}`,
    },
    {
      label: "Medicare Tax (2.9%)",
      value: seTax.medicareTax,
    },
  ];

  if (seTax.additionalMedicareTax > 0) {
    steps.push({
      label: "Additional Medicare Tax (0.9%)",
      value: seTax.additionalMedicareTax,
    });
  }

  steps.push(
    { label: "Total Self-Employment Tax", value: seTax.totalSeTax },
    {
      label: "SE Tax Deduction (50% of SE tax)",
      value: seTax.seTaxDeduction,
    },
    { label: "Adjusted Gross Income", value: adjustedGrossIncome },
    {
      label: `Standard Deduction (${input.filingStatus === "single" ? "Single" : "MFJ"})`,
      value: STANDARD_DEDUCTION_2026[input.filingStatus],
    },
  );

  if (input.includeQbi) {
    steps.push({
      label: "QBI Deduction (20% of net SE income)",
      value: qbiDeduction,
    });
  }

  steps.push(
    { label: "Taxable Income", value: taxableIncome },
    { label: "Federal Income Tax", value: federalIncomeTax },
    { label: "Total Tax (SE + Federal)", value: totalTax },
  );

  const quarterlySchedule: QuarterlyPayment[] =
    QUARTERLY_PAYMENT_SCHEDULE.map((row) => ({
      ...row,
      amount: quarterlyPayment,
    }));

  return {
    steps,
    seTax,
    qbiDeduction,
    adjustedGrossIncome,
    taxableIncome,
    federalIncomeTax,
    totalTax,
    effectiveRate,
    quarterlyPayment,
    quarterlySchedule,
    incomeTaxSavedBySeDeduction,
  };
}
