"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Globe, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import { ToggleButtonGroup } from "@/components/calculator/CalculatorUi";
import {
  HTTP_STATUS_CODES,
  STATUS_CATEGORY_COLORS,
  STATUS_CATEGORY_LABELS,
  filterStatusCodes,
  type StatusCategory,
} from "@/lib/http-status-codes";

type CategoryFilter = StatusCategory | "all";

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "1xx", label: "1xx Info" },
  { value: "2xx", label: "2xx Success" },
  { value: "3xx", label: "3xx Redirect" },
  { value: "4xx", label: "4xx Client" },
  { value: "5xx", label: "5xx Server" },
];

export default function HttpStatusCodesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filtered = useMemo(
    () => filterStatusCodes(HTTP_STATUS_CODES, query, category),
    [category, query],
  );

  const showAuthCallout =
    query.toLowerCase().includes("auth") ||
    (category === "4xx" && filtered.some((c) => c.code === 401));

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-image/10">
              <Globe className="h-6 w-6 text-tool-image" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              HTTP Status Codes Reference
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Searchable quick-reference for HTTP 1xx–5xx codes with practical
              context, common causes, and what to do.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="http-status-codes" />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by code, name, or keyword (e.g. auth, redirect)…"
                className="w-full rounded-xl border border-surface-border bg-surface-card py-2.5 pl-10 pr-4 text-sm text-content-primary placeholder:text-content-muted focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                aria-label="Search status codes"
              />
            </div>

            <ToggleButtonGroup
              value={category}
              onChange={setCategory}
              ariaLabel="Filter by category"
              options={CATEGORY_OPTIONS}
            />
          </div>

          {showAuthCallout && (
            <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
              💡 <strong>401 vs 403:</strong> 401 = Not authenticated (no token).
              403 = Authenticated but not authorized (wrong permissions). Common
              confusion!
            </div>
          )}

          <div className="mx-auto mt-8 max-w-2xl space-y-4">
            {filtered.length === 0 && (
              <p className="text-center text-sm text-content-muted">
                No status codes match your search.
              </p>
            )}
            {filtered.map((code) => (
              <article
                key={code.code}
                className={`rounded-xl border p-5 ${STATUS_CATEGORY_COLORS[code.category]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-3xl font-bold">{code.code}</p>
                    <p className="mt-1 text-lg font-semibold">{code.name}</p>
                    <p className="text-xs font-medium uppercase tracking-wide opacity-70">
                      {STATUS_CATEGORY_LABELS[code.category]}
                    </p>
                  </div>
                  <CopyValueButton value={String(code.code)} label="Copy" />
                </div>

                <p className="mt-3 text-sm">{code.description}</p>

                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="font-semibold">When you&apos;ll see this</p>
                    <p className="mt-1 text-content-secondary">
                      {code.whenYoullSeeThis}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Common causes</p>
                    <ul className="mt-1 list-inside list-disc text-content-secondary">
                      {code.commonCauses.map((cause) => (
                        <li key={cause}>{cause}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">What to do</p>
                    <p className="mt-1 text-content-secondary">{code.whatToDo}</p>
                  </div>
                  {code.codeExample && (
                    <pre className="overflow-x-auto rounded-lg bg-surface-elevated/80 p-3 text-xs">
                      <code>{code.codeExample}</code>
                    </pre>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Globe, title: "30+ codes", desc: "1xx through 5xx covered" },
              { icon: Search, title: "Searchable", desc: "Filter by code or keyword" },
              { icon: Copy, title: "Copy ready", desc: "Code snippets included" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-tool-image" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="http-status-codes" />
          <ToolFeedback toolName="HTTP Status Codes Reference" />
          <ToolSeoContent slug="http-status-codes" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
