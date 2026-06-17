import { INDIA_RULES_CURRENCY } from "@/lib/india-rules-tools";

/** Fixed INR display for India-law-specific calculators — ignores the global region toggle. */
export function useIndiaRulesCurrency() {
  return INDIA_RULES_CURRENCY;
}
