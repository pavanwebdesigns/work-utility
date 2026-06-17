import {
  INDIA_RULES_BADGE_LABELS,
  type IndiaRulesToolSlug,
} from "@/lib/india-rules-tools";

type IndiaRulesBadgeProps = {
  toolSlug: IndiaRulesToolSlug;
};

export function IndiaRulesBadge({ toolSlug }: IndiaRulesBadgeProps) {
  const label = INDIA_RULES_BADGE_LABELS[toolSlug];

  return (
    <div className="mx-auto mt-6 max-w-xl">
      <p
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-2 text-center text-xs font-medium leading-snug text-content-primary sm:text-sm"
        role="note"
      >
        <span aria-hidden="true">🇮🇳</span>
        <span>{label}</span>
      </p>
    </div>
  );
}
