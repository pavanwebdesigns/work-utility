"use client";

import { useCallback, useRef } from "react";
import { TOOL_CATEGORY_ICONS } from "@/components/ToolCategoryIcons";
import type { MegaMenuCategory } from "@/lib/tools-data";
import type { MenuCategoryId } from "@/lib/menu-categories";

type MegaMenuCategoryListProps = {
  categories: MegaMenuCategory[];
  selectedCategoryId: MenuCategoryId;
  onSelectCategory: (id: MenuCategoryId) => void;
};

export function MegaMenuCategoryList({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: MegaMenuCategoryListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const focusCategoryAt = useCallback(
    (index: number) => {
      const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="option"]',
      );
      buttons?.[index]?.focus();
    },
    [],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusCategoryAt(Math.min(index + 1, categories.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusCategoryAt(Math.max(index - 1, 0));
      } else if (event.key === "Home") {
        event.preventDefault();
        focusCategoryAt(0);
      } else if (event.key === "End") {
        event.preventDefault();
        focusCategoryAt(categories.length - 1);
      }
    },
    [categories.length, focusCategoryAt],
  );

  return (
    <div className="w-[240px] flex-shrink-0 border-r border-surface-border bg-surface-base/50 py-2">
      <ul
        ref={listRef}
        role="listbox"
        aria-label="Tool categories"
        className="m-0 list-none p-0"
      >
        {categories.map((category, index) => {
          const isSelected = category.id === selectedCategoryId;
          const Icon =
            TOOL_CATEGORY_ICONS[category.id as MenuCategoryId] ??
            TOOL_CATEGORY_ICONS.everyday;
          const count = category.tools.length;

          return (
            <li key={category.id} role="none">
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                aria-current={isSelected ? "true" : undefined}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-blue ${
                  isSelected
                    ? "border-l-2 border-brand-blue bg-brand-blue/10 font-medium text-content-primary"
                    : "border-l-2 border-transparent text-content-secondary hover:bg-surface-elevated/60 hover:text-content-primary"
                }`}
                onClick={() => onSelectCategory(category.id as MenuCategoryId)}
                onMouseEnter={() => onSelectCategory(category.id as MenuCategoryId)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span className="min-w-0 flex-1 leading-snug">{category.title}</span>
                <span className="shrink-0 rounded-full bg-surface-elevated px-1.5 py-0.5 text-[10px] font-semibold text-content-muted">
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
