import {
  getBlogPostsForPageListing,
  getPillarBlogPosts,
} from "@/lib/blog-categories";
import { BlogPageClient } from "./BlogPageClient";

export default function BlogIndexPage() {
  const posts = getBlogPostsForPageListing();
  const pillarPosts = getPillarBlogPosts();

  return <BlogPageClient posts={posts} pillarPosts={pillarPosts} />;
}
