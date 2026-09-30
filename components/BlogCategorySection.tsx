"use client";

import { useMemo, useState } from "react";
import { BlogPostCard } from "@/components/BlogPostCard";
import { BLOG_CATEGORY_ICONS } from "@/components/BlogCategoryIcons";
import {
  BLOG_PAGE_CATEGORY_TABS,
  BLOG_PAGE_SECTION_LABELS,
  BLOG_POSTS_PAGE_SIZE,
  filterBlogPostsByPageCategory,
  getBlogCountByPageCategory,
  getBlogPageCategory,
  type BlogPageCategoryId,
} from "@/lib/blog-categories";
import type { BlogPost } from "@/app/blog/posts";

type BlogCategorySectionProps = {
  posts: BlogPost[];
};

function groupPosts(posts: BlogPost[]) {
  const groups = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const category = getBlogPageCategory(post) ?? "other";
    const list = groups.get(category) ?? [];
    list.push(post);
    groups.set(category, list);
  }

  const tabOrder: string[] = BLOG_PAGE_CATEGORY_TABS.map((tab) => tab.id).filter(
    (id) => id !== "all",
  );
  const ordered = [
    ...tabOrder.filter((id) => groups.has(id)),
    ...Array.from(groups.keys()).filter((id) => !tabOrder.includes(id as BlogPageCategoryId)),
  ];

  return ordered.map((id) => ({
    id,
    label:
      id === "other"
        ? "OTHER"
        : BLOG_PAGE_SECTION_LABELS[id as BlogPageCategoryId],
    posts: groups.get(id) ?? [],
  }));
}

function PostGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

/** Every post link is in the HTML. Extras are hidden with CSS until "Load more". */
function BlogPostList({ posts }: { posts: BlogPost[] }) {
  const groups = groupPosts(posts);
  const flat = groups.flatMap((group) => group.posts);
  const visibleSlugs = new Set(flat.slice(0, BLOG_POSTS_PAGE_SIZE).map((post) => post.slug));
  const hasMore = flat.length > BLOG_POSTS_PAGE_SIZE;

  const renderGroup = (postsInGroup: BlogPost[], hidden: boolean) => {
    const matching = postsInGroup.filter((post) =>
      hidden ? !visibleSlugs.has(post.slug) : visibleSlugs.has(post.slug),
    );
    return <PostGrid posts={matching} />;
  };

  return (
    <>
      <div className="space-y-10">
        {groups.map((group) => {
          const shown = group.posts.filter((post) => visibleSlugs.has(post.slug));
          if (shown.length === 0) return null;
          return (
            <section key={group.id}>
              <h2 className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
                {group.label}
              </h2>
              {renderGroup(group.posts, false)}
            </section>
          );
        })}
      </div>

      {hasMore && (
        <>
          <input id="blog-load-more" type="checkbox" className="peer sr-only" />
          <div className="mt-10 hidden space-y-10 peer-checked:block">
            {groups.map((group) => {
              const extra = group.posts.filter((post) => !visibleSlugs.has(post.slug));
              if (extra.length === 0) return null;
              return (
                <section key={`${group.id}-more`}>
                  <h2 className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
                    {group.label}
                  </h2>
                  <PostGrid posts={extra} />
                </section>
              );
            })}
          </div>
          <div className="mt-8 text-center peer-checked:hidden">
            <label
              htmlFor="blog-load-more"
              className="inline-block cursor-pointer rounded-xl border border-surface-border bg-surface-card px-6 py-3 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              Load More
            </label>
          </div>
        </>
      )}
    </>
  );
}

export function BlogCategorySection({ posts }: BlogCategorySectionProps) {
  const [activeCategory, setActiveCategory] = useState<BlogPageCategoryId>("all");
  const counts = useMemo(() => getBlogCountByPageCategory(posts), [posts]);

  const filteredPosts = useMemo(
    () => filterBlogPostsByPageCategory(posts, activeCategory),
    [posts, activeCategory],
  );

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
        <BlogPostList key={activeCategory} posts={filteredPosts} />
      )}
    </section>
  );
}
