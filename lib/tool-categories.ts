import {
  ALL_TOOLS,
  COMING_SOON_TOOL_SLUGS,
  MEGA_MENU_CATEGORIES,
  TOOL_ICONS,
  TOOL_UI_META,
} from "@/lib/tools-data";
import type { ToolAccent } from "@/components/ToolCard";
import type { LucideIcon } from "lucide-react";

export type ToolPageCategoryId =
  | "all"
  | "pdf"
  | "image"
  | "document"
  | "finance"
  | "student"
  | "utility";

export const TOOL_PAGE_CATEGORY_TABS: {
  id: ToolPageCategoryId;
  label: string;
}[] = [
  { id: "all", label: "All Tools" },
  { id: "pdf", label: "PDF Tools" },
  { id: "image", label: "Image Tools" },
  { id: "document", label: "Document Tools" },
  { id: "finance", label: "Finance Calculators" },
  { id: "student", label: "Student Tools" },
  { id: "utility", label: "Utility Tools" },
];

const SLUG_TO_PAGE_CATEGORY = MEGA_MENU_CATEGORIES.reduce<
  Record<string, Exclude<ToolPageCategoryId, "all">>
>((acc, category) => {
  for (const item of category.items) {
    acc[item.slug] = category.id as Exclude<ToolPageCategoryId, "all">;
  }
  return acc;
}, {});

export function getToolPageCategoryId(
  slug: string
): Exclude<ToolPageCategoryId, "all"> | undefined {
  return SLUG_TO_PAGE_CATEGORY[slug];
}

export function getToolPageCategoryLabel(slug: string): string {
  const categoryId = getToolPageCategoryId(slug);
  if (!categoryId) return "";

  return (
    TOOL_PAGE_CATEGORY_TABS.find((tab) => tab.id === categoryId)?.label ?? ""
  );
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
  pageCategory: Exclude<ToolPageCategoryId, "all"> | undefined;
};

export function buildToolListing(): ToolListingItem[] {
  return ALL_TOOLS.map((tool) => {
    const meta = TOOL_UI_META[tool.slug];

    return {
      slug: tool.slug,
      title: tool.name,
      description: tool.description,
      href: tool.href,
      icon: TOOL_ICONS[tool.icon],
      accent: meta.accent,
      popular: meta.popular,
      comingSoon: isComingSoonTool(tool.slug),
      pageCategory: getToolPageCategoryId(tool.slug),
    };
  });
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
  pdf: "PDF TOOLS",
  image: "IMAGE TOOLS",
  document: "DOCUMENT TOOLS",
  finance: "FINANCE CALCULATORS",
  student: "STUDENT TOOLS",
  utility: "UTILITY TOOLS",
};
