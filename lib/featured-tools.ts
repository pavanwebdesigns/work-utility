import { buildToolListing, type ToolListingItem } from "@/lib/tool-categories";

/** Homepage Popular — India row (core tools only). */
export const HOMEPAGE_INDIA_TOOL_SLUGS = [
  "photo-resizer",
  "ctc-calculator",
  "cgpa-to-percentage",
  "emi-calculator",
] as const;

/** Homepage Popular — USA row (core tools only). */
export const HOMEPAGE_USA_TOOL_SLUGS = [
  "paycheck-calculator",
  "mortgage-calculator",
  "401k-calculator",
  "w2-vs-1099-calculator",
] as const;

/** @deprecated Use HOMEPAGE_INDIA_TOOL_SLUGS / HOMEPAGE_USA_TOOL_SLUGS. */
export const FEATURED_TOOL_SLUGS = [
  ...HOMEPAGE_INDIA_TOOL_SLUGS,
  ...HOMEPAGE_USA_TOOL_SLUGS,
] as const;

export type FeaturedToolSlug = (typeof FEATURED_TOOL_SLUGS)[number];

function toolsForSlugs(slugs: readonly string[]): ToolListingItem[] {
  const bySlug = new Map(
    buildToolListing().map((tool) => [tool.slug, tool] as const),
  );

  return slugs.flatMap((slug) => {
    const tool = bySlug.get(slug);
    return tool ? [tool] : [];
  });
}

export function getHomepageIndiaTools(): ToolListingItem[] {
  return toolsForSlugs(HOMEPAGE_INDIA_TOOL_SLUGS);
}

export function getHomepageUsaTools(): ToolListingItem[] {
  return toolsForSlugs(HOMEPAGE_USA_TOOL_SLUGS);
}

export function getFeaturedTools(): ToolListingItem[] {
  return [...getHomepageIndiaTools(), ...getHomepageUsaTools()];
}
