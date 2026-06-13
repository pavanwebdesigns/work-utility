import type { MetadataRoute } from "next";
import { blogPosts } from "./blog/posts";
import { ALL_TOOLS } from "@/lib/tools-data";
import { PHOTO_SIZE_GUIDE_ROUTES } from "@/lib/photo-size-guides";

const BASE_URL = "https://workutilities.com";

const STATIC_PAGES = [
  "/",
  "/tools",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

function sitemapEntry(
  path: string,
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: path === "/" ? BASE_URL : `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  };
}

export function getSiteMapEntries(): MetadataRoute.Sitemap {
  const seoLandingPages = Object.values(PHOTO_SIZE_GUIDE_ROUTES).map(
    (guide) => guide.path
  );

  return [
    ...STATIC_PAGES.map((path) =>
      sitemapEntry(path, path === "/" ? 1 : 0.7)
    ),
    ...seoLandingPages.map((path) => sitemapEntry(path, 0.7)),
    ...ALL_TOOLS.map((tool) => sitemapEntry(tool.href, 0.9)),
    ...blogPosts.map((post) => sitemapEntry(`/blog/${post.slug}`, 0.8)),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getSiteMapEntries();
}
