export type AgeGroup = "below-60" | "60-80" | "above-80";
export type FinancialYear = "fy-2024-25" | "fy-2025-26";

export type OldRegimeInputs = {
  annualIncome: number;
  ageGroup: AgeGroup;
  hraExemption: number;
  section80c: number;
  section80d: number;
  homeLoanInterest: number;
  nps80ccd1b: number;
};

export type SlabBreakdown = {
  label: string;
  taxableAmount: number;
  rate: number;
  tax: number;
};

export type RegimeTaxResult = {
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  slabBreakdown: SlabBreakdown[];
  taxBeforeRebate: number;
  rebate: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  takeHome: number;
};

export type IncomeTaxComparison = {
  oldRegime: RegimeTaxResult;
  newRegime: RegimeTaxResult;
  recommended: "old" | "new" | "equal";
  savings: number;
};

type Slab = { upTo: number; rate: number; label: string };

const OLD_STANDARD_DEDUCTION = 50000;
const NEW_STANDARD_DEDUCTION = 75000;

function clampDeduction(value: number, max: number): number {
  return Math.min(Math.max(value, 0), max);
}

function getOldRegimeSlabs(ageGroup: AgeGroup): Slab[] {
  if (ageGroup === "60-80") {
    return [
      { upTo: 300000, rate: 0, label: "Up to ₹3,00,000" },
      { upTo: 500000, rate: 0.05, label: "₹3,00,001 - ₹5,00,000" },
      { upTo: 1000000, rate: 0.2, label: "₹5,00,001 - ₹10,00,000" },
      { upTo: Infinity, rate: 0.3, label: "Above ₹10,00,000" },
    ];
  }

  if (ageGroup === "above-80") {
    return [
      { upTo: 500000, rate: 0, label: "Up to ₹5,00,000" },
      { upTo: 1000000, rate: 0.2, label: "₹5,00,001 - ₹10,00,000" },
      { upTo: Infinity, rate: 0.3, label: "Above ₹10,00,000" },
    ];
  }

  return [
    { upTo: 250000, rate: 0, label: "Up to ₹2,50,000" },
    { upTo: 500000, rate: 0.05, label: "₹2,50,001 - ₹5,00,000" },
    { upTo: 1000000, rate: 0.2, label: "₹5,00,001 - ₹10,00,000" },
    { upTo: Infinity, rate: 0.3, label: "Above ₹10,00,000" },
  ];
}

function getNewRegimeSlabs(financialYear: FinancialYear): Slab[] {
  if (financialYear === "fy-2025-26") {
    return [
      { upTo: 400000, rate: 0, label: "Up to ₹4,00,000" },
      { upTo: 800000, rate: 0.05, label: "₹4,00,001 - ₹8,00,000" },
      { upTo: 1200000, rate: 0.1, label: "₹8,00,001 - ₹12,00,000" },
      { upTo: 1600000, rate: 0.15, label: "₹12,00,001 - ₹16,00,000" },
      { upTo: 2000000, rate: 0.2, label: "₹16,00,001 - ₹20,00,000" },
      { upTo: 2400000, rate: 0.25, label: "₹20,00,001 - ₹24,00,000" },
      { upTo: Infinity, rate: 0.3, label: "Above ₹24,00,000" },
    ];
  }

  return [
    { upTo: 300000, rate: 0, label: "Up to ₹3,00,000" },
    { upTo: 700000, rate: 0.05, label: "₹3,00,001 - ₹7,00,000" },
    { upTo: 1000000, rate: 0.1, label: "₹7,00,001 - ₹10,00,000" },
    { upTo: 1200000, rate: 0.15, label: "₹10,00,001 - ₹12,00,000" },
    { upTo: 1500000, rate: 0.2, label: "₹12,00,001 - ₹15,00,000" },
    { upTo: Infinity, rate: 0.3, label: "Above ₹15,00,000" },
  ];
}

