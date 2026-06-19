"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { getFeaturedTools } from "@/lib/featured-tools";
import { searchTools } from "@/lib/tool-categories";
import { ALL_TOOLS } from "@/lib/tools-data";

export function HomePageTools() {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredTools = useMemo(() => getFeaturedTools(), []);

  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return searchTools(searchQuery.trim());
  }, [isSearching, searchQuery]);

  return (
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
          <>
            <h2 className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
              Popular Tools
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTools.map((tool) => (
                <div key={tool.href} className="w-full min-w-0">
                  <ToolCard
                    title={tool.title}
                    description={tool.description}
                    href={tool.href}
                    icon={tool.icon}
                    accent={tool.accent}
                    popular={tool.popular}
                    comingSoon={tool.comingSoon}
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/tools"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-6 py-3 text-sm font-semibold text-content-primary transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                View All {ALL_TOOLS.length} Tools →
              </Link>
            </div>
          </>
        )}

        {isSearching && (
          <>
            <h2 className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
              {searchResults.length > 0
                ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"} for '${searchQuery.trim()}'`
                : `No tools found for '${searchQuery.trim()}'`}
            </h2>

            {searchResults.length === 0 ? (
              <div className="rounded-xl border border-surface-border bg-surface-card px-6 py-12 text-center">
                <p className="text-content-primary">
                  No tools found for &apos;{searchQuery.trim()}&apos;
                </p>
                <p className="mt-2 text-sm text-content-secondary">
                  Try searching for PDF, image, or calculator
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((tool) => (
                  <div key={tool.href} className="w-full min-w-0">
                    <ToolCard
                      title={tool.title}
                      description={tool.description}
                      href={tool.href}
                      icon={tool.icon}
                      accent={tool.accent}
                      popular={tool.popular}
                      comingSoon={tool.comingSoon}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
