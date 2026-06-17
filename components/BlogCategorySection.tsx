"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogPostCard } from "@/components/BlogPostCard";
import { BLOG_CATEGORY_ICONS } from "@/components/BlogCategoryIcons";
import {
  BLOG_PAGE_CATEGORY_TABS,
  BLOG_PAGE_SECTION_LABELS,
  BLOG_POSTS_PAGE_SIZE,
  filterBlogPostsByPageCategory,
  getBlogCountByPageCategory,
  type BlogPageCategoryId,
} from "@/lib/blog-categories";
import type { BlogPost } from "@/app/blog/posts";

type BlogCategorySectionProps = {
  posts: BlogPost[];
};

export function BlogCategorySection({ posts }: BlogCategorySectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<BlogPageCategoryId>("all");
  const [visibleCount, setVisibleCount] = useState(BLOG_POSTS_PAGE_SIZE);
  const counts = useMemo(() => getBlogCountByPageCategory(posts), [posts]);

  const filteredPosts = useMemo(
    () => filterBlogPostsByPageCategory(posts, activeCategory),
    [posts, activeCategory],
  );

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  useEffect(() => {
    setVisibleCount(BLOG_POSTS_PAGE_SIZE);
  }, [activeCategory]);

  return (
    <section className="mt-12 border-t border-surface-border pt-10">
      <div className="mb-8 flex gap-2 overflow-x-auto whitespace-nowrap border-b border-surface-border pb-3.5">
        {BLOG_PAGE_CATEGORY_TABS.map((category) => {
          const Icon = BLOG_CATEGORY_ICONS[category.id];
          const isActive = activeCategory === category.id;
          const count = counts[category.id];

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={isActive}
              aria-label={`Filter by ${category.label}`}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-blue text-white"
                  : "text-content-secondary hover:bg-surface-elevated hover:text-content-primary"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              <span>{category.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-surface-elevated text-content-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
        {BLOG_PAGE_SECTION_LABELS[activeCategory]} ({filteredPosts.length})
      </p>

      {filteredPosts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-surface-border bg-surface-card px-6 py-10 text-center text-sm text-content-secondary">
          No guides in this category yet.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visiblePosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((count) => count + BLOG_POSTS_PAGE_SIZE)
                }
                className="cursor-pointer rounded-xl border border-surface-border bg-surface-card px-6 py-3 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
