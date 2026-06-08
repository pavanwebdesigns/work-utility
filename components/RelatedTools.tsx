import Link from "next/link";
import { ALL_TOOLS, RELATED_TOOLS, TOOL_ICONS } from "@/lib/tools-data";

type RelatedToolsProps = {
  currentSlug: string;
};

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const relatedSlugs = RELATED_TOOLS[currentSlug] ?? [];
  const relatedTools = relatedSlugs
    .map((slug) => ALL_TOOLS.find((tool) => tool.slug === slug))
    .filter((tool): tool is (typeof ALL_TOOLS)[number] => Boolean(tool));

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-content-secondary">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {relatedTools.map((tool) => {
          const Icon = TOOL_ICONS[tool.icon];

          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface-card p-4 transition-all hover:border-brand-blue"
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
                <p className="text-xs text-content-secondary">
                  {tool.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
