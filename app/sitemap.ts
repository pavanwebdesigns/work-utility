import type { MetadataRoute } from "next";
import { blogPosts } from "./blog/posts";
import { getLastModified, getPostDates } from "@/lib/content-dates";
import { permanentRedirectPaths } from "@/lib/seo-redirects";
import { ALL_TOOLS } from "@/lib/tools-data";
import { PHOTO_SIZE_GUIDE_ROUTES } from "@/lib/photo-size-guides";

const baseUrl = "https://workutilities.com";

function isIndexable(entry: object): boolean {
  return !("indexable" in entry) || (entry as { indexable?: boolean }).indexable !== false;
}

export function getSiteMapEntries(): MetadataRoute.Sitemap {
  const redirected = permanentRedirectPaths();
  const include = (pathname: string) => !redirected.has(pathname);

  const staticPages: MetadataRoute.Sitemap = [
    ["/", "weekly", 1.0],
    ["/tools", "weekly", 0.9],
    ["/about", "monthly", 0.5],
    ["/privacy", "yearly", 0.4],
    ["/terms", "yearly", 0.4],
    ["/contact", "monthly", 0.5],
    ["/blog", "weekly", 0.8],
  ]
    .filter(([pathname]) => include(pathname as string))
    .map(([pathname, changeFrequency, priority]) => ({
      url: `${baseUrl}${pathname === "/" ? "" : pathname}`,
      lastModified: getLastModified(pathname as string),
      changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: priority as number,
    }));

  const seoLandingPages: MetadataRoute.Sitemap = Object.values(PHOTO_SIZE_GUIDE_ROUTES)
    .filter((guide) => include(guide.path))
    .map((guide) => ({
      url: `${baseUrl}${guide.path}`,
      lastModified: getLastModified(guide.path),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const toolPages: MetadataRoute.Sitemap = ALL_TOOLS.filter(isIndexable)
    .filter((tool) => include(tool.href))
    .map((tool) => ({
      url: `${baseUrl}${tool.href}`,
      lastModified: getLastModified(tool.href),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter(isIndexable)
    .filter((post) => include(`/blog/${post.slug}`))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(getPostDates(post.slug).updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...seoLandingPages, ...toolPages, ...blogPages];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getSiteMapEntries();
}
