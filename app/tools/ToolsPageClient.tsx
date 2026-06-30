"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolsCategorySection } from "@/components/ToolsCategorySection";
import { ALL_TOOLS } from "@/lib/tools-data";

export function ToolsPageClient() {
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
            <Suspense fallback={null}>
              <ToolsCategorySection />
            </Suspense>
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
