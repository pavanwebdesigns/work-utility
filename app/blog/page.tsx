import type { Metadata } from "next";
import {
  getBlogPostsForPageListing,
  getPillarBlogPosts,
} from "@/lib/blog-categories";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://workutilities.com/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getBlogPostsForPageListing();
  const pillarPosts = getPillarBlogPosts();

  return <BlogPageClient posts={posts} pillarPosts={pillarPosts} />;
}
