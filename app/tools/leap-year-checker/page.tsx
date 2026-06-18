"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { checkLeapYear } from "@/lib/leap-year-checker";

export default function LeapYearCheckerPage() {
  const currentYear = new Date().getFullYear();
  const [yearInput, setYearInput] = useState(String(currentYear));

  const result = useMemo(() => {
    const year = Number(yearInput);
    if (!yearInput || !Number.isInteger(year)) {
      return { data: null, error: "Enter a valid whole year." };
    }
    const data = checkLeapYear(year);
    if (!data) {
      return { data: null, error: "Enter a year between 1 and 9999." };
    }
    return { data, error: null };
  }, [yearInput]);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-blue/10">
              <CalendarCheck className="h-6 w-6 text-tool-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Leap Year Checker — Is This Year a Leap Year?
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Enter any year to see if it&apos;s a leap year, with the exact rule explained plus next and previous leap years.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="leap-year-checker" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <label className="block rounded-xl border border-surface-border bg-surface-card p-4">
              <span className="mb-2 block text-sm font-medium text-content-primary">Year</span>
              <input
                type="number"
                min="1"
                max="9999"
                value={yearInput}
                onChange={(event) => setYearInput(event.target.value)}
                className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary"
              />
            </label>

            {result.error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {result.error}
              </p>
            )}

            {result.data && !result.error && (
              <div className="space-y-4">
                <div
                  className={`rounded-xl border p-6 text-center ${
                    result.data.isLeapYear
                      ? "border-green-200 bg-green-50"
                      : "border-surface-border bg-surface-card"
                  }`}
                >
                  <p className="text-sm text-content-secondary">{result.data.year}</p>
                  <p
                    className={`mt-1 text-3xl font-bold ${
                      result.data.isLeapYear ? "text-green-700" : "text-content-primary"
                    }`}
                  >
                    {result.data.isLeapYear ? "Leap Year" : "Not a Leap Year"}
                  </p>
                  <p className="mt-3 text-sm text-content-secondary">{result.data.explanation}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                    <p className="text-xs text-content-muted">Previous leap year</p>
                    <p className="mt-1 text-xl font-semibold text-content-primary">
                      {result.data.previousLeapYear}
                    </p>
                  </div>
                  <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                    <p className="text-xs text-content-muted">Next leap year</p>
                    <p className="mt-1 text-xl font-semibold text-content-primary">
                      {result.data.nextLeapYear}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <RelatedTools currentSlug="leap-year-checker" />
          <ToolFeedback toolName="Leap Year Checker" />
          <ToolSeoContent slug="leap-year-checker" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
