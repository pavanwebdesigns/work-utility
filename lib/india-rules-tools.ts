export const INDIA_RULES_TOOL_SLUGS = [
  "income-tax-calculator",
  "ctc-calculator",
  "hra-calculator",
  "epf-calculator",
  "gratuity-calculator",
  "lta-calculator",
  "gst-calculator",
  "loan-eligibility",
  "labour-code-calculator",
  "freelancer-tax-calculator",
  "tax-regime-comparison",
  "ppf-calculator",
  "capital-gains-calculator",
  "rd-calculator",
  "nps-calculator",
  "leave-encashment-calculator",
  "cagr-calculator",
  "ssy-calculator",
  "advance-tax-calculator",
  "professional-tax-calculator",
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
  "labour-code-calculator":
    "Based on Indian tax/labour law — Code on Wages 2019, FY 2026-27",
  "freelancer-tax-calculator":
    "Based on Indian tax/labour law — Section 44ADA, FY 2026-27",
  "tax-regime-comparison":
    "Based on Indian tax/labour law — Income Tax FY 2026-27",
  "ppf-calculator":
    "Based on Indian tax/labour law — PPF rules, FY 2026-27",
  "capital-gains-calculator":
    "Based on Budget 2024 capital gains tax rates — FY 2025-26 & FY 2026-27",
  "rd-calculator":
    "Based on Indian banking RD rules — quarterly compounding, TDS thresholds",
  "nps-calculator":
    "Based on PFRDA NPS guidelines — FY 2026-27, 80CCD tax benefits",
  "leave-encashment-calculator":
    "Based on Indian Income Tax rules — Budget 2023 ₹25L exemption",
  "cagr-calculator":
    "Based on Indian investment return benchmarks — FY 2026-27",
  "ssy-calculator":
    "Based on Indian tax/labour law — SSY rules, Q1 FY2026-27 at 8.2%",
  "advance-tax-calculator":
    "Based on Indian Income Tax rules — Advance tax FY 2026-27",
  "professional-tax-calculator":
    "Based on Indian state Professional Tax slabs — FY 2026-27",
};

export const INDIA_RULES_CURRENCY = {
  currency: "INR" as const,
  symbol: "₹",
  name: "INR",
};

export function isIndiaRulesToolSlug(slug: string): slug is IndiaRulesToolSlug {
  return (INDIA_RULES_TOOL_SLUGS as readonly string[]).includes(slug);
}
