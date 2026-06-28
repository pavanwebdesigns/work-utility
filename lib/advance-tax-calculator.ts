import {
  calculateNewRegimeTax,
  calculateOldRegimeTax,
  type RegimeTaxResult,
} from "@/lib/income-tax-calculator";

export type IncomeType =
  | "salaried"
  | "business"
  | "section-44ada";

export type TaxRegime = "new" | "old";

export type AdvanceTaxInstallment = {
  label: string;
  dueDate: string;
  cumulativePercent: number;
  cumulativeAmount: number;
  amountDue: number;
};

export type AdvanceTaxResult = {
  estimatedIncome: number;
  incomeType: IncomeType;
  regime: TaxRegime;
  tdsDeducted: number;
  otherDeductions: number;
  taxResult: RegimeTaxResult;
  totalTax: number;
  netTaxPayable: number;
  advanceTaxRequired: boolean;
  isSinglePayment: boolean;
  installments: AdvanceTaxInstallment[];
};

export const ADVANCE_TAX_THRESHOLD = 10_000;

const INSTALLMENT_SCHEDULE = [
  { label: "1st Installment", dueDate: "15 June 2026", cumulativePercent: 15 },
  { label: "2nd Installment", dueDate: "15 September 2026", cumulativePercent: 45 },
  { label: "3rd Installment", dueDate: "15 December 2026", cumulativePercent: 75 },
  { label: "4th Installment", dueDate: "15 March 2027", cumulativePercent: 100 },
] as const;

export const ADVANCE_TAX_DISCLAIMER =
  "Advance tax is calculated based on your estimated income for the full year. If your actual income differs, update your calculation. Use ITR for final tax settlement.";

function computeTax(
  estimatedIncome: number,
  incomeType: IncomeType,
  regime: TaxRegime,
  otherDeductions: number,
): RegimeTaxResult | null {
  if (estimatedIncome <= 0) return null;

  if (regime === "new") {
    if (incomeType === "salaried") {
      return calculateNewRegimeTax(estimatedIncome, "fy-2025-26");
    }
    const result = calculateNewRegimeTax(estimatedIncome + 75_000, "fy-2025-26");
    if (!result) return null;
    return {
      ...result,
      grossIncome: estimatedIncome,
      deductions: 0,
      taxableIncome: estimatedIncome,
    };
  }

  if (incomeType === "salaried") {
    return calculateOldRegimeTax({
      annualIncome: estimatedIncome,
      ageGroup: "below-60",
      hraExemption: 0,
      section80c: otherDeductions,
      section80d: 0,
      homeLoanInterest: 0,
      nps80ccd1b: 0,
    });
  }

  const result = calculateOldRegimeTax({
    annualIncome: estimatedIncome + 50_000,
    ageGroup: "below-60",
    hraExemption: 0,
    section80c: otherDeductions,
    section80d: 0,
    homeLoanInterest: 0,
    nps80ccd1b: 0,
  });
  if (!result) return null;
  const deductions = Math.min(Math.max(otherDeductions, 0), 150_000);
  return {
    ...result,
    grossIncome: estimatedIncome,
    deductions,
    taxableIncome: Math.max(0, estimatedIncome - deductions),
  };
}

function buildInstallments(
  netTaxPayable: number,
  singlePayment: boolean,
): AdvanceTaxInstallment[] {
  if (singlePayment) {
    return [
      {
        label: "Single Payment (Section 44ADA)",
        dueDate: "15 March 2027",
        cumulativePercent: 100,
        cumulativeAmount: netTaxPayable,
        amountDue: netTaxPayable,
      },
    ];
  }

  let previousCumulative = 0;
  return INSTALLMENT_SCHEDULE.map((item) => {
    const cumulativeAmount = (netTaxPayable * item.cumulativePercent) / 100;
    const amountDue = cumulativeAmount - previousCumulative;
    previousCumulative = cumulativeAmount;
    return {
      label: item.label,
      dueDate: item.dueDate,
      cumulativePercent: item.cumulativePercent,
      cumulativeAmount,
      amountDue,
    };
  });
}

export function calculateAdvanceTax(input: {
  estimatedIncome: number;
  incomeType: IncomeType;
  tdsDeducted: number;
  regime: TaxRegime;
  otherDeductions: number;
}): AdvanceTaxResult | null {
  const taxResult = computeTax(
    input.estimatedIncome,
    input.incomeType,
    input.regime,
    input.otherDeductions,
  );
  if (!taxResult) return null;

  const netTaxPayable = Math.max(0, taxResult.totalTax - input.tdsDeducted);
  const advanceTaxRequired = netTaxPayable > ADVANCE_TAX_THRESHOLD;
  const isSinglePayment = input.incomeType === "section-44ada";

  return {
    estimatedIncome: input.estimatedIncome,
    incomeType: input.incomeType,
    regime: input.regime,
    tdsDeducted: input.tdsDeducted,
    otherDeductions: input.otherDeductions,
    taxResult,
    totalTax: taxResult.totalTax,
    netTaxPayable,
    advanceTaxRequired,
    isSinglePayment,
    installments: advanceTaxRequired
      ? buildInstallments(netTaxPayable, isSinglePayment)
      : [],
  };
}
