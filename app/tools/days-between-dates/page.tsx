"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarRange } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  calculateDaysBetween,
  parseDateInput,
} from "@/lib/days-between-dates";

function todayInputValue(): string {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

export default function DaysBetweenDatesPage() {
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState(todayInputValue());

  const { result, error } = useMemo(() => {
    const start = parseDateInput(startDate);
    const end = parseDateInput(endDate);

    if (!start || !end) {
      return { result: null, error: "Please enter valid start and end dates." };
    }

    return {
      result: calculateDaysBetween(start, end),
      error: null,
    };
  }, [startDate, endDate]);

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
              <CalendarRange className="h-6 w-6 text-tool-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Days Between Dates Calculator — Free Date Difference Tool
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate the exact number of days between two dates, with a calendar breakdown and countdown framing.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="days-between-dates" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block rounded-xl border border-surface-border bg-surface-card p-4">
                <span className="mb-2 block text-sm font-medium text-content-primary">Start date</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary"
                />
              </label>
              <label className="block rounded-xl border border-surface-border bg-surface-card p-4">
                <span className="mb-2 block text-sm font-medium text-content-primary">End date</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  className="w-full rounded-lg border border-surface-border bg-surface-base px-3 py-2 text-sm text-content-primary"
                />
              </label>
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {result && !error && (
              <div className="space-y-4">
                <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-6 text-center">
                  <p className="text-sm text-content-secondary">Total days between dates</p>
                  <p className="mt-1 text-4xl font-bold text-brand-blue">
                    {result.absoluteDays}
                  </p>
                  <p className="mt-2 text-sm text-content-muted">
                    {result.totalDays === 0
                      ? "Both dates are the same day"
                      : result.totalDays > 0
                        ? `${result.totalDays} day${result.totalDays === 1 ? "" : "s"} from start to end`
                        : `${Math.abs(result.totalDays)} day${Math.abs(result.totalDays) === 1 ? "" : "s"} before the start date`}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Years", value: result.years },
                    { label: "Months", value: result.months },
                    { label: "Days", value: result.days },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-surface-border bg-surface-card p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-content-primary">{item.value}</p>
                      <p className="text-xs text-content-muted">{item.label}</p>
                    </div>
                  ))}
                </div>

                {result.relativeToToday && (
                  <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center">
                    <p className="text-sm text-content-secondary">Relative to today</p>
                    <p className="mt-1 text-lg font-semibold text-content-primary">
                      {result.relativeToToday}
                    </p>
                  </div>
                )}

                <p className="text-xs text-content-muted">
                  Convention: the day count is end date minus start date. The start date is not counted as a full elapsed day — so Jan 1 to Jan 3 is 2 days, not 3.
                </p>
              </div>
            )}
          </div>

          <RelatedTools currentSlug="days-between-dates" />
          <ToolFeedback toolName="Days Between Dates" />
          <ToolSeoContent slug="days-between-dates" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
