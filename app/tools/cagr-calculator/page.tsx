"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LineChart, TrendingUp, BarChart3 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  CAGR_BENCHMARKS,
  computeFindCagr,
  computeFindFv,
  computeFindRequired,
  type CagrMode,
} from "@/lib/cagr-calculator";
import {
  formatCurrency,
  formatIndianCompact,
  parseNumberInput,
  parsePercentInput,
} from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

function formatPct(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export default function CagrCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [mode, setMode] = useState<CagrMode>("find-cagr");
  const [initial, setInitial] = useState("100000");
  const [finalValue, setFinalValue] = useState("176234");
  const [targetValue, setTargetValue] = useState("500000");
  const [cagrRate, setCagrRate] = useState("12");
  const [years, setYears] = useState("5");
  const [showYearTable, setShowYearTable] = useState(false);

  const parsedInitial = parseNumberInput(initial);
  const parsedYears = parseNumberInput(years) || 1;

  const findCagrResult = useMemo(
    () =>
      mode === "find-cagr"
        ? computeFindCagr(parsedInitial, parseNumberInput(finalValue), parsedYears)
        : null,
    [finalValue, mode, parsedInitial, parsedYears],
  );

  const findFvResult = useMemo(
    () =>
      mode === "find-fv"
        ? computeFindFv(
            parsedInitial,
            parsePercentInput(cagrRate),
            parsedYears,
          )
        : null,
    [cagrRate, mode, parsedInitial, parsedYears],
  );

  const findRequiredResult = useMemo(
    () =>
      mode === "find-required"
        ? computeFindRequired(
            parsedInitial,
            parseNumberInput(targetValue),
            parsedYears,
          )
        : null,
    [mode, parsedInitial, parsedYears, targetValue],
  );

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <LineChart className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              CAGR Calculator India — Compound Annual Growth Rate
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate CAGR, future investment value, or required growth rate.
              Compare absolute vs annualised returns, Rule of 72, and inflation-adjusted real CAGR.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="cagr-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="cagr-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label="Calculation Mode" htmlFor="mode">
              <ToggleButtonGroup
                value={mode}
                onChange={(v) => {
                  setMode(v);
                  setYears(v === "find-cagr" ? "5" : "10");
                }}
                ariaLabel="CAGR calculation mode"
                options={[
                  { value: "find-cagr" as const, label: "Find CAGR" },
                  { value: "find-fv" as const, label: "Future Value" },
                  { value: "find-required" as const, label: "Required CAGR" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="Initial Value (₹)" htmlFor="initial">
              <CalculatorInput
                id="initial"
                value={initial}
                onChange={setInitial}
                placeholder="1,00,000"
              />
            </CalculatorField>

            {mode === "find-cagr" && (
              <CalculatorField label="Final Value (₹)" htmlFor="final">
                <CalculatorInput
                  id="final"
                  value={finalValue}
                  onChange={setFinalValue}
                  placeholder="1,76,234"
                />
              </CalculatorField>
            )}

            {mode === "find-fv" && (
              <CalculatorField label="Expected CAGR (% p.a.)" htmlFor="cagr">
                <CalculatorInput
                  id="cagr"
                  value={cagrRate}
                  onChange={setCagrRate}
                  placeholder="12"
                />
              </CalculatorField>
            )}

            {mode === "find-required" && (
              <CalculatorField label="Target Value (₹)" htmlFor="target">
                <CalculatorInput
                  id="target"
                  value={targetValue}
                  onChange={setTargetValue}
                  placeholder="5,00,000"
                />
              </CalculatorField>
            )}

            <CalculatorField label="Time Period (years)" htmlFor="years">
              <CalculatorInput
                id="years"
                value={years}
                onChange={setYears}
                placeholder={mode === "find-cagr" ? "5" : "10"}
              />
            </CalculatorField>
          </div>

          {mode === "find-cagr" && findCagrResult && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultCard
                  label="CAGR"
                  value={formatPct(findCagrResult.cagr)}
                  highlight
                />
                <ResultCard
                  label="Absolute Return"
                  value={formatPct(findCagrResult.absoluteReturn)}
                />
                <ResultCard
                  label="Real CAGR (6% inflation)"
                  value={formatPct(findCagrResult.realCagr)}
                />
                <ResultCard
                  label="Rule of 72"
                  value={
                    findCagrResult.doublingYears
                      ? `${findCagrResult.doublingYears.toFixed(1)} yrs to double`
                      : "—"
                  }
                />
              </div>
              {findCagrResult.doublingYears && (
                <p className="text-center text-sm text-content-secondary">
                  At {formatPct(findCagrResult.cagr, 1)} CAGR, money doubles every{" "}
                  {findCagrResult.doublingYears.toFixed(1)} years.
                  <CopyValueButton
                    value={formatPct(findCagrResult.cagr)}
                    label="Copy CAGR"
                    className="ml-2"
                  />
                </p>
              )}
            </div>
          )}

          {mode === "find-fv" && findFvResult && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultCard
                  label="Future Value"
                  value={fmt(findFvResult.futureValue)}
                  highlight
                />
                <ResultCard
                  label="Total Gain"
                  value={fmt(findFvResult.totalGain)}
                />
                <ResultCard
                  label="Absolute Return"
                  value={formatPct(findFvResult.absoluteReturn)}
                />
                <ResultCard
                  label="Rule of 72"
                  value={
                    findFvResult.doublingYears
                      ? `${findFvResult.doublingYears.toFixed(1)} yrs`
                      : "—"
                  }
                />
              </div>
              <p className="text-center text-sm text-content-muted">
                {formatIndianCompact(findFvResult.futureValue)}
                <CopyValueButton
                  value={fmt(findFvResult.futureValue)}
                  label="Copy"
                  className="ml-2"
                />
              </p>

              <button
                type="button"
                onClick={() => setShowYearTable((v) => !v)}
                className="mx-auto block text-sm font-medium text-brand-blue hover:underline"
              >
                {showYearTable ? "Hide" : "Show"} year-by-year growth table
              </button>

              {showYearTable && (
                <div className="max-h-80 overflow-auto rounded-2xl border border-surface-border">
                  <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-surface-elevated">
                      <tr>
                        <th className="px-4 py-2 text-left">Year</th>
                        <th className="px-4 py-2 text-right">Balance</th>
                        <th className="px-4 py-2 text-right">Gain</th>
                      </tr>
                    </thead>
                    <tbody>
                      {findFvResult.yearRows.map((row) => (
                        <tr key={row.year} className="border-t border-surface-border">
                          <td className="px-4 py-2">{row.year}</td>
                          <td className="px-4 py-2 text-right">{fmt(row.balance)}</td>
                          <td className="px-4 py-2 text-right">{fmt(row.gain)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {mode === "find-required" && findRequiredResult && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Required CAGR"
                  value={formatPct(findRequiredResult.requiredCagr)}
                  highlight
                />
                <ResultCard
                  label="Rule of 72"
                  value={
                    findRequiredResult.doublingYears
                      ? `${findRequiredResult.doublingYears.toFixed(1)} yrs to double`
                      : "—"
                  }
                />
              </div>
              <p className="rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-center text-sm text-content-secondary">
                This is{" "}
                <strong>
                  {findRequiredResult.niftyComparison === "above"
                    ? "above"
                    : findRequiredResult.niftyComparison === "below"
                      ? "below"
                      : "within"}
                </strong>{" "}
                Nifty 50&apos;s historical 15-year CAGR of ~12–15%.
              </p>
              {findRequiredResult.doublingYears && (
                <p className="text-center text-sm text-content-secondary">
                  At this rate, your money doubles every{" "}
                  {findRequiredResult.doublingYears.toFixed(1)} years.
                </p>
              )}
            </div>
          )}

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-surface-border bg-surface-card p-5">
            <h2 className="text-center font-semibold text-content-primary">
              CAGR Benchmarks for India
            </h2>
            <p className="mt-1 text-center text-sm text-content-muted">
              Use this to judge whether your investment CAGR is good or poor.
            </p>
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="py-2 text-left">Investment Type</th>
                  <th className="py-2 text-right">Typical CAGR</th>
                </tr>
              </thead>
              <tbody>
                {CAGR_BENCHMARKS.map((row) => (
                  <tr key={row.name} className="border-b border-surface-border/50">
                    <td className="py-2 text-content-secondary">{row.name}</td>
                    <td className="py-2 text-right font-medium text-content-primary">
                      {row.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: TrendingUp, title: "3 modes", desc: "Find CAGR, FV, or required rate" },
              { icon: BarChart3, title: "Real CAGR", desc: "Inflation-adjusted at 6%" },
              { icon: LineChart, title: "Rule of 72", desc: "Doubling time insight" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-tool-photo" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="cagr-calculator" />
          <ToolFeedback toolName="CAGR Calculator" />
          <ToolSeoContent slug="cagr-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
