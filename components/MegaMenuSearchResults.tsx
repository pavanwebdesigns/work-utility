"use client";

import Link from "next/link";
import { ALL_TOOLS } from "@/lib/tools-data";
import { getToolPageCategoryLabel, searchTools } from "@/lib/tool-categories";
import { setStoredMenuCategory } from "@/lib/mega-menu-utils";
import { getMenuCategoryForSlug } from "@/lib/menu-categories";
import { SoonBadge } from "@/components/SoonBadge";

type MegaMenuSearchResultsProps = {
  query: string;
  onNavigate?: () => void;
  className?: string;
};

export function MegaMenuSearchResults({
  query,
  onNavigate,
  className = "",
}: MegaMenuSearchResultsProps) {
  const trimmed = query.trim();
  const results = searchTools(trimmed);

  if (results.length === 0) {
    return (
      <div className={`px-4 py-8 text-center ${className}`}>
        <p className="text-sm text-content-secondary">
          No tools found for &apos;{trimmed}&apos;. Try a different search.
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-y-auto ${className}`}>
      <ul role="list" className="m-0 list-none p-2">
        {results.map((tool) => {
          const allTool = ALL_TOOLS.find((item) => item.slug === tool.slug);
          const Icon = tool.icon;
          const categoryId = getMenuCategoryForSlug(tool.slug);
          const categoryLabel = getToolPageCategoryLabel(tool.slug);

          return (
            <li key={tool.slug} role="none">
              <Link
                href={tool.href}
                role="menuitem"
                onClick={() => {
                  if (categoryId) setStoredMenuCategory(categoryId);
                  onNavigate?.();
                }}
                className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${allTool?.bgClass ?? "bg-surface-elevated"}`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${allTool?.textClass ?? "text-content-secondary"}`}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-content-primary">
                  {tool.title}
                </span>
                {categoryLabel && (
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-content-muted">
                    {categoryLabel}
                  </span>
                )}
                {tool.comingSoon && <SoonBadge />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
