"use client";

import { ToolsSearchBar } from "@/components/ToolsSearchBar";
import { TOOL_CATEGORY_ICONS } from "@/components/ToolCategoryIcons";
import {
  TOOL_PAGE_CATEGORY_TABS,
  type ToolPageCategoryId,
} from "@/lib/tool-categories";

type ToolsCategorySectionProps = {
  activeCategory: ToolPageCategoryId;
  onCategoryChange: (category: ToolPageCategoryId) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  counts: Record<ToolPageCategoryId, number>;
};

export function ToolsCategorySection({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  counts,
}: ToolsCategorySectionProps) {
  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <ToolsSearchBar
        value={searchQuery}
        onChange={onSearchChange}
        onClear={() => onSearchChange("")}
      />

      {!isSearching && (
        <div className="mb-8 flex gap-2 overflow-x-auto whitespace-nowrap border-b border-surface-border pb-3.5">
          {TOOL_PAGE_CATEGORY_TABS.map((category) => {
            const Icon = TOOL_CATEGORY_ICONS[category.id];
            const isActive = activeCategory === category.id;
            const count = counts[category.id];

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                aria-pressed={isActive}
                aria-label={`Filter by ${category.label}`}
                className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-blue text-white"
                    : "text-content-secondary hover:bg-surface-elevated hover:text-content-primary"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                <span>{category.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-surface-elevated text-content-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
