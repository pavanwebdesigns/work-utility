"use client";

import { useMemo, useState } from "react";
import { ToolCard } from "@/components/ToolCard";
import { TOOL_CATEGORY_ICONS } from "@/components/ToolCategoryIcons";
import {
  TOOL_PAGE_CATEGORY_TABS,
  TOOL_PAGE_SECTION_LABELS,
  buildToolListing,
  type ToolPageCategoryId,
} from "@/lib/tool-categories";

export function ToolsCategorySection() {
  const [activeCategory, setActiveCategory] = useState<ToolPageCategoryId>("all");
  const tools = useMemo(() => buildToolListing(), []);

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((tool) => tool.pageCategory === activeCategory);

  return (
    <>
      <div className="mb-8 flex gap-2 overflow-x-auto whitespace-nowrap border-b border-surface-border pb-3.5">
        {TOOL_PAGE_CATEGORY_TABS.map((category) => {
          const Icon = TOOL_CATEGORY_ICONS[category.id];
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={isActive}
              aria-label={`Filter by ${category.label}`}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-blue text-white"
                  : "text-content-secondary hover:bg-surface-elevated hover:text-content-primary"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {category.label}
            </button>
          );
        })}
      </div>

      <p className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
        {TOOL_PAGE_SECTION_LABELS[activeCategory]}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <div key={tool.href} className="w-full min-w-0">
            <ToolCard
              title={tool.title}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              accent={tool.accent}
              popular={tool.popular}
              comingSoon={tool.comingSoon}
            />
          </div>
        ))}
      </div>
    </>
  );
}
