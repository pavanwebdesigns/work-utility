import Link from "next/link";
import { ALL_TOOLS, TOOL_ICONS } from "@/lib/tools-data";
import {
  getRelatedToolsCategoryLabel,
  getSameCategoryRelatedTools,
} from "@/lib/tool-structured-data";

type RelatedToolsProps = {
  currentSlug: string;
  /** Horizontal cards on small screens. */
  layout?: "grid" | "scroll";
  guide?: { href: string; title: string } | null;
  /** When set, show these tools instead of the same-category neighbors. */
  slugs?: readonly string[];
};

export function RelatedTools({
  currentSlug,
  layout = "grid",
  guide = null,
  slugs,
}: RelatedToolsProps) {
  const relatedTools = slugs
    ? slugs.flatMap((slug) => {
        const tool = ALL_TOOLS.find((entry) => entry.slug === slug);
        return tool ? [tool] : [];
      })
    : getSameCategoryRelatedTools(currentSlug, 4);
  const categoryLabel = slugs ? null : getRelatedToolsCategoryLabel(currentSlug);

  if (relatedTools.length === 0 && !guide) {
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
      {guide && (
        <p className="mb-4 text-sm text-content-secondary">
          <Link href={guide.href} className="text-brand-blue hover:underline">
            {guide.title}
          </Link>
        </p>
      )}
      <div
        className={
          layout === "scroll"
            ? "flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible"
            : "grid grid-cols-1 gap-3 sm:grid-cols-2"
        }
      >
        {relatedTools.map((tool) => {
          const Icon = TOOL_ICONS[tool.icon];

          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className={`flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4 transition-all hover:border-brand-blue/40 hover:bg-surface-elevated ${
                layout === "scroll" ? "w-[260px] shrink-0 sm:w-auto" : ""
              }`}
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
