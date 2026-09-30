import { blogPosts, PILLAR_POST_SLUGS } from "@/app/blog/posts";

export type ToolGuideLink = {
  href: string;
  title: string;
};

/** The most specific blog guide whose CTA points at this tool. */
export function getToolGuideLink(slug: string): ToolGuideLink | null {
  const toolHref = `/tools/${slug}`;
  const matches = blogPosts.filter((post) => post.cta.toolHref === toolHref);
  if (matches.length === 0) return null;

  const specific = matches.find(
    (post) =>
      !PILLAR_POST_SLUGS.has(post.slug) && post.category !== "Complete Guide",
  );
  const post = specific ?? matches[0];

  return { href: `/blog/${post.slug}`, title: post.title };
}
