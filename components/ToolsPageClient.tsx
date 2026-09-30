"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolsCategorySection } from "@/components/ToolsCategorySection";
import { ALL_TOOLS } from "@/lib/tools-data";
import {
  TOOL_PAGE_CATEGORY_TABS,
  getToolCountByCategory,
  type ToolPageCategoryId,
} from "@/lib/tool-categories";

export function ToolsPageClient({ children }: { children: React.ReactNode }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<ToolPageCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState<number | null>(null);
  const counts = useMemo(() => getToolCountByCategory(), []);

  useEffect(() => {
    const categoryParam = new URLSearchParams(window.location.search).get(
      "category",
    );
    if (
      categoryParam &&
      TOOL_PAGE_CATEGORY_TABS.some((tab) => tab.id === categoryParam)
    ) {
      setActiveCategory(categoryParam as ToolPageCategoryId);
    }
  }, []);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const query = searchQuery.trim().toLowerCase();
    let shown = 0;

    root.querySelectorAll<HTMLElement>("[data-tool-section]").forEach((section) => {
      let sectionShown = 0;
      section.querySelectorAll<HTMLElement>("[data-tool-card]").forEach((card) => {
        const category = card.dataset.category ?? "";
        const text = card.dataset.search ?? "";
        const categoryOk =
          query.length > 0 ||
          activeCategory === "all" ||
          category === activeCategory;
        const queryOk = query.length === 0 || text.includes(query);
        const show = categoryOk && queryOk;
        card.hidden = !show;
        if (show) sectionShown += 1;
      });
      section.hidden = sectionShown === 0;
      shown += sectionShown;
    });

    setVisibleCount(shown);
  }, [activeCategory, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />

      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <section className="border-b border-surface-border bg-surface-base px-4 py-10 text-center sm:px-10 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              All Free Online Tools
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-content-secondary">
              {ALL_TOOLS.length} browser-based tools — no signup, no uploads. Pick a
              category or browse everything below.
            </p>
          </div>
        </section>

        <section className="bg-surface-base px-4 py-12 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <ToolsCategorySection
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              counts={counts}
            />

            {isSearching && visibleCount !== null && (
              <h2 className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
                {visibleCount > 0
                  ? `${visibleCount} result${visibleCount === 1 ? "" : "s"} for '${searchQuery.trim()}'`
                  : `No tools found for '${searchQuery.trim()}'`}
              </h2>
            )}

            {isSearching && visibleCount === 0 ? (
              <div className="rounded-xl border border-surface-border bg-surface-card px-6 py-12 text-center">
                <p className="text-content-primary">
                  No tools found for &apos;{searchQuery.trim()}&apos;
                </p>
                <p className="mt-2 text-sm text-content-secondary">
                  Try searching for PDF, image, or calculator
                </p>
              </div>
            ) : null}

            <div ref={listRef}>{children}</div>
          </div>
        </section>

        <section className="border-t border-surface-border bg-surface-card py-8 text-center">
          <p className="text-content-secondary">Can&apos;t find the tool you need?</p>
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
