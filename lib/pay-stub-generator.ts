import {
  calculateFederalIncomeTax,
  calculateEmployeeFica,
  STANDARD_DEDUCTION_2026,
} from "@/lib/us-federal-tax-2026";

export type EarningRow = {
  id: string;
  type: string;
  hours: number;
  rate: number;
};

export type OtherDeductionRow = {
  id: string;
  label: string;
  amount: number;
};

export type PayStubInput = {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyLogo: string | null;
  employeeName: string;
  employeeId: string;
  employeeAddress: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
  ssnLast4: string;
  department: string;
  earnings: EarningRow[];
  federalTaxOverride: number | null;
  stateTax: number;
  otherDeductions: OtherDeductionRow[];
  ytdGross: number | null;
  ytdFederalTax: number | null;
  ytdNet: number | null;
};

export type PayStubCalculation = {
  grossPay: number;
  federalTax: number;
  federalTaxEstimated: boolean;
  socialSecurity: number;
  medicare: number;
  stateTax: number;
  otherDeductionsTotal: number;
  totalDeductions: number;
  netPay: number;
  periodsPerYear: number;
};

export const PAY_STUB_DISCLAIMER =
  "This tool generates a pay stub for reference purposes only. It is not an official tax document. Consult your payroll provider or HR for official documentation.";

export const EARNING_PRESETS = [
  "Regular Pay",
  "Overtime Pay",
  "Holiday Pay",
  "Bonus",
  "Commission",
] as const;

export function createEarningRow(
  type = "Regular Pay",
  hours = 80,
  rate = 37.5,
): EarningRow {
  return {
    id: crypto.randomUUID(),
    type,
    hours,
    rate,
  };
}

export function createOtherDeductionRow(
  label = "Health Insurance",
  amount = 0,
): OtherDeductionRow {
  return { id: crypto.randomUUID(), label, amount };
}

export function earningAmount(row: EarningRow): number {
  return Math.max(0, row.hours) * Math.max(0, row.rate);
}

export function periodsPerYearFromDates(start: string, end: string): number {
  if (!start || !end) return 12;
  const s = new Date(start);
  const e = new Date(end);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return 12;
  const days = Math.max(1, Math.ceil((e.getTime() - s.getTime()) / 86_400_000) + 1);
  return 365 / days;
}

export function calculatePayStub(input: PayStubInput): PayStubCalculation {
  const grossPay = input.earnings.reduce((sum, row) => sum + earningAmount(row), 0);
  const periodsPerYear = periodsPerYearFromDates(
    input.payPeriodStart,
    input.payPeriodEnd,
  );
  const annualGross = grossPay * periodsPerYear;

  const fica = calculateEmployeeFica(annualGross, "single");
  const socialSecurity = fica.socialSecurity / periodsPerYear;
  const medicare = (fica.medicare + fica.additionalMedicare) / periodsPerYear;

  const taxableAnnual = Math.max(0, annualGross - STANDARD_DEDUCTION_2026.single);
  const annualFederal = calculateFederalIncomeTax(taxableAnnual, "single");
  const estimatedFederal = annualFederal / periodsPerYear;

  const federalTax =
    input.federalTaxOverride !== null ? input.federalTaxOverride : estimatedFederal;

  const otherDeductionsTotal = input.otherDeductions.reduce(
    (sum, d) => sum + Math.max(0, d.amount),
    0,
  );
  const stateTax = Math.max(0, input.stateTax);
  const totalDeductions =
    federalTax + socialSecurity + medicare + stateTax + otherDeductionsTotal;
  const netPay = grossPay - totalDeductions;

  return {
    grossPay,
    federalTax,
    federalTaxEstimated: input.federalTaxOverride === null,
    socialSecurity,
    medicare,
    stateTax,
    otherDeductionsTotal,
    totalDeductions,
    netPay,
    periodsPerYear,
  };
}

export function formatPayDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
