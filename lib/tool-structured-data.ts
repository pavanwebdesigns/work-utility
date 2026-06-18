import { ALL_TOOLS } from "@/lib/tools-data";
import {
  getMenuCategoryForSlug,
  MENU_CATEGORY_META,
  type MenuCategoryId,
} from "@/lib/menu-categories";
import { getToolPageDescription } from "@/lib/tool-page-metadata";

const SCHEMA_APPLICATION_CATEGORY: Record<MenuCategoryId, string> = {
  pdf: "UtilitiesApplication",
  image: "UtilitiesApplication",
  document: "UtilitiesApplication",
  finance: "FinanceApplication",
  student: "EducationApplication",
  developer: "DeveloperApplication",
  text: "UtilitiesApplication",
  productivity: "UtilitiesApplication",
  everyday: "UtilitiesApplication",
};

export type SoftwareApplicationJsonLd = {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
  description: string;
};

export function getSoftwareApplicationJsonLd(
  slug: string,
): SoftwareApplicationJsonLd | null {
  const tool = ALL_TOOLS.find((entry) => entry.slug === slug);
  const description = getToolPageDescription(slug);
  const menuCategory = getMenuCategoryForSlug(slug);

  if (!tool || !description || !menuCategory) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: SCHEMA_APPLICATION_CATEGORY[menuCategory],
    operatingSystem: "Any (runs in browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
  };
}

export function getSameCategoryRelatedTools(
  currentSlug: string,
  limit = 4,
): (typeof ALL_TOOLS)[number][] {
  const category = getMenuCategoryForSlug(currentSlug);
  if (!category) return [];

  const categoryTools = ALL_TOOLS.filter(
    (tool) => getMenuCategoryForSlug(tool.slug) === category,
  );

  const currentIndex = categoryTools.findIndex(
    (tool) => tool.slug === currentSlug,
  );
  if (currentIndex === -1 || categoryTools.length <= 1) {
    return [];
  }

  const related: (typeof ALL_TOOLS)[number][] = [];
  for (
    let offset = 1;
    offset < categoryTools.length && related.length < limit;
    offset++
  ) {
    related.push(categoryTools[(currentIndex + offset) % categoryTools.length]);
  }

  return related;
}

export function getRelatedToolsCategoryLabel(slug: string): string | null {
  const category = getMenuCategoryForSlug(slug);
  if (!category) return null;
  return MENU_CATEGORY_META[category].title;
}
