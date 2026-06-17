"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPillarSection } from "@/components/BlogPillarSection";
import { BlogCategorySection } from "@/components/BlogCategorySection";
import type { BlogPost } from "./posts";

type BlogPageClientProps = {
  posts: BlogPost[];
  pillarPosts: BlogPost[];
};

export function BlogPageClient({ posts, pillarPosts }: BlogPageClientProps) {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← Home
          </Link>
          <h1 className="mt-8 text-2xl font-bold text-content-primary sm:text-3xl">
            Guides & Tips
          </h1>
          <p className="mt-3 text-content-secondary">
            Practical guides for everyday document and image tasks — written for
            Indian users.
          </p>

          <BlogPillarSection posts={pillarPosts} />
          <BlogCategorySection posts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
