export type AssetType =
  | "listed-equity"
  | "property"
  | "gold"
  | "debt-mf"
  | "unlisted";

export type GainTerm = "stcg" | "ltcg";

export type CapitalGainsInput = {
  assetType: AssetType;
  purchaseDate: string;
  saleDate: string;
  purchasePrice: number;
  salePrice: number;
  purchaseExpenses: number;
  saleExpenses: number;
  slabRatePercent: number;
  propertyAcquiredBeforeJuly2024: boolean;
};

export type PropertyTaxOption = {
  label: string;
  taxableGain: number;
  taxRate: number;
  tax: number;
  cess: number;
  totalTax: number;
  usesIndexation: boolean;
};

export type CapitalGainsResult = {
  assetType: AssetType;
  assetLabel: string;
  holdingDays: number;
  holdingLabel: string;
  gainTerm: GainTerm;
  gainTermLabel: string;
  capitalGain: number;
  exemptionApplied: number;
  taxableGain: number;
  taxRate: number;
  taxRateNote: string;
  capitalGainsTax: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  netProfitAfterTax: number;
  propertyOptions?: PropertyTaxOption[];
  propertyRecommendation?: string;
  purchaseCii?: number;
  saleCii?: number;
  indexedCost?: number;
};

const LTCG_EQUITY_EXEMPTION = 125_000;
const CESS_RATE = 0.04;
const PROPERTY_INDEXATION_CUTOFF = new Date("2024-07-23");
const DEBT_MF_RULE_DATE = new Date("2023-04-01");

/** Approximate CII (FY ending year → index, base FY 2001-02 = 100). */
const CII_BY_FY: Record<number, number> = {
  2002: 100,
  2003: 105,
  2004: 109,
  2005: 113,
  2006: 117,
  2007: 122,
  2008: 129,
  2009: 137,
  2010: 148,
  2011: 167,
  2012: 184,
  2013: 200,
  2014: 220,
  2015: 240,
  2016: 254,
  2017: 264,
  2018: 272,
  2019: 280,
  2020: 289,
  2021: 301,
  2022: 317,
  2023: 331,
  2024: 348,
  2025: 363,
  2026: 376,
};

export const ASSET_TYPE_OPTIONS: { value: AssetType; label: string }[] = [
  { value: "listed-equity", label: "Listed Equity Shares / Equity Mutual Funds" },
  { value: "property", label: "Property (Residential / Commercial)" },
  { value: "gold", label: "Gold / Jewellery" },
  { value: "debt-mf", label: "Debt Mutual Funds (purchased after April 1, 2023)" },
  { value: "unlisted", label: "Unlisted Shares / Other Assets" },
];

export const SLAB_RATE_OPTIONS = [5, 10, 15, 20, 30];

function parseDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function financialYearEnd(date: Date): number {
  const month = date.getMonth();
  const year = date.getFullYear();
  return month >= 3 ? year + 1 : year;
}

export function getCii(fyEndYear: number): number {
  if (fyEndYear <= 2002) return 100;
  if (fyEndYear >= 2026) return 376;
  return CII_BY_FY[fyEndYear] ?? CII_BY_FY[2026];
}

export function getHoldingPeriod(
  purchaseDate: string,
  saleDate: string,
): { days: number; label: string } | null {
  const purchase = parseDate(purchaseDate);
  const sale = parseDate(saleDate);
  if (!purchase || !sale || sale <= purchase) return null;

  const days = Math.floor(
    (sale.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24),
  );
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (months > 0) parts.push(`${months} month${months === 1 ? "" : "s"}`);
  if (parts.length === 0) parts.push(`${days} day${days === 1 ? "" : "s"}`);

  return { days, label: parts.join(" ") };
}

function classifyGainTerm(
  assetType: AssetType,
  holdingDays: number,
): GainTerm {
  if (assetType === "debt-mf") return "stcg";
  if (assetType === "listed-equity") return holdingDays >= 365 ? "ltcg" : "stcg";
  return holdingDays >= 730 ? "ltcg" : "stcg";
}

function applyCess(tax: number): { cess: number; total: number } {
  const cess = tax * CESS_RATE;
  return { cess, total: tax + cess };
}

