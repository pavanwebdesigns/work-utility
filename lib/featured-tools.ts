import { buildToolListing, type ToolListingItem } from "@/lib/tool-categories";

/** Curated homepage showcase — cross-category selection, easy to update without touching layout. */
export const FEATURED_TOOL_SLUGS = [
  "pdf-compress",
  "pdf-merge",
  "image-compress",
  "bg-remove",
  "emi-calculator",
  "paycheck-calculator",
  "mortgage-calculator",
  "json-formatter",
  "uuid-generator",
  "age-calculator",
  "text-to-speech",
  "pomodoro-timer",
] as const;

export type FeaturedToolSlug = (typeof FEATURED_TOOL_SLUGS)[number];

export function getFeaturedTools(): ToolListingItem[] {
  const bySlug = new Map(
    buildToolListing().map((tool) => [tool.slug, tool] as const),
  );

  return FEATURED_TOOL_SLUGS.flatMap((slug) => {
    const tool = bySlug.get(slug);
    return tool ? [tool] : [];
  });
}
