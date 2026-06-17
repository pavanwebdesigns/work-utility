import Link from "next/link";
import { getCategoryBadgeClass, type BlogPost } from "@/app/blog/posts";

type BlogPostCardProps = {
  post: BlogPost;
  showFeaturedBadge?: boolean;
};

export function BlogPostCard({
  post,
  showFeaturedBadge = true,
}: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block rounded-2xl border bg-surface-card p-6 transition-all duration-200 hover:-translate-y-0.5 ${
        post.featured
          ? "border-brand-blue/40 hover:border-brand-blue"
          : "border-surface-border hover:border-brand-blue"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeClass(post.category)}`}
        >
          {post.category}
        </span>
        {showFeaturedBadge && post.featured && (
          <span className="inline-block rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-medium text-brand-blue">
            Featured
          </span>
        )}
      </div>
      <h2 className="mt-3 text-lg font-semibold text-content-primary">
        {post.title}
      </h2>
      <p className="mt-2 line-clamp-2 text-sm text-content-secondary">
        {post.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-content-muted">{post.readTime}</span>
        <span className="text-brand-blue group-hover:underline">
          Read Guide →
        </span>
      </div>
    </Link>
  );
}
