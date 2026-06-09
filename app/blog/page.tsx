import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogPosts, getCategoryBadgeClass } from "./posts";

export default function BlogIndexPage() {
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

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-surface-border bg-surface-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue"
              >
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeClass(post.category)}`}
                >
                  {post.category}
                </span>
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
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