function buildResult(
  partial: Omit<
    CapitalGainsResult,
    | "effectiveRate"
    | "netProfitAfterTax"
    | "cess"
    | "totalTax"
    | "capitalGainsTax"
  > & {
    capitalGainsTax: number;
  },
): CapitalGainsResult {
  const { cess, total } = applyCess(partial.capitalGainsTax);
  const effectiveRate =
    partial.capitalGain > 0
      ? (total / partial.capitalGain) * 100
      : 0;

  return {
    ...partial,
    cess,
    totalTax: total,
    effectiveRate,
    netProfitAfterTax: partial.capitalGain - total,
  };
}

function calculatePropertyTax(
  input: CapitalGainsInput,
  purchase: Date,
  sale: Date,
  capitalGain: number,
): CapitalGainsResult {
  const purchaseFy = financialYearEnd(purchase);
  const saleFy = financialYearEnd(sale);
  const purchaseCii = getCii(purchaseFy);
  const saleCii = getCii(saleFy);
  const indexedCost =
    input.purchasePrice * (saleCii / purchaseCii) + input.purchaseExpenses;
  const indexedGain = Math.max(
    0,
    input.salePrice - indexedCost - input.saleExpenses,
  );

  const acquiredBeforeCutoff =
    input.propertyAcquiredBeforeJuly2024 && purchase < PROPERTY_INDEXATION_CUTOFF;

  const withoutIndexationTax = capitalGain * 0.125;
  const withIndexationTax = indexedGain * 0.2;

  if (acquiredBeforeCutoff) {
    const optionACess = applyCess(withoutIndexationTax);
    const optionA: PropertyTaxOption = {
      label: "Option A — 12.5% without indexation",
      taxableGain: capitalGain,
      taxRate: 12.5,
      tax: withoutIndexationTax,
      cess: optionACess.cess,
      totalTax: optionACess.total,
      usesIndexation: false,
    };
    const optionBCess = applyCess(withIndexationTax);
    const optionB: PropertyTaxOption = {
      label: "Option B — 20% with indexation",
      taxableGain: indexedGain,
      taxRate: 20,
      tax: withIndexationTax,
      cess: optionBCess.cess,
      totalTax: optionBCess.total,
      usesIndexation: true,
    };

    const better = optionA.totalTax <= optionB.totalTax ? optionA : optionB;
    const savings = Math.abs(optionA.totalTax - optionB.totalTax);
    const recommendation =
      optionA.totalTax <= optionB.totalTax
        ? `💡 Without indexation saves you ₹${Math.round(savings).toLocaleString("en-IN")} compared to indexation.`
        : `💡 With indexation saves you ₹${Math.round(savings).toLocaleString("en-IN")} compared to without indexation.`;

    return buildResult({
      assetType: input.assetType,
      assetLabel: ASSET_TYPE_OPTIONS.find((a) => a.value === input.assetType)!.label,
      holdingDays: getHoldingPeriod(input.purchaseDate, input.saleDate)!.days,
      holdingLabel: getHoldingPeriod(input.purchaseDate, input.saleDate)!.label,
      gainTerm: "ltcg",
      gainTermLabel: "LONG-TERM CAPITAL GAIN",
      capitalGain,
      exemptionApplied: 0,
      taxableGain: better.taxableGain,
      taxRate: better.taxRate,
      taxRateNote: better.label,
      capitalGainsTax: better.tax,
      propertyOptions: [optionA, optionB],
      propertyRecommendation: recommendation,
      purchaseCii,
      saleCii,
      indexedCost,
    });
  }

  return buildResult({
    assetType: input.assetType,
    assetLabel: ASSET_TYPE_OPTIONS.find((a) => a.value === input.assetType)!.label,
    holdingDays: getHoldingPeriod(input.purchaseDate, input.saleDate)!.days,
    holdingLabel: getHoldingPeriod(input.purchaseDate, input.saleDate)!.label,
    gainTerm: "ltcg",
    gainTermLabel: "LONG-TERM CAPITAL GAIN",
    capitalGain,
    exemptionApplied: 0,
    taxableGain: capitalGain,
    taxRate: 12.5,
    taxRateNote: "12.5% without indexation (property acquired on/after July 23, 2024)",
    capitalGainsTax: withoutIndexationTax,
    purchaseCii,
    saleCii,
    indexedCost,
  });
}

