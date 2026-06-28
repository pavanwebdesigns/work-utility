export type USFilingStatus = "single" | "mfj";

/** TCJA permanent standard deductions (OBBBA 2025). */
export const STANDARD_DEDUCTION_2026: Record<USFilingStatus, number> = {
  single: 15_700,
  mfj: 31_400,
};

export const SS_WAGE_BASE_2026 = 184_500;
export const SS_RATE = 0.062;
export const MEDICARE_RATE = 0.0145;
export const SE_SS_RATE = 0.124;
export const SE_MEDICARE_RATE = 0.029;
export const SE_TAX_MULTIPLIER = 0.9235;
export const QBI_DEDUCTION_RATE = 0.2;
export const SE_MINIMUM_INCOME = 400;
export const WORK_DAYS_PER_YEAR = 260;
export const WORK_HOURS_PER_YEAR = 2080;

export const ADDITIONAL_MEDICARE_THRESHOLD: Record<USFilingStatus, number> = {
  single: 200_000,
  mfj: 250_000,
};

export const ADDITIONAL_MEDICARE_RATE = 0.009;

type Bracket = { upTo: number; rate: number };

/** 2026 federal income tax brackets (single / MFJ). */
export const FEDERAL_BRACKETS_2026: Record<USFilingStatus, Bracket[]> = {
  single: [
    { upTo: 11_925, rate: 0.1 },
    { upTo: 48_475, rate: 0.12 },
    { upTo: 103_350, rate: 0.22 },
    { upTo: 197_300, rate: 0.24 },
    { upTo: 250_525, rate: 0.32 },
    { upTo: 626_350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  mfj: [
    { upTo: 23_850, rate: 0.1 },
    { upTo: 96_950, rate: 0.12 },
    { upTo: 206_700, rate: 0.22 },
    { upTo: 394_600, rate: 0.24 },
    { upTo: 501_050, rate: 0.32 },
    { upTo: 1_252_700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

export function calculateFederalIncomeTax(
  taxableIncome: number,
  filingStatus: USFilingStatus,
): number {
  if (taxableIncome <= 0) return 0;

  const brackets = FEDERAL_BRACKETS_2026[filingStatus];
  let tax = 0;
  let previous = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= previous) break;
    const amount = Math.min(taxableIncome, bracket.upTo) - previous;
    tax += amount * bracket.rate;
    previous = bracket.upTo;
  }

  return tax;
}

export function calculateEmployeeFica(
  wages: number,
  filingStatus: USFilingStatus,
): {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  total: number;
} {
  const socialSecurity = SS_RATE * Math.min(Math.max(wages, 0), SS_WAGE_BASE_2026);
  const medicare = MEDICARE_RATE * Math.max(wages, 0);
  const threshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus];
  const additionalMedicare =
    wages > threshold
      ? ADDITIONAL_MEDICARE_RATE * (wages - threshold)
      : 0;

  return {
    socialSecurity,
    medicare,
    additionalMedicare,
    total: socialSecurity + medicare + additionalMedicare,
  };
}

export type SelfEmploymentTaxResult = {
  seTaxBase: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  totalSeTax: number;
  seTaxDeduction: number;
};

export function calculateSelfEmploymentTax(
  netSeIncome: number,
  w2Wages: number,
  filingStatus: USFilingStatus,
): SelfEmploymentTaxResult {
  if (netSeIncome < SE_MINIMUM_INCOME) {
    return {
      seTaxBase: 0,
      socialSecurityTax: 0,
      medicareTax: 0,
      additionalMedicareTax: 0,
      totalSeTax: 0,
      seTaxDeduction: 0,
    };
  }

  const seTaxBase = netSeIncome * SE_TAX_MULTIPLIER;
  const ssRemaining = Math.max(0, SS_WAGE_BASE_2026 - Math.max(w2Wages, 0));
  const socialSecurityTax = Math.min(seTaxBase, ssRemaining) * SE_SS_RATE;
  const medicareTax = seTaxBase * SE_MEDICARE_RATE;

  const totalIncome = w2Wages + netSeIncome;
  const threshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus];
  const w2AdditionalMedicare =
    w2Wages > threshold ? ADDITIONAL_MEDICARE_RATE * (w2Wages - threshold) : 0;
  const combinedAdditionalMedicare =
    totalIncome > threshold
      ? ADDITIONAL_MEDICARE_RATE * (totalIncome - threshold)
      : 0;
  const additionalMedicareTax = Math.max(
    0,
    combinedAdditionalMedicare - w2AdditionalMedicare,
  );

  const totalSeTax = socialSecurityTax + medicareTax + additionalMedicareTax;
  const seTaxDeduction = totalSeTax / 2;

  return {
    seTaxBase,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    totalSeTax,
    seTaxDeduction,
  };
}

export const QUARTERLY_PAYMENT_SCHEDULE = [
  { quarter: "Q1 2026", period: "Jan–Mar", dueDate: "April 15, 2026" },
  { quarter: "Q2 2026", period: "Apr–May", dueDate: "June 17, 2026" },
  { quarter: "Q3 2026", period: "Jun–Aug", dueDate: "September 16, 2026" },
  { quarter: "Q4 2026", period: "Sep–Dec", dueDate: "January 15, 2027" },
] as const;

export const US_TAX_DISCLAIMER =
  "This calculator provides estimates for planning purposes. Consult a CPA or tax professional for personalized advice. Tax laws change frequently — verify with IRS.gov.";
