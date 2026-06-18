import { US_RULES_CURRENCY } from "@/lib/us-rules-tools";

/** Fixed USD display for US-law-specific calculators — ignores the global region toggle. */
export function useUSRulesCurrency() {
  return US_RULES_CURRENCY;
}
