"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import {
  blogPosts,
  getCategoryBadgeClass,
} from "@/app/blog/posts";
import {
  ALL_TOOLS,
  TOOL_ICONS,
  TOOL_UI_META,
} from "@/lib/tools-data";

type Category = "all" | "pdf" | "images" | "convert";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Tools" },
  { id: "pdf", label: "PDF" },
  { id: "images", label: "Images" },
  { id: "convert", label: "Convert" },
];

const tools = ALL_TOOLS.map((tool) => {
  const meta = TOOL_UI_META[tool.slug];

  return {
    title: tool.name,
    description: tool.description,
    href: tool.href,
    icon: TOOL_ICONS[tool.icon],
    accent: meta.accent,
    popular: meta.popular,
    category: meta.filterCategory as Category,
    searchCategory: tool.category,
  };
});

const sectionLabels: Record<Category, string> = {
  all: "ALL TOOLS",
  pdf: "PDF TOOLS",
  images: "IMAGE TOOLS",
  convert: "CONVERT TOOLS",
};

function TrustBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-1.5 text-xs text-content-secondary">
      <span className="text-[8px] text-emerald-400">●</span>
      {children}
    </span>
  );
}

function StatsBar() {
  const stats = [
    { value: `${ALL_TOOLS.length} Tools`, label: "Available now" },
    { value: "0ms Upload", label: "Browser-only processing" },
    { value: "Free Forever", label: "No hidden fees" },
  ];

  return (
    <section className="border-y border-surface-border bg-surface-card">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-surface-border">
        {stats.map((stat) => (
          <div key={stat.value} className="px-2 py-7 text-center sm:py-7">
            <p className="text-xl font-extrabold text-content-primary sm:text-[28px]">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-content-muted sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.trim().length > 0;
  const query = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!isSearching) return [];

    return ALL_TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
    ).map((tool) => {
      const meta = TOOL_UI_META[tool.slug];
      return {
        title: tool.name,
        description: tool.description,
        href: tool.href,
        icon: TOOL_ICONS[tool.icon],
        accent: meta.accent,
        popular: meta.popular,
        category: meta.filterCategory as Category,
      };
    });
  }, [isSearching, query]);

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  const displayTools = isSearching ? searchResults : filteredTools;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />

      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <section className="bg-surface-base px-4 pb-[60px] pt-20 text-center sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-balance text-3xl md:text-5xl">
              Free tools that
              <br />
              <span className="text-brand-blue">just work.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-content-secondary sm:text-lg">
              No signup. No uploads. Everything runs in your browser.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <TrustBadge>🔒 100% Private</TrustBadge>
              <TrustBadge>⚡ Browser-only</TrustBadge>
              <TrustBadge>✅ Always Free</TrustBadge>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="mr-1 text-xs text-content-muted">Popular:</span>
              {[
                { label: "Compress PDF", href: "/tools/pdf-compress" },
                { label: "Aadhaar Photo Resize", href: "/tools/photo-resizer" },
                { label: "Image Compress", href: "/tools/image-compress" },
                { label: "PDF to Word", href: "/tools/pdf-to-word" },
                { label: "Word to PDF", href: "/tools/word-to-pdf" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="cursor-pointer rounded-full border border-surface-border bg-surface-card px-3 py-1.5 text-xs text-content-secondary transition-all hover:border-brand-blue hover:text-brand-blue"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-3xl hero-gradient-line" />
        </section>

        <section className="bg-surface-base px-8 py-12 md:px-12 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-8 flex max-w-2xl items-center gap-3 rounded-xl border border-surface-border bg-surface-card px-4 py-3">
              <Search
                className="h-[18px] w-[18px] shrink-0 text-content-muted"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                aria-label="Search tools"
                className="flex-1 bg-transparent text-sm text-content-primary outline-none placeholder:text-content-muted"
              />
              {isSearching && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="cursor-pointer text-content-muted transition-colors hover:text-content-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {!isSearching && (
              <div className="mb-8 flex gap-2 overflow-x-auto whitespace-nowrap border-b border-surface-border pb-3.5">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    aria-pressed={activeCategory === category.id}
                    aria-label={`Filter by ${category.label}`}
                    className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-brand-blue text-white"
                        : "text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}

            <p className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
              {isSearching
                ? searchResults.length > 0
                  ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for '${searchQuery.trim()}'`
                  : `No tools found for '${searchQuery.trim()}'`
                : sectionLabels[activeCategory]}
            </p>

            {displayTools.length === 0 && isSearching ? (
              <div className="rounded-xl border border-surface-border bg-surface-card px-6 py-12 text-center">
                <p className="text-content-primary">
                  No tools found for &apos;{searchQuery.trim()}&apos;
                </p>
                <p className="mt-2 text-sm text-content-secondary">
                  Try searching for PDF, image, or convert
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayTools.map((tool) => (
                  <div key={tool.href} className="w-full min-w-0">
                    <ToolCard {...tool} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <StatsBar />

        <section className="border-t border-surface-border bg-surface-base px-4 py-12 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-content-primary sm:text-2xl">
                From the Blog
              </h2>
              <Link
                href="/blog"
                className="cursor-pointer text-sm text-brand-blue transition-colors hover:underline"
              >
                View all guides →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block cursor-pointer rounded-xl border border-surface-border bg-surface-card p-5 transition-colors hover:border-brand-blue"
                >
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryBadgeClass(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-semibold text-content-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-content-muted">
                    {post.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-surface-border bg-surface-card py-8 text-center">
          <p className="text-content-secondary">
            Can&apos;t find the tool you need?
          </p>
          <p className="mt-2 text-content-secondary">
            <Link
              href="/contact"
              className="cursor-pointer text-brand-blue transition-colors hover:underline"
            >
              Tell us what to build next →
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