function calculateSlabTax(
  taxableIncome: number,
  slabs: Slab[]
): { tax: number; breakdown: SlabBreakdown[] } {
  let tax = 0;
  let previous = 0;
  const breakdown: SlabBreakdown[] = [];

  for (const slab of slabs) {
    if (taxableIncome <= previous) break;

    const taxableAmount = Math.min(taxableIncome, slab.upTo) - previous;
    if (taxableAmount > 0) {
      const slabTax = taxableAmount * slab.rate;
      tax += slabTax;
      breakdown.push({
        label: slab.label,
        taxableAmount,
        rate: slab.rate,
        tax: slabTax,
      });
    }

    previous = slab.upTo;
  }

  return { tax, breakdown };
}

function applyOldRebate(tax: number, taxableIncome: number): number {
  if (taxableIncome <= 700000) {
    return Math.max(0, tax - 25000);
  }
  return tax;
}

function applyNewRebate(
  tax: number,
  taxableIncome: number,
  financialYear: FinancialYear
): number {
  if (financialYear === "fy-2025-26" && taxableIncome <= 1200000) {
    return Math.max(0, tax - 60000);
  }

  if (financialYear === "fy-2024-25" && taxableIncome <= 700000) {
    return Math.max(0, tax - 25000);
  }

  return tax;
}

function finalizeTax(
  grossIncome: number,
  deductions: number,
  slabs: Slab[],
  rebateFn: (tax: number, taxableIncome: number) => number
): RegimeTaxResult {
  const taxableIncome = Math.max(0, grossIncome - deductions);
  const { tax: taxBeforeRebate, breakdown } = calculateSlabTax(
    taxableIncome,
    slabs
  );
  const taxAfterRebate = rebateFn(taxBeforeRebate, taxableIncome);
  const rebate = Math.max(0, taxBeforeRebate - taxAfterRebate);
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;

  return {
    grossIncome,
    deductions,
    taxableIncome,
    slabBreakdown: breakdown,
    taxBeforeRebate,
    rebate,
    taxAfterRebate,
    cess,
    totalTax,
    takeHome: grossIncome - totalTax,
  };
}

export function calculateOldRegimeTax(
  inputs: OldRegimeInputs
): RegimeTaxResult | null {
  if (inputs.annualIncome <= 0) return null;

  const deductions =
    OLD_STANDARD_DEDUCTION +
    clampDeduction(inputs.hraExemption, inputs.annualIncome) +
    clampDeduction(inputs.section80c, 150000) +
    clampDeduction(inputs.section80d, 25000) +
    clampDeduction(inputs.homeLoanInterest, 200000) +
    clampDeduction(inputs.nps80ccd1b, 50000);

  return finalizeTax(
    inputs.annualIncome,
    deductions,
    getOldRegimeSlabs(inputs.ageGroup),
    applyOldRebate
  );
}

export function calculateNewRegimeTax(
  annualIncome: number,
  financialYear: FinancialYear
): RegimeTaxResult | null {
  if (annualIncome <= 0) return null;

  return finalizeTax(
    annualIncome,
    NEW_STANDARD_DEDUCTION,
    getNewRegimeSlabs(financialYear),
    (tax, taxableIncome) => applyNewRebate(tax, taxableIncome, financialYear)
  );
}

export function compareIncomeTax(
  inputs: OldRegimeInputs,
  financialYear: FinancialYear
): IncomeTaxComparison | null {
  const oldRegime = calculateOldRegimeTax(inputs);
  const newRegime = calculateNewRegimeTax(inputs.annualIncome, financialYear);

  if (!oldRegime || !newRegime) return null;

  const savings = oldRegime.totalTax - newRegime.totalTax;
  let recommended: IncomeTaxComparison["recommended"] = "equal";

  if (savings > 0) recommended = "new";
  else if (savings < 0) recommended = "old";

  return {
    oldRegime,
    newRegime,
    recommended,
    savings: Math.abs(savings),
  };
}
