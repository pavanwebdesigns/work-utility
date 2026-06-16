import {
  ALL_TOOLS,
  COMING_SOON_TOOL_SLUGS,
  TOOL_ICONS,
  TOOL_UI_META,
} from "@/lib/tools-data";
import {
  getMenuCategoryForSlug,
  MENU_CATEGORY_META,
  MENU_CATEGORY_ORDER,
  type MenuCategoryId,
} from "@/lib/menu-categories";
import type { ToolAccent } from "@/components/ToolCard";
import type { LucideIcon } from "lucide-react";
import { Wrench } from "lucide-react";

export type ToolPageCategoryId = "all" | MenuCategoryId;

export const TOOL_PAGE_CATEGORY_TABS: {
  id: ToolPageCategoryId;
  label: string;
}[] = [
  { id: "all", label: "All Tools" },
  ...MENU_CATEGORY_ORDER.map((id) => ({
    id,
    label: MENU_CATEGORY_META[id].title,
  })),
];

export function getToolPageCategoryId(
  slug: string,
): MenuCategoryId | undefined {
  return getMenuCategoryForSlug(slug);
}

export function getToolPageCategoryLabel(slug: string): string {
  const categoryId = getToolPageCategoryId(slug);
  if (!categoryId) return "";
  return MENU_CATEGORY_META[categoryId].title;
}

export function isComingSoonTool(slug: string): boolean {
  return COMING_SOON_TOOL_SLUGS.has(slug);
}

export type ToolListingItem = {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: ToolAccent;
  popular?: boolean;
  comingSoon: boolean;
  pageCategory: MenuCategoryId | undefined;
};

const DEFAULT_UI_META = {
  accent: "blue" as const,
  filterCategory: "convert" as const,
};

export function buildToolListing(): ToolListingItem[] {
  return ALL_TOOLS.map((tool) => {
    const meta = TOOL_UI_META[tool.slug] ?? DEFAULT_UI_META;
    const icon = TOOL_ICONS[tool.icon] ?? Wrench;

    return {
      slug: tool.slug,
      title: tool.name,
      description: tool.description,
      href: tool.href,
      icon,
      accent: meta.accent,
      popular: meta.popular,
      comingSoon: isComingSoonTool(tool.slug),
      pageCategory: getMenuCategoryForSlug(tool.slug),
    };
  });
}

export function getToolCountByCategory(): Record<ToolPageCategoryId, number> {
  const listing = buildToolListing();
  const counts: Record<string, number> = { all: listing.length };

  for (const id of MENU_CATEGORY_ORDER) {
    counts[id] = listing.filter((t) => t.pageCategory === id).length;
  }

  return counts as Record<ToolPageCategoryId, number>;
}

export function searchTools(query: string): ToolListingItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return buildToolListing().filter((tool) => {
    const categoryLabel = getToolPageCategoryLabel(tool.slug);
    const allTool = ALL_TOOLS.find((item) => item.slug === tool.slug);

    return (
      tool.title.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery) ||
      categoryLabel.toLowerCase().includes(normalizedQuery) ||
      (allTool?.category.toLowerCase().includes(normalizedQuery) ?? false)
    );
  });
}

export const TOOL_PAGE_SECTION_LABELS: Record<ToolPageCategoryId, string> = {
  all: "ALL TOOLS",
  ...Object.fromEntries(
    MENU_CATEGORY_ORDER.map((id) => [
      id,
      MENU_CATEGORY_META[id].title.toUpperCase(),
    ]),
  ),
} as Record<ToolPageCategoryId, string>;
