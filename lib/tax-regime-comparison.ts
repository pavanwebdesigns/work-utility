import { calculateHRA } from "@/lib/hra-calculator";
import {
  calculateNewRegimeTax,
  calculateOldRegimeTax,
  type RegimeTaxResult,
} from "@/lib/income-tax-calculator";

export type TaxRegimeComparisonInput = {
  annualGrossSalary: number;
  hraReceivedMonthly: number;
  rentPaidMonthly: number;
  isMetroCity: boolean;
  section80c: number;
  section80d: number;
  otherDeductions: number;
  /** Assumed monthly basic for HRA exemption (40% of gross if not overridden). */
  basicSalaryMonthly?: number;
};

export type RegimeComparisonRow = {
  label: string;
  oldValue: number;
  newValue: number;
};

export type TaxRegimeComparisonResult = {
  oldRegime: RegimeTaxResult;
  newRegime: RegimeTaxResult;
  hraExemptionAnnual: number;
  basicSalaryMonthly: number;
  rows: RegimeComparisonRow[];
  verdict: "old" | "new" | "equal";
  savingsAmount: number;
  verdictMessage: string;
};

const OLD_STANDARD = 50_000;
const NEW_STANDARD = 75_000;

export function compareTaxRegimes(
  input: TaxRegimeComparisonInput,
): TaxRegimeComparisonResult | null {
  if (input.annualGrossSalary <= 0) return null;

  const basicSalaryMonthly =
    input.basicSalaryMonthly ??
    (input.annualGrossSalary * 0.4) / 12;

  const hraResult = calculateHRA({
    basicSalary: basicSalaryMonthly,
    dearnessAllowance: 0,
    hraReceived: input.hraReceivedMonthly,
    rentPaid: input.rentPaidMonthly,
    isMetroCity: input.isMetroCity,
  });

  const hraExemptionAnnual = hraResult.exemptHRA * 12;

  const oldRegime =
    calculateOldRegimeTax({
      annualIncome: input.annualGrossSalary,
      ageGroup: "below-60",
      hraExemption: hraExemptionAnnual,
      section80c: input.section80c,
      section80d: input.section80d,
      homeLoanInterest: input.otherDeductions,
      nps80ccd1b: 0,
    }) ?? null;

  const newRegime = calculateNewRegimeTax(
    input.annualGrossSalary,
    "fy-2025-26",
  );

  if (!oldRegime || !newRegime) return null;

  const oldDeductions =
    OLD_STANDARD +
    hraExemptionAnnual +
    Math.min(Math.max(input.section80c, 0), 150_000) +
    Math.min(Math.max(input.section80d, 0), 25_000) +
    Math.max(input.otherDeductions, 0);

  const rows: RegimeComparisonRow[] = [
    {
      label: "Gross Salary",
      oldValue: input.annualGrossSalary,
      newValue: input.annualGrossSalary,
    },
    {
      label: "Standard Deduction",
      oldValue: OLD_STANDARD,
      newValue: NEW_STANDARD,
    },
    {
      label: "HRA Exemption",
      oldValue: hraExemptionAnnual,
      newValue: 0,
    },
    {
      label: "80C Deductions",
      oldValue: Math.min(Math.max(input.section80c, 0), 150_000),
      newValue: 0,
    },
    {
      label: "80D (Health Insurance)",
      oldValue: Math.min(Math.max(input.section80d, 0), 25_000),
      newValue: 0,
    },
    {
      label: "Other Deductions",
      oldValue: Math.max(input.otherDeductions, 0),
      newValue: 0,
    },
    {
      label: "Total Deductions",
      oldValue: oldDeductions,
      newValue: NEW_STANDARD,
    },
    {
      label: "Taxable Income",
      oldValue: oldRegime.taxableIncome,
      newValue: newRegime.taxableIncome,
    },
    {
      label: "Tax (before cess)",
      oldValue: oldRegime.taxAfterRebate,
      newValue: newRegime.taxAfterRebate,
    },
    {
      label: "87A Rebate",
      oldValue: oldRegime.rebate,
      newValue: newRegime.rebate,
    },
    {
      label: "Health + Ed Cess (4%)",
      oldValue: oldRegime.cess,
      newValue: newRegime.cess,
    },
    {
      label: "Total Tax",
      oldValue: oldRegime.totalTax,
      newValue: newRegime.totalTax,
    },
    {
      label: "Monthly Tax",
      oldValue: oldRegime.totalTax / 12,
      newValue: newRegime.totalTax / 12,
    },
  ];

  const savings = oldRegime.totalTax - newRegime.totalTax;
  let verdict: TaxRegimeComparisonResult["verdict"] = "equal";
  let verdictMessage =
    "⚖️ Both regimes are nearly equal. New Regime is simpler — consider it for ease of filing.";

  if (savings > 5_000) {
    verdict = "new";
    verdictMessage = `🏆 New Regime saves you ₹${Math.round(savings).toLocaleString("en-IN")}/year. The default regime is likely better for you.`;
  } else if (savings < -5_000) {
    verdict = "old";
    const oldSavings = Math.abs(savings);
    verdictMessage = `🏆 Old Regime saves you ₹${Math.round(oldSavings).toLocaleString("en-IN")}/year. Consider switching if you have significant 80C/80D investments.`;
  } else if (Math.abs(savings) <= 5_000) {
    verdictMessage = `⚖️ Both regimes are nearly equal (₹${Math.round(Math.abs(savings)).toLocaleString("en-IN")} difference). New Regime is simpler — consider it for ease of filing.`;
  }

  return {
    oldRegime,
    newRegime,
    hraExemptionAnnual,
    basicSalaryMonthly,
    rows,
    verdict,
    savingsAmount: Math.abs(savings),
    verdictMessage,
  };
}
