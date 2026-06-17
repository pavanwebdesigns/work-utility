import { BlogPostCard } from "@/components/BlogPostCard";
import type { BlogPost } from "@/app/blog/posts";

type BlogPillarSectionProps = {
  posts: BlogPost[];
};

export function BlogPillarSection({ posts }: BlogPillarSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <div className="mb-6">
        <p className="text-[11px] font-semibold tracking-[2px] text-content-muted">
          COMPLETE GUIDES
        </p>
        <h2 className="mt-2 text-xl font-bold text-content-primary sm:text-2xl">
          Pillar Guides
        </h2>
        <p className="mt-2 text-sm text-content-secondary">
          In-depth guides covering entire tool categories — start here for the
          full picture.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
