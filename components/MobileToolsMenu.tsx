"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { MegaMenuSearchBar } from "@/components/MegaMenuSearch";
import { MegaMenuSearchResults } from "@/components/MegaMenuSearchResults";
import { TOOL_CATEGORY_ICONS } from "@/components/ToolCategoryIcons";
import { SoonBadge } from "@/components/SoonBadge";
import { getMegaMenuCategories, TOOL_ICONS } from "@/lib/tools-data";
import { setStoredMenuCategory } from "@/lib/mega-menu-utils";
import type { MenuCategoryId } from "@/lib/menu-categories";
import type { MegaMenuTool } from "@/lib/tools-data";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

function MobileToolLink({
  item,
  categoryId,
  onNavigate,
}: {
  item: MegaMenuTool;
  categoryId: MenuCategoryId;
  onNavigate?: () => void;
}) {
  const { tool, displayName, comingSoon } = item;
  const Icon = TOOL_ICONS[tool.icon];

  return (
    <li role="none">
      <Link
        href={tool.href}
        onClick={() => {
          setStoredMenuCategory(categoryId);
          onNavigate?.();
        }}
        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${tool.bgClass}`}
        >
          <Icon className={`h-3.5 w-3.5 ${tool.textClass}`} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1 truncate font-medium text-content-primary">
          {displayName ?? tool.name}
        </span>
        {comingSoon && <SoonBadge />}
      </Link>
    </li>
  );
}

type MobileToolsMenuProps = {
  onNavigate?: () => void;
};

export function MobileToolsMenu({ onNavigate }: MobileToolsMenuProps) {
  const categories = useMemo(() => getMegaMenuCategories(), []);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 150);
  const isSearching = debouncedQuery.trim().length > 0;

  const toggleCategory = (categoryId: string) => {
    setExpandedCategoryId((current) =>
      current === categoryId ? null : categoryId,
    );
  };

  return (
    <nav aria-label="Tools navigation" className="flex flex-col">
      <div className="sticky top-0 z-10 rounded-xl border border-surface-border bg-surface-card">
        <MegaMenuSearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
          autoFocus={false}
        />
      </div>

      {isSearching ? (
        <div className="mt-3 rounded-xl border border-surface-border bg-surface-card">
          <MegaMenuSearchResults
            query={debouncedQuery}
            onNavigate={onNavigate}
            className="max-h-[60vh]"
          />
        </div>
      ) : (
        <ul role="list" className="m-0 mt-3 list-none space-y-2 p-0">
          {categories.map((category) => {
            const isExpanded = expandedCategoryId === category.id;
            const Icon =
              TOOL_CATEGORY_ICONS[category.id as MenuCategoryId] ??
              TOOL_CATEGORY_ICONS.everyday;
            const count = category.tools.length;

            return (
              <li
                key={category.id}
                className="overflow-hidden rounded-xl border border-surface-border bg-surface-card"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-blue"
                  aria-expanded={isExpanded}
                  aria-controls={`mobile-category-${category.id}`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium text-content-primary">
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    {category.title}
                    <span className="rounded-full bg-surface-elevated px-1.5 py-0.5 text-[10px] font-semibold text-content-muted">
                      {count}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-content-muted transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isExpanded && (
                  <div
                    id={`mobile-category-${category.id}`}
                    className="border-t border-surface-border px-1 pb-2 pt-1"
                  >
                    <ul role="list" className="m-0 list-none p-0">
                      {category.tools.map((item) => (
                        <MobileToolLink
                          key={item.tool.slug}
                          item={item}
                          categoryId={category.id as MenuCategoryId}
                          onNavigate={onNavigate}
                        />
                      ))}
                    </ul>
                    <div className="border-t border-surface-border px-3 py-2">
                      <Link
                        href={`/tools?category=${category.id}`}
                        onClick={onNavigate}
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-blue hover:underline"
                      >
                        View all {count}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}

/** @deprecated Use MobileToolsMenu */
export function MegaMenuMobile({
  onNavigate,
}: {
  onNavigate?: () => void;
  onOpenFavorites?: () => void;
}) {
  return <MobileToolsMenu onNavigate={onNavigate} />;
}
