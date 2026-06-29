export const GST_DISCLAIMER =
  "GST rules change frequently. This tool reflects FY 2026-27 thresholds. Consult a CA for complex scenarios involving multiple business verticals or recent turnover.";

export type SupplyType = "services" | "goods" | "both";
export type StateCategory = "regular" | "special";

export type GstThresholdInput = {
  annualTurnover: number;
  supplyType: SupplyType;
  stateCategory: StateCategory;
  interStateSupply: boolean;
  exportServices: boolean;
  digitalOverseas: boolean;
};

export type GstVerdict = "not_required" | "mandatory";

export type GstThresholdResult = {
  verdict: GstVerdict;
  threshold: number;
  annualTurnover: number;
  reasons: string[];
  headline: string;
  detail: string;
};

const THRESHOLDS = {
  servicesRegular: 20_00_000,
  servicesSpecial: 10_00_000,
  goodsRegular: 40_00_000,
  goodsSpecial: 20_00_000,
} as const;

export function getGstThreshold(
  supplyType: SupplyType,
  stateCategory: StateCategory,
): number {
  if (supplyType === "goods") {
    return stateCategory === "special"
      ? THRESHOLDS.goodsSpecial
      : THRESHOLDS.goodsRegular;
  }
  return stateCategory === "special"
    ? THRESHOLDS.servicesSpecial
    : THRESHOLDS.servicesRegular;
}

export function checkGstThreshold(
  input: GstThresholdInput,
): GstThresholdResult | null {
  const { annualTurnover, supplyType, stateCategory, interStateSupply, exportServices } =
    input;

  if (annualTurnover < 0) return null;

  const threshold = getGstThreshold(supplyType, stateCategory);
  const reasons: string[] = [];

  if (interStateSupply) {
    reasons.push(
      "Inter-state supply requires GST registration regardless of turnover.",
    );
  }

  if (exportServices && annualTurnover > THRESHOLDS.servicesRegular) {
    reasons.push(
      "Export services count toward aggregate turnover — turnover exceeds ₹20 lakh.",
    );
  }

  if (!interStateSupply && !exportServices && annualTurnover > threshold) {
    reasons.push(
      `Annual turnover exceeds the ₹${(threshold / 100000).toFixed(0)} lakh threshold for your supply type and state.`,
    );
  }

  const mandatory = reasons.length > 0;

  if (mandatory) {
    return {
      verdict: "mandatory",
      threshold,
      annualTurnover,
      reasons,
      headline: "GST Registration is MANDATORY for you.",
      detail: `Reason: ${reasons[0]} Threshold for your situation: ₹${threshold.toLocaleString("en-IN")}. Your turnover: ₹${annualTurnover.toLocaleString("en-IN")}. You must register on the GST portal (gst.gov.in) within 30 days of becoming liable.`,
    };
  }

  return {
    verdict: "not_required",
    threshold,
    annualTurnover,
    reasons: [],
    headline: "GST registration is NOT mandatory for you.",
    detail: `Threshold for your situation: ₹${threshold.toLocaleString("en-IN")}. Your turnover: ₹${annualTurnover.toLocaleString("en-IN")}. Registration not required. Note: You can voluntarily register for GST if you have B2B clients who need GST invoices or if you plan to export.`,
  };
}
