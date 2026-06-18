export const US_RULES_TOOL_SLUGS = [
  "paycheck-calculator",
  "mortgage-calculator",
] as const;

export type USRulesToolSlug = (typeof US_RULES_TOOL_SLUGS)[number];

export const US_RULES_BADGE_LABELS: Record<USRulesToolSlug, string> = {
  "paycheck-calculator":
    "Based on 2026 US Federal tax rules (IRS Rev. Proc. 2025-32)",
  "mortgage-calculator":
    "Calculations based on standard US mortgage conventions",
};

export const US_RULES_CURRENCY = {
  currency: "USD" as const,
  symbol: "$",
  name: "USD",
};

export function isUSRulesToolSlug(slug: string): slug is USRulesToolSlug {
  return (US_RULES_TOOL_SLUGS as readonly string[]).includes(slug);
}
