"use client";

import { useMemo, useState } from "react";
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
    <>
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
    </>
  );
}

