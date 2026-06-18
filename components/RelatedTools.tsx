import Link from "next/link";
import { TOOL_ICONS } from "@/lib/tools-data";
import {
  getRelatedToolsCategoryLabel,
  getSameCategoryRelatedTools,
} from "@/lib/tool-structured-data";

type RelatedToolsProps = {
  currentSlug: string;
};

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const relatedTools = getSameCategoryRelatedTools(currentSlug, 4);
  const categoryLabel = getRelatedToolsCategoryLabel(currentSlug);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <aside
      className="mt-16 rounded-2xl border border-dashed border-surface-border bg-surface-base/50 p-5 sm:p-6"
      aria-label="Related tools"
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-content-secondary">
          Related Tools
        </h2>
        {categoryLabel && (
          <p className="mt-1 text-xs text-content-muted">
            More from {categoryLabel}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {relatedTools.map((tool) => {
          const Icon = TOOL_ICONS[tool.icon];

          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4 transition-all hover:border-brand-blue/40 hover:bg-surface-elevated"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tool.bgClass}`}
              >
                {Icon && (
                  <Icon
                    className={`h-[18px] w-[18px] ${tool.textClass}`}
                    strokeWidth={1.75}
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-content-primary">
                  {tool.name}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs text-content-secondary">
                  {tool.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
