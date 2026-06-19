export const INDIA_RULES_TOOL_SLUGS = [
  "income-tax-calculator",
  "ctc-calculator",
  "hra-calculator",
  "epf-calculator",
  "gratuity-calculator",
  "lta-calculator",
  "gst-calculator",
  "loan-eligibility",
] as const;

export type IndiaRulesToolSlug = (typeof INDIA_RULES_TOOL_SLUGS)[number];

export const INDIA_RULES_BADGE_LABELS: Record<IndiaRulesToolSlug, string> = {
  "income-tax-calculator":
    "Based on Indian Income Tax rules (New Regime) — FY2025-26",
  "ctc-calculator": "Based on Indian salary & tax rules — FY2025-26",
  "hra-calculator":
    "Based on Indian HRA exemption rules (Section 10(13A)) — FY2025-26",
  "epf-calculator": "Based on Indian EPF rules — FY2025-26",
  "gratuity-calculator":
    "Based on the Payment of Gratuity Act — FY2025-26",
  "lta-calculator": "Based on Indian LTA exemption rules — FY2025-26",
  "gst-calculator": "Based on Indian GST rules — FY2025-26",
  "loan-eligibility": "Based on Indian banking guidelines",
};

export const INDIA_RULES_CURRENCY = {
  currency: "INR" as const,
  symbol: "₹",
  name: "INR",
};

export function isIndiaRulesToolSlug(slug: string): slug is IndiaRulesToolSlug {
  return (INDIA_RULES_TOOL_SLUGS as readonly string[]).includes(slug);
}
