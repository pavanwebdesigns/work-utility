import { blogPosts, PILLAR_POST_SLUGS } from "@/app/blog/posts";
import { CORE_POSTS } from "@/lib/index-policy";

export type ToolGuideLink = {
  href: string;
  title: string;
};

/** The most specific blog guide whose CTA points at this tool. Prefers core posts. */
export function getToolGuideLink(slug: string): ToolGuideLink | null {
  const toolHref = `/tools/${slug}`;
  const matches = blogPosts.filter((post) => post.cta.toolHref === toolHref);
  if (matches.length === 0) return null;

  const preferCore = matches.filter((post) => CORE_POSTS.has(post.slug));
  const pool = preferCore.length > 0 ? preferCore : matches;

  const specific = pool.find(
    (post) =>
      !PILLAR_POST_SLUGS.has(post.slug) && post.category !== "Complete Guide",
  );
  const post = specific ?? pool[0];

  return { href: `/blog/${post.slug}`, title: post.title };
}
