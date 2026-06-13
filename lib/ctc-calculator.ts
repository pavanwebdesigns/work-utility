export type ProfessionalTaxOption = {
  id: string;
  label: string;
  monthly: number;
};

export const PROFESSIONAL_TAX_OPTIONS: ProfessionalTaxOption[] = [
  { id: "maharashtra", label: "Maharashtra (₹200/month)", monthly: 200 },
  { id: "karnataka", label: "Karnataka (₹200/month)", monthly: 200 },
  { id: "west-bengal", label: "West Bengal (₹200/month)", monthly: 200 },
  { id: "tamil-nadu", label: "Tamil Nadu (₹212.5/month)", monthly: 212.5 },
  { id: "telangana", label: "Telangana (₹200/month)", monthly: 200 },
  { id: "none", label: "No Professional Tax", monthly: 0 },
  { id: "custom", label: "Custom amount", monthly: 0 },
];

export type CtcResult = {
  annualCtc: number;
  basic: number;
  hra: number;
  specialAllowance: number;
  pfEmployee: number;
  professionalTaxAnnual: number;
  incomeTax: number;
  totalDeductions: number;
  annualInHand: number;
  monthlyInHand: number;
};

function estimateNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  if (taxableIncome <= 700000) {
    return 0;
  }

  let tax = 0;
  const slabs = [
    { upTo: 300000, rate: 0 },
    { upTo: 700000, rate: 0.05 },
    { upTo: 1000000, rate: 0.1 },
    { upTo: 1200000, rate: 0.15 },
    { upTo: 1500000, rate: 0.2 },
    { upTo: Infinity, rate: 0.3 },
  ];

  let previous = 0;
  for (const slab of slabs) {
    if (taxableIncome <= previous) break;
    const taxableInSlab = Math.min(taxableIncome, slab.upTo) - previous;
    if (taxableInSlab > 0) {
      tax += taxableInSlab * slab.rate;
    }
    previous = slab.upTo;
  }

  return Math.max(0, tax);
}

export function calculateCtcToInHand(
  annualCtc: number,
  pfEnabled: boolean,
  professionalTaxMonthly: number
): CtcResult | null {
  if (annualCtc <= 0) return null;

  const basic = annualCtc * 0.5;
  const hra = annualCtc * 0.2;
  const specialAllowance = annualCtc * 0.3;
  const pfEmployee = pfEnabled ? basic * 0.12 : 0;
  const professionalTaxAnnual = professionalTaxMonthly * 12;

  const standardDeduction = 75000;
  const taxableIncome = Math.max(
    0,
    annualCtc - pfEmployee - professionalTaxAnnual - standardDeduction
  );
  const incomeTax = estimateNewRegimeTax(taxableIncome);
  const totalDeductions = pfEmployee + professionalTaxAnnual + incomeTax;
  const annualInHand = annualCtc - totalDeductions;

  return {
    annualCtc,
    basic,
    hra,
    specialAllowance,
    pfEmployee,
    professionalTaxAnnual,
    incomeTax,
    totalDeductions,
    annualInHand,
    monthlyInHand: annualInHand / 12,
  };
}