export function calculateCapitalGains(
  input: CapitalGainsInput,
): CapitalGainsResult | null {
  const purchase = parseDate(input.purchaseDate);
  const sale = parseDate(input.saleDate);
  if (!purchase || !sale || sale <= purchase) return null;
  if (input.purchasePrice <= 0 || input.salePrice <= 0) return null;

  const holding = getHoldingPeriod(input.purchaseDate, input.saleDate);
  if (!holding) return null;

  const capitalGain = Math.max(
    0,
    input.salePrice -
      input.purchasePrice -
      input.purchaseExpenses -
      input.saleExpenses,
  );

  const gainTerm = classifyGainTerm(input.assetType, holding.days);
  const gainTermLabel =
    gainTerm === "ltcg" ? "LONG-TERM CAPITAL GAIN" : "SHORT-TERM CAPITAL GAIN";
  const assetLabel =
    ASSET_TYPE_OPTIONS.find((a) => a.value === input.assetType)?.label ?? "";

  if (input.assetType === "property" && gainTerm === "ltcg") {
    return calculatePropertyTax(input, purchase, sale, capitalGain);
  }

  if (input.assetType === "listed-equity" && gainTerm === "ltcg") {
    const exemptionApplied = Math.min(LTCG_EQUITY_EXEMPTION, capitalGain);
    const taxableGain = Math.max(0, capitalGain - LTCG_EQUITY_EXEMPTION);
    const capitalGainsTax = taxableGain * 0.125;
    return buildResult({
      assetType: input.assetType,
      assetLabel,
      holdingDays: holding.days,
      holdingLabel: holding.label,
      gainTerm,
      gainTermLabel,
      capitalGain,
      exemptionApplied,
      taxableGain,
      taxRate: 12.5,
      taxRateNote:
        "₹1.25 lakh annual exemption applied (Section 112A). Tax at 12.5% on excess.",
      capitalGainsTax,
    });
  }

  if (input.assetType === "listed-equity" && gainTerm === "stcg") {
    const capitalGainsTax = capitalGain * 0.2;
    return buildResult({
      assetType: input.assetType,
      assetLabel,
      holdingDays: holding.days,
      holdingLabel: holding.label,
      gainTerm,
      gainTermLabel,
      capitalGain,
      exemptionApplied: 0,
      taxableGain: capitalGain,
      taxRate: 20,
      taxRateNote: "Section 111A applies — flat 20% regardless of tax slab.",
      capitalGainsTax,
    });
  }

  if (input.assetType === "gold" && gainTerm === "ltcg") {
    const capitalGainsTax = capitalGain * 0.125;
    return buildResult({
      assetType: input.assetType,
      assetLabel,
      holdingDays: holding.days,
      holdingLabel: holding.label,
      gainTerm,
      gainTermLabel,
      capitalGain,
      exemptionApplied: 0,
      taxableGain: capitalGain,
      taxRate: 12.5,
      taxRateNote: "12.5% without indexation on gold LTCG.",
      capitalGainsTax,
    });
  }

  if (
    input.assetType === "debt-mf" &&
    purchase >= DEBT_MF_RULE_DATE
  ) {
    const rate = input.slabRatePercent / 100;
    const capitalGainsTax = capitalGain * rate;
    return buildResult({
      assetType: input.assetType,
      assetLabel,
      holdingDays: holding.days,
      holdingLabel: holding.label,
      gainTerm: "stcg",
      gainTermLabel: "SHORT-TERM CAPITAL GAIN",
      capitalGain,
      exemptionApplied: 0,
      taxableGain: capitalGain,
      taxRate: input.slabRatePercent,
      taxRateNote:
        "Debt MF purchased after April 1, 2023 — taxed at slab rate regardless of holding period.",
      capitalGainsTax,
    });
  }

  const rate = input.slabRatePercent / 100;
  const capitalGainsTax = capitalGain * rate;
  return buildResult({
    assetType: input.assetType,
    assetLabel,
    holdingDays: holding.days,
    holdingLabel: holding.label,
    gainTerm,
    gainTermLabel,
    capitalGain,
    exemptionApplied: 0,
    taxableGain: capitalGain,
    taxRate: input.slabRatePercent,
    taxRateNote:
      gainTerm === "stcg"
        ? "Added to income and taxed at your selected slab rate."
        : "LTCG on unlisted/other assets at slab rate (simplified).",
    capitalGainsTax,
  });
}

export const CAPITAL_GAINS_DISCLAIMER =
  "Based on Budget 2024 capital gains tax rates, applicable for FY 2025-26 and FY 2026-27. No changes in Budget 2026. Consult a CA for complex transactions, NRI scenarios, or exemption planning (Section 54/54EC/54F).";
