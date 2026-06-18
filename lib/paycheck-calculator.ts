export type FilingStatus = "single" | "mfj" | "hoh";

export type PayFrequency =
  | "weekly"
  | "biweekly"
  | "semimonthly"
  | "monthly"
  | "annual";

export type SalaryInputMode = "annual" | "hourly";

export const NO_STATE_INCOME_TAX_STATES = new Set([
  "AK",
  "FL",
  "NV",
  "NH",
  "SD",
  "TN",
  "TX",
  "WA",
  "WY",
]);

export const US_STATES_AND_DC: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  hoh: 24150,
};

const SS_RATE = 0.062;
const SS_WAGE_BASE_2026 = 184500;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
  hoh: 200000,
};

type Bracket = { upTo: number; rate: number };

const FEDERAL_BRACKETS_2026: Record<FilingStatus, Bracket[]> = {
  single: [
    { upTo: 12400, rate: 0.1 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  mfj: [
    { upTo: 24800, rate: 0.1 },
    { upTo: 100800, rate: 0.12 },
    { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 },
    { upTo: 512450, rate: 0.32 },
    { upTo: 768700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  hoh: [
    { upTo: 17700, rate: 0.1 },
    { upTo: 67450, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201750, rate: 0.24 },
    { upTo: 256200, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

export type PaycheckInputs = {
  salaryInputMode: SalaryInputMode;
  annualSalary: number;
  hourlyRate: number;
  hoursPerWeek: number;
  payFrequency: PayFrequency;
  filingStatus: FilingStatus;
  stateCode: string;
  stateTaxRatePercent: number;
  retirement401kPercent: number;
  healthInsuranceMonthly: number;
  hsaMonthly: number;
};

export type PaycheckResult = {
  grossAnnual: number;
  preTaxDeductionsAnnual: number;
  federalTaxableIncome: number;
  federalTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  ficaTotal: number;
  stateTax: number;
  stateTaxIsEstimate: boolean;
  netAnnual: number;
  netPerPayPeriod: number;
  grossPerPayPeriod: number;
  effectiveFederalRate: number;
  marginalFederalBracket: number;
  chartBreakdown: {
    takeHome: number;
    federalTax: number;
    fica: number;
    stateTax: number;
    preTaxDeductions: number;
  };
};

const PAY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annual: 1,
};

export function annualGrossFromInputs(inputs: PaycheckInputs): number {
  if (inputs.salaryInputMode === "hourly") {
    return Math.max(0, inputs.hourlyRate) * Math.max(0, inputs.hoursPerWeek) * 52;
  }
  return Math.max(0, inputs.annualSalary);
}

function calculateFederalTax(taxableIncome: number, filingStatus: FilingStatus): number {
  if (taxableIncome <= 0) return 0;

  const brackets = FEDERAL_BRACKETS_2026[filingStatus];
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    const taxableInBracket = Math.min(taxableIncome, bracket.upTo) - previousLimit;
    if (taxableInBracket <= 0) break;
    tax += taxableInBracket * bracket.rate;
    previousLimit = bracket.upTo;
  }

  return tax;
}

function getMarginalBracket(taxableIncome: number, filingStatus: FilingStatus): number {
  if (taxableIncome <= 0) return 0;
  const brackets = FEDERAL_BRACKETS_2026[filingStatus];
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.upTo) return bracket.rate;
  }
  return brackets[brackets.length - 1].rate;
}

function calculateFica(
  grossWages: number,
  filingStatus: FilingStatus,
): {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
} {
  const socialSecurity = SS_RATE * Math.min(grossWages, SS_WAGE_BASE_2026);
  const medicare = MEDICARE_RATE * grossWages;
  const threshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus];
  const additionalMedicare =
    grossWages > threshold
      ? ADDITIONAL_MEDICARE_RATE * (grossWages - threshold)
      : 0;

  return { socialSecurity, medicare, additionalMedicare };
}

export function calculatePaycheck(inputs: PaycheckInputs): PaycheckResult | null {
  const grossAnnual = annualGrossFromInputs(inputs);
  if (grossAnnual <= 0) return null;

  const retirement401k =
    grossAnnual * (Math.max(0, inputs.retirement401kPercent) / 100);
  const healthAnnual = Math.max(0, inputs.healthInsuranceMonthly) * 12;
  const hsaAnnual = Math.max(0, inputs.hsaMonthly) * 12;
  const preTaxDeductionsAnnual = retirement401k + healthAnnual + hsaAnnual;

  const wagesAfterPreTax = Math.max(0, grossAnnual - preTaxDeductionsAnnual);
  const standardDeduction = STANDARD_DEDUCTION_2026[inputs.filingStatus];
  const federalTaxableIncome = Math.max(0, wagesAfterPreTax - standardDeduction);

  const federalTax = calculateFederalTax(
    federalTaxableIncome,
    inputs.filingStatus,
  );

  const fica = calculateFica(grossAnnual, inputs.filingStatus);
  const ficaTotal =
    fica.socialSecurity + fica.medicare + fica.additionalMedicare;

  const noStateTax = NO_STATE_INCOME_TAX_STATES.has(inputs.stateCode);
  const stateTaxIsEstimate = !noStateTax;
  const stateRate = noStateTax
    ? 0
    : Math.max(0, inputs.stateTaxRatePercent) / 100;
  const stateTax = noStateTax ? 0 : wagesAfterPreTax * stateRate;

  const netAnnual =
    grossAnnual -
    preTaxDeductionsAnnual -
    federalTax -
    ficaTotal -
    stateTax;

  const periods = PAY_PERIODS[inputs.payFrequency];

  return {
    grossAnnual,
    preTaxDeductionsAnnual,
    federalTaxableIncome,
    federalTax,
    socialSecurityTax: fica.socialSecurity,
    medicareTax: fica.medicare,
    additionalMedicareTax: fica.additionalMedicare,
    ficaTotal,
    stateTax,
    stateTaxIsEstimate,
    netAnnual,
    netPerPayPeriod: netAnnual / periods,
    grossPerPayPeriod: grossAnnual / periods,
    effectiveFederalRate:
      wagesAfterPreTax > 0 ? federalTax / wagesAfterPreTax : 0,
    marginalFederalBracket: getMarginalBracket(
      federalTaxableIncome,
      inputs.filingStatus,
    ),
    chartBreakdown: {
      takeHome: netAnnual,
      federalTax,
      fica: ficaTotal,
      stateTax,
      preTaxDeductions: preTaxDeductionsAnnual,
    },
  };
}

export function payFrequencyLabel(frequency: PayFrequency): string {
  const labels: Record<PayFrequency, string> = {
    weekly: "Weekly",
    biweekly: "Biweekly",
    semimonthly: "Semi-monthly",
    monthly: "Monthly",
    annual: "Annual",
  };
  return labels[frequency];
}
