"use client";

import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { SoonBadge } from "@/components/SoonBadge";
import { getCategoryToolsUrl, setStoredMenuCategory } from "@/lib/mega-menu-utils";
import type { MegaMenuCategory } from "@/lib/tools-data";
import { TOOL_ICONS } from "@/lib/tools-data";
import type { MenuCategoryId } from "@/lib/menu-categories";

type MegaMenuToolGridProps = {
  category: MegaMenuCategory;
  onNavigate?: () => void;
};

export function MegaMenuToolGrid({ category, onNavigate }: MegaMenuToolGridProps) {
  const categoryId = category.id as MenuCategoryId;
  const count = category.tools.length;

  const handleToolClick = () => {
    setStoredMenuCategory(categoryId);
    onNavigate?.();
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <ul role="list" className="m-0 grid list-none grid-cols-2 gap-0.5 p-0 xl:grid-cols-3">
          {category.tools.map((item) => {
            const { tool, displayName, comingSoon } = item;
            const Icon = TOOL_ICONS[tool.icon] ?? Wrench;

            return (
              <li key={tool.slug} role="none">
                <Link
                  href={tool.href}
                  role="menuitem"
                  onClick={handleToolClick}
                  className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                    comingSoon ? "opacity-70" : ""
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${tool.bgClass}`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${tool.textClass}`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0 truncate font-medium text-content-primary group-hover:text-content-primary">
                    {displayName ?? tool.name}
                  </span>
                  {comingSoon && <SoonBadge />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="shrink-0 border-t border-surface-border bg-surface-card px-4 py-2.5">
        <Link
          href={getCategoryToolsUrl(categoryId)}
          onClick={onNavigate}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-blue transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          View all {count} {category.title.toLowerCase()}
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
