"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Briefcase, CalendarDays, Calculator, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { formatINR, parseNumberInput } from "@/lib/format-inr";
import {
  calculateNoticeBuyout,
  calculateNoticePeriod,
  formatDisplayDate,
  isDateInRange,
  isSameDay,
} from "@/lib/notice-period-calculator";

const NOTICE_PRESETS = [
  { value: "30", label: "30 days" },
  { value: "60", label: "60 days" },
  { value: "90", label: "90 days" },
  { value: "custom", label: "Custom" },
];

export default function NoticePeriodCalculatorPage() {
  const [resignationDate, setResignationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [noticePreset, setNoticePreset] = useState("60");
  const [customNoticeDays, setCustomNoticeDays] = useState("60");
  const [workingDaysOnly, setWorkingDaysOnly] = useState<"yes" | "no">("no");
  const [monthlySalary, setMonthlySalary] = useState("");

  const noticeDays = noticePreset === "custom"
    ? parseNumberInput(customNoticeDays)
    : Number(noticePreset);

  const result = useMemo(() => {
    return calculateNoticePeriod(
      resignationDate,
      noticeDays,
      workingDaysOnly === "yes"
    );
  }, [noticeDays, resignationDate, workingDaysOnly]);

  const buyoutAmount = useMemo(() => {
    if (!result) return null;
    return calculateNoticeBuyout(parseNumberInput(monthlySalary), result.daysRemaining);
  }, [monthlySalary, result]);

  const calendarWeeks = useMemo(() => {
    if (!result) return [];

    const uniqueDays = Array.from(
      new Map(result.calendarDays.map((day) => [day.toDateString(), day])).values()
    );

    const firstDay = uniqueDays[0]?.getDay() ?? 0;
    const leadingEmpty = Array.from({ length: firstDay }, () => null);
    return [...leadingEmpty, ...uniqueDays];
  }, [result]);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <CalendarDays className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Notice Period Calculator — Calculate Your Last Working Day
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Find your last working day, days remaining, and optional notice
              buyout amount from your resignation date.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Resignation Date" htmlFor="resignation-date">
              <input
                id="resignation-date"
                type="date"
                value={resignationDate}
                onChange={(event) => setResignationDate(event.target.value)}
                aria-label="Resignation date"
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none transition-colors focus:border-brand-blue [color-scheme:dark]"
              />
            </CalculatorField>

            <CalculatorField label="Notice Period" htmlFor="notice-period">
              <CalculatorSelect
                id="notice-period"
                value={noticePreset}
                onChange={setNoticePreset}
                options={NOTICE_PRESETS}
                ariaLabel="Notice period"
              />
            </CalculatorField>

            {noticePreset === "custom" && (
              <CalculatorField label="Custom Notice Period (days)" htmlFor="custom-notice">
                <CalculatorInput
                  id="custom-notice"
                  value={customNoticeDays}
                  onChange={setCustomNoticeDays}
                  placeholder="45"
                />
              </CalculatorField>
            )}

            <CalculatorField label="Count Working Days Only" htmlFor="working-days">
              <ToggleButtonGroup
                value={workingDaysOnly}
                onChange={setWorkingDaysOnly}
                ariaLabel="Working days only toggle"
                options={[
                  { value: "no", label: "Calendar Days" },
                  { value: "yes", label: "Working Days Only" },
                ]}
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Last Working Day"
                  value={formatDisplayDate(result.lastWorkingDay)}
                  highlight
                />
                <ResultCard
                  label="Days Remaining"
                  value={String(result.daysRemaining)}
                />
                <ResultCard
                  label="Weeks Remaining"
                  value={result.weeksRemaining.toFixed(1)}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <h2 className="mb-4 font-semibold text-content-primary">
                  Notice Period Calendar
                </h2>
                <div className="grid grid-cols-7 gap-2 text-center text-xs text-content-muted">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="py-1 font-medium">
                      {day}
                    </div>
                  ))}
                  {calendarWeeks.map((day, index) => {
                    if (!day) {
                      return <div key={`empty-${index}`} />;
                    }

                    const inRange = isDateInRange(
                      day,
                      result.resignationDate,
                      result.lastWorkingDay
                    );
                    const isStart = isSameDay(day, result.resignationDate);
                    const isEnd = isSameDay(day, result.lastWorkingDay);

                    return (
                      <div
                        key={day.toDateString()}
                        className={`rounded-lg py-2 text-sm ${
                          isStart || isEnd
                            ? "bg-brand-blue text-white font-semibold"
                            : inRange
                              ? "bg-brand-blue/20 text-content-primary"
                              : "text-content-secondary"
                        }`}
                      >
                        {day.getDate()}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs text-content-muted">
                  Highlighted range from resignation date to last working day.
                </p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-brand-blue" />
                  <h2 className="font-semibold text-content-primary">
                    Notice Buyout Amount
                  </h2>
                </div>
                <CalculatorField label="Monthly Salary (₹)" htmlFor="monthly-salary">
                  <CalculatorInput
                    id="monthly-salary"
                    value={monthlySalary}
                    onChange={setMonthlySalary}
                    placeholder="50,000"
                  />
                </CalculatorField>
                {buyoutAmount !== null && (
                  <div className="mt-4 rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-4 py-3">
                    <BreakdownRow
                      label="Estimated Buyout"
                      value={formatINR(buyoutAmount, 0)}
                    />
                    <p className="mt-2 text-xs text-content-muted">
                      Calculated as daily salary (monthly ÷ 30) × {result.daysRemaining} remaining days.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: CalendarDays, title: "Resignation Date", description: "Select when you submitted resignation" },
                { step: "02", icon: Clock, title: "Notice Period", description: "Choose 30/60/90 days or custom duration" },
                { step: "03", icon: Calculator, title: "Last Working Day", description: "See remaining days and buyout estimate" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="notice-period-calculator" />
          <ToolFeedback toolName="Notice Period Calculator" />
          <ToolSeoContent slug="notice-period-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
