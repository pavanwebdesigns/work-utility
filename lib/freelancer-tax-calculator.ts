export type TaxRegime = "new" | "old";
export type FreelancerProfession =
  | "it-software"
  | "medical"
  | "architect-engineer"
  | "legal"
  | "chartered-accountant"
  | "interior-designer"
  | "film-creative"
  | "other";

export type FreelancerTaxInput = {
  grossReceipts: number;
  digitalPercent: number;
  profession: FreelancerProfession;
  actualExpenses?: number;
  otherIncome: number;
  regime: TaxRegime;
  section80c: number;
  section80d: number;
};

export type EligibilityStatus =
  | { eligible: true; limit: number; message: string }
  | { eligible: false; message: string };

export type TaxBreakdown = {
  grossReceipts: number;
  presumptiveIncome: number;
  deductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  itrForm: string;
};

export type FreelancerTaxResult = {
  eligibility: EligibilityStatus;
  section44Ada: TaxBreakdown | null;
  regularBooks: TaxBreakdown | null;
  savingsWith44Ada: number | null;
  savingsWithRegular: number | null;
  verdict: string | null;
};

const ELIGIBLE_PROFESSIONS: FreelancerProfession[] = [
  "it-software",
  "medical",
  "architect-engineer",
  "legal",
  "chartered-accountant",
  "interior-designer",
  "film-creative",
];

function getEligibility(
  grossReceipts: number,
  digitalPercent: number,
  profession: FreelancerProfession,
): EligibilityStatus {
  if (profession === "other") {
    return {
      eligible: false,
      message:
        "Section 44ADA applies to specified professions only (IT, medical, legal, CA, architecture, interior design, film). General consultancy is not eligible.",
    };
  }

  if (!ELIGIBLE_PROFESSIONS.includes(profession)) {
    return {
      eligible: false,
      message: "This profession is not eligible for Section 44ADA.",
    };
  }

  const limit = digitalPercent >= 95 ? 7_500_000 : 5_000_000;

  if (grossReceipts > limit) {
    return {
      eligible: false,
      message: `You exceed the ₹${limit / 100_000} lakh limit — 44ADA is not available. Regular taxation (ITR-3) applies.`,
    };
  }

  return {
    eligible: true,
    limit,
    message:
      digitalPercent >= 95
        ? "✅ You are eligible for Section 44ADA (digital receipts ≥ 95%, limit ₹75 lakh)."
        : "✅ You are eligible for Section 44ADA (limit ₹50 lakh).",
  };
}

function calculateSlabTaxNewRegime(taxableIncome: number): {
  tax: number;
  rebate: number;
} {
  const slabs = [
    { upTo: 400_000, rate: 0 },
    { upTo: 800_000, rate: 0.05 },
    { upTo: 1_200_000, rate: 0.1 },
    { upTo: 1_600_000, rate: 0.15 },
    { upTo: 2_000_000, rate: 0.2 },
    { upTo: 2_400_000, rate: 0.25 },
    { upTo: Infinity, rate: 0.3 },
  ];

  let tax = 0;
  let previous = 0;
  for (const slab of slabs) {
    if (taxableIncome <= previous) break;
    const amount = Math.min(taxableIncome, slab.upTo) - previous;
    tax += amount * slab.rate;
    previous = slab.upTo;
  }

  const rebate = taxableIncome <= 1_200_000 ? Math.min(tax, 60_000) : 0;
  return { tax, rebate };
}

function calculateSlabTaxOldRegime(taxableIncome: number): {
  tax: number;
  rebate: number;
} {
  const slabs = [
    { upTo: 250_000, rate: 0 },
    { upTo: 500_000, rate: 0.05 },
    { upTo: 1_000_000, rate: 0.2 },
    { upTo: Infinity, rate: 0.3 },
  ];

  let tax = 0;
  let previous = 0;
  for (const slab of slabs) {
    if (taxableIncome <= previous) break;
    const amount = Math.min(taxableIncome, slab.upTo) - previous;
    tax += amount * slab.rate;
    previous = slab.upTo;
  }

  const rebate = taxableIncome <= 500_000 ? Math.min(tax, 12_500) : 0;
  return { tax, rebate };
}

