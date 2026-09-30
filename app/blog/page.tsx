import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";
import {
  getBlogPostsForPageListing,
  getPillarBlogPosts,
} from "@/lib/blog-categories";
import { BlogPageClient } from "./BlogPageClient";

const BLOG_TITLE = "Blog — WorkUtilities | Guides & Tips";
const BLOG_DESCRIPTION =
  "Free guides on PDF compression, image resizing, photo size requirements for Indian documents, and more.";

export const metadata: Metadata = {
  title: { absolute: BLOG_TITLE },
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: "https://workutilities.com/blog",
  },
  openGraph: buildOpenGraph({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: "https://workutilities.com/blog",
    type: "website",
  }),
};

export default function BlogIndexPage() {
  const posts = getBlogPostsForPageListing();
  const pillarPosts = getPillarBlogPosts();

  return <BlogPageClient posts={posts} pillarPosts={pillarPosts} />;
}
