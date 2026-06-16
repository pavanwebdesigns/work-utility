"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";
import {
  ALL_TOOLS,
  getMegaMenuCategories,
  TOOL_ICONS,
  type MegaMenuCategory,
  type MegaMenuTool,
} from "@/lib/tools-data";
import { TOOL_CATEGORY_ICONS } from "@/components/ToolCategoryIcons";
import { SoonBadge } from "@/components/SoonBadge";
import type { ToolPageCategoryId } from "@/lib/tool-categories";

const megaMenuCategories = getMegaMenuCategories();

function MegaMenuToolCard({
  item,
  onNavigate,
}: {
  item: MegaMenuTool;
  onNavigate?: () => void;
}) {
  const { tool, description, displayName, comingSoon } = item;
  const Icon = TOOL_ICONS[tool.icon];

  return (
    <Link
      href={tool.href}
      role="menuitem"
      onClick={onNavigate}
      className={`group flex gap-3 rounded-xl border border-transparent p-2.5 transition-all hover:border-surface-border hover:bg-surface-elevated ${
        comingSoon ? "opacity-70 hover:opacity-100" : ""
      }`}
    >
      <div
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${tool.bgClass}`}
      >
        <Icon className={`h-4 w-4 ${tool.textClass}`} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-content-primary transition-colors group-hover:text-white">
            {displayName ?? tool.name}
          </span>
          {comingSoon && <SoonBadge />}
        </div>
        <p className="mt-0.5 truncate text-xs text-content-muted">{description}</p>
      </div>
    </Link>
  );
}

function MegaMenuBottomBar({
  onNavigate,
  onOpenFavorites,
}: {
  onNavigate?: () => void;
  onOpenFavorites?: () => void;
}) {
  const { favorites } = useFavorites();

  return (
    <div className="flex flex-col gap-3 border-t border-surface-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3.5">
      <span className="text-xs text-content-muted">
        {ALL_TOOLS.length} free tools — no signup required
      </span>
      <div className="flex flex-wrap items-center gap-4">
        {favorites.length > 0 && (
          <button
            type="button"
            role="menuitem"
            className="flex items-center gap-1 text-xs text-brand-blue transition-colors hover:underline"
            onClick={() => {
              onNavigate?.();
              onOpenFavorites?.();
            }}
          >
            <Star className="h-3 w-3 fill-brand-blue" />
            Favorites
          </button>
        )}
        <Link
          href="/tools"
          role="menuitem"
          className="flex items-center gap-1 text-xs text-brand-blue transition-colors hover:underline"
          onClick={onNavigate}
        >
          View All Tools
          <ArrowRight className="h-3 w-3" />
        </Link>
        <Link
          href="/contact"
          role="menuitem"
          className="flex items-center gap-1 text-xs text-content-secondary transition-colors hover:text-content-primary"
          onClick={onNavigate}
        >
          Suggest a Tool
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function CategoryToolsPanel({
  category,
  onNavigate,
}: {
  category: MegaMenuCategory;
  onNavigate?: () => void;
}) {
  return (
    <div
      key={category.id}
      className="grid grid-cols-1 gap-1 transition-opacity duration-150 sm:grid-cols-2"
    >
      {category.tools.map((item) => (
        <MegaMenuToolCard key={item.tool.slug} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function CategoryTabIcon({ categoryId }: { categoryId: string }) {
  const Icon =
    TOOL_CATEGORY_ICONS[categoryId as ToolPageCategoryId] ??
    TOOL_CATEGORY_ICONS.everyday;

  return <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />;
}

export function MegaMenuDesktop({
  onNavigate,
  onOpenFavorites,
}: {
  onNavigate?: () => void;
  onOpenFavorites?: () => void;
}) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    megaMenuCategories[0]?.id ?? "pdf"
  );

  const activeCategory =
    megaMenuCategories.find((category) => category.id === activeCategoryId) ??
    megaMenuCategories[0];

  return (
    <div
      role="menu"
      aria-label="Tools menu"
      className="overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-2xl shadow-black/40"
    >
      <div className="flex min-h-[320px]">
        <div
          className="max-h-[min(420px,70vh)] w-[220px] flex-shrink-0 overflow-y-auto border-r border-surface-border bg-surface-base/50 py-2"
          role="tablist"
          aria-label="Tool categories"
        >
          {megaMenuCategories.map((category) => {
            const isActive = category.id === activeCategoryId;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "border-l-2 border-brand-blue bg-surface-elevated font-medium text-content-primary"
                    : "border-l-2 border-transparent text-content-secondary hover:bg-surface-elevated/60 hover:text-content-primary"
                }`}
                onMouseEnter={() => setActiveCategoryId(category.id)}
                onFocus={() => setActiveCategoryId(category.id)}
                onClick={() => setActiveCategoryId(category.id)}
              >
                <CategoryTabIcon categoryId={category.id} />
                <span className="leading-snug">{category.title}</span>
              </button>
            );
          })}
        </div>

        <div className="min-w-0 flex-1 p-4" role="tabpanel">
          {activeCategory && (
            <CategoryToolsPanel category={activeCategory} onNavigate={onNavigate} />
          )}
        </div>
      </div>

      <MegaMenuBottomBar onNavigate={onNavigate} onOpenFavorites={onOpenFavorites} />
    </div>
  );
}

export function MegaMenuMobile({
  onNavigate,
  onOpenFavorites,
}: {
  onNavigate?: () => void;
  onOpenFavorites?: () => void;
}) {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategoryId((current) =>
      current === categoryId ? null : categoryId
    );
  };

  return (
    <div className="space-y-2">
      {megaMenuCategories.map((category) => {
        const isExpanded = expandedCategoryId === category.id;

        return (
          <div
            key={category.id}
            className="overflow-hidden rounded-xl border border-surface-border bg-surface-card"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-3.5 text-left"
              aria-expanded={isExpanded}
              onClick={() => toggleCategory(category.id)}
            >
              <span className="flex items-center gap-2.5 text-sm font-medium text-content-primary">
                <CategoryTabIcon categoryId={category.id} />
                {category.title}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-content-muted transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {isExpanded && (
              <div className="border-t border-surface-border px-2 pb-2 pt-1">
                {category.tools.map((item) => (
                  <MegaMenuToolCard key={item.tool.slug} item={item} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="rounded-xl border border-surface-border bg-surface-card">
        <MegaMenuBottomBar
          onNavigate={onNavigate}
          onOpenFavorites={onOpenFavorites}
        />
      </div>
    </div>
  );
}