function computeTax(
  taxableIncome: number,
  regime: TaxRegime,
  grossReceipts: number,
): Omit<TaxBreakdown, "grossReceipts" | "presumptiveIncome" | "deductions" | "itrForm"> & {
  itrForm: string;
} {
  const { tax: taxBeforeRebate, rebate } =
    regime === "new"
      ? calculateSlabTaxNewRegime(taxableIncome)
      : calculateSlabTaxOldRegime(taxableIncome);

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate);
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;

  return {
    taxableIncome,
    taxBeforeRebate,
    rebate,
    cess,
    totalTax,
    effectiveRate: grossReceipts > 0 ? (totalTax / grossReceipts) * 100 : 0,
    itrForm: "ITR-4 (Sugam)",
  };
}

function build44AdaTax(
  input: FreelancerTaxInput,
): TaxBreakdown | null {
  const presumptiveIncome = input.grossReceipts * 0.5;
  let deductions = 0;

  if (input.regime === "old") {
    deductions =
      Math.min(Math.max(input.section80c, 0), 150_000) +
      Math.min(Math.max(input.section80d, 0), 25_000);
  }

  const taxableIncome = Math.max(
    0,
    presumptiveIncome + input.otherIncome - deductions,
  );
  const taxParts = computeTax(
    taxableIncome,
    input.regime,
    input.grossReceipts,
  );

  return {
    grossReceipts: input.grossReceipts,
    presumptiveIncome,
    deductions,
    ...taxParts,
  };
}

function buildRegularTax(input: FreelancerTaxInput): TaxBreakdown | null {
  if (input.actualExpenses === undefined || input.actualExpenses < 0) {
    return null;
  }

  const netProfessionalIncome = Math.max(
    0,
    input.grossReceipts - input.actualExpenses,
  );
  let deductions = 0;

  if (input.regime === "old") {
    deductions =
      Math.min(Math.max(input.section80c, 0), 150_000) +
      Math.min(Math.max(input.section80d, 0), 25_000);
  } else {
    deductions = 75_000;
  }

  const taxableIncome = Math.max(
    0,
    netProfessionalIncome + input.otherIncome - deductions,
  );
  const taxParts = computeTax(
    taxableIncome,
    input.regime,
    input.grossReceipts,
  );

  return {
    grossReceipts: input.grossReceipts,
    presumptiveIncome: netProfessionalIncome,
    deductions,
    ...taxParts,
    itrForm: "ITR-3",
  };
}

export function calculateFreelancerTax(
  input: FreelancerTaxInput,
): FreelancerTaxResult | null {
  if (input.grossReceipts <= 0) return null;

  const eligibility = getEligibility(
    input.grossReceipts,
    input.digitalPercent,
    input.profession,
  );

  if (!eligibility.eligible) {
    return {
      eligibility,
      section44Ada: null,
      regularBooks: null,
      savingsWith44Ada: null,
      savingsWithRegular: null,
      verdict: null,
    };
  }

  const section44Ada = build44AdaTax(input);
  const regularBooks = buildRegularTax(input);

  let savingsWith44Ada: number | null = null;
  let savingsWithRegular: number | null = null;
  let verdict: string | null = null;

  if (section44Ada && regularBooks) {
    const diff = regularBooks.totalTax - section44Ada.totalTax;
    if (diff > 0) {
      savingsWith44Ada = diff;
      verdict = `44ADA saves you ${Math.round(diff).toLocaleString("en-IN")} compared to regular books.`;
    } else if (diff < 0) {
      savingsWithRegular = Math.abs(diff);
      verdict = `Regular books save you ${Math.round(Math.abs(diff)).toLocaleString("en-IN")} compared to 44ADA.`;
    } else {
      verdict = "Both methods result in the same tax liability.";
    }
  }

  return {
    eligibility,
    section44Ada,
    regularBooks,
    savingsWith44Ada,
    savingsWithRegular,
    verdict,
  };
}

export const FREELANCER_PROFESSION_OPTIONS: {
  value: FreelancerProfession;
  label: string;
}[] = [
  { value: "it-software", label: "IT / Software Developer" },
  { value: "medical", label: "Doctor / Medical" },
  { value: "architect-engineer", label: "Architect / Engineer" },
  { value: "legal", label: "Lawyer / Legal" },
  { value: "chartered-accountant", label: "Chartered Accountant" },
  { value: "interior-designer", label: "Interior Designer" },
  { value: "film-creative", label: "Film / Creative" },
  { value: "other", label: "Other (not eligible)" },
];
