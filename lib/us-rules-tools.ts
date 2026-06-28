export const US_RULES_TOOL_SLUGS = [
  "paycheck-calculator",
  "mortgage-calculator",
  "w2-vs-1099-calculator",
  "self-employment-tax",
  "401k-calculator",
] as const;

export type USRulesToolSlug = (typeof US_RULES_TOOL_SLUGS)[number];

export const US_RULES_BADGE_LABELS: Record<USRulesToolSlug, string> = {
  "paycheck-calculator":
    "Based on 2026 US Federal tax rules (IRS Rev. Proc. 2025-32)",
  "mortgage-calculator":
    "Calculations based on standard US mortgage conventions",
  "w2-vs-1099-calculator": "Based on IRS 2026 guidelines",
  "self-employment-tax": "Based on IRS 2026 guidelines",
  "401k-calculator": "Based on 2026 IRS 401k contribution limits",
};

export const US_RULES_CURRENCY = {
  currency: "USD" as const,
  symbol: "$",
  name: "USD",
};

export function isUSRulesToolSlug(slug: string): slug is USRulesToolSlug {
  return (US_RULES_TOOL_SLUGS as readonly string[]).includes(slug);
}
