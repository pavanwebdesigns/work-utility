"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ToolCard } from "@/components/ToolCard";
import {
  getHomepageIndiaTools,
  getHomepageUsaTools,
} from "@/lib/featured-tools";
import { ALL_TOOLS } from "@/lib/tools-data";
import type { ToolListingItem } from "@/lib/tool-categories";

function PopularRow({
  title,
  tools,
}: {
  title: string;
  tools: ToolListingItem[];
}) {
  if (tools.length === 0) return null;

  return (
    <div className="mb-10 last:mb-0">
      <h3 className="mb-4 text-left text-[11px] font-semibold tracking-[2px] text-content-muted">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <div key={tool.href} className="w-full min-w-0">
            <ToolCard
              title={tool.title}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              accent={tool.accent}
              popular={tool.popular}
              comingSoon={tool.comingSoon}
              homepageEffects
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomePageTools() {
  const indiaTools = useMemo(() => getHomepageIndiaTools(), []);
  const usaTools = useMemo(() => getHomepageUsaTools(), []);

  return (
    <section className="bg-surface-base px-8 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-content-primary sm:text-2xl">
            Popular Tools
          </h2>
          <Link
            href="/tools"
            className="shrink-0 cursor-pointer text-sm text-content-secondary transition-colors hover:text-brand-blue hover:underline"
          >
            View All →
          </Link>
        </div>

        <PopularRow title="SALARY & TAX — INDIA" tools={indiaTools} />
        <PopularRow title="PAYCHECK & TAX — USA" tools={usaTools} />

        <div className="mt-10 text-center">
          <Link
            href="/tools"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-6 py-3 text-sm font-semibold text-content-primary transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            View All {ALL_TOOLS.length} Tools →
          </Link>
        </div>
      </div>
    </section>
  );
}
