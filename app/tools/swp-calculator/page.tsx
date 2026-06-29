"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Lightbulb, PiggyBank, TrendingDown } from "lucide-react";
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
  SWP_DISCLAIMER,
  calculateSwpCorpusNeeded,
  calculateSwpDuration,
  type SwpMode,
} from "@/lib/swp-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

function SwpDepletionChart({
  yearRows,
  corpus,
}: {
  yearRows: { year: number; closingBalance: number }[];
  corpus: number;
}) {
  if (yearRows.length === 0) return null;

  const width = 320;
  const height = 120;
  const padding = 8;
  const maxY = corpus;
  const points = yearRows.map((row, i) => {
    const x =
      padding +
      (i / Math.max(yearRows.length - 1, 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      (row.closingBalance / maxY) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto w-full max-w-md"
      role="img"
      aria-label="Corpus depletion over time"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-brand-blue"
        points={points.join(" ")}
      />
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        className="stroke-surface-border"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function SwpCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [mode, setMode] = useState<SwpMode>("duration");
  const [corpus, setCorpus] = useState("5000000");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("25000");
  const [monthlyIncome, setMonthlyIncome] = useState("25000");
  const [withdrawalYears, setWithdrawalYears] = useState("20");
  const [expectedReturn, setExpectedReturn] = useState("8");

  const durationResult = useMemo(
    () =>
      mode === "duration"
        ? calculateSwpDuration(
            parseNumberInput(corpus),
            parseNumberInput(monthlyWithdrawal),
            parseNumberInput(expectedReturn),
          )
        : null,
    [corpus, expectedReturn, mode, monthlyWithdrawal],
  );

  const corpusResult = useMemo(
    () =>
      mode === "corpus-needed"
        ? calculateSwpCorpusNeeded(
            parseNumberInput(monthlyIncome),
            parseNumberInput(withdrawalYears),
            parseNumberInput(expectedReturn),
          )
        : null,
    [expectedReturn, mode, monthlyIncome, withdrawalYears],
  );

  const insightCorpus =
    mode === "duration"
      ? parseNumberInput(corpus)
      : corpusResult?.corpusRequired ?? 0;
  const fdMonthly = (insightCorpus * 0.07) / 12;

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
              <TrendingDown
                className="h-6 w-6 text-tool-photo"
                strokeWidth={1.75}
              />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              SWP Calculator — Systematic Withdrawal Plan
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate how long your corpus lasts with monthly SWP withdrawals,
              or how much corpus you need for target monthly income.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="swp-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="swp-calculator" />

          <div className="mx-auto mt-8 max-w-xl">
            <ToggleButtonGroup
              value={mode}
              onChange={setMode}
              ariaLabel="SWP calculator mode"
              options={[
                { value: "duration", label: "How long will it last?" },
                { value: "corpus-needed", label: "Corpus needed" },
              ]}
            />
          </div>

          <div className="mx-auto mt-6 max-w-xl space-y-5">
            {mode === "duration" ? (
              <>
                <CalculatorField label="Corpus (₹)" htmlFor="corpus">
                  <CalculatorInput
                    id="corpus"
                    value={corpus}
                    onChange={setCorpus}
                    placeholder="50,00,000"
                  />
                </CalculatorField>
                <CalculatorField
                  label="Monthly Withdrawal (₹)"
                  htmlFor="withdrawal"
                >
                  <CalculatorInput
                    id="withdrawal"
                    value={monthlyWithdrawal}
                    onChange={setMonthlyWithdrawal}
                    placeholder="25,000"
                  />
                </CalculatorField>
              </>
            ) : (
              <>
                <CalculatorField
                  label="Monthly Income Needed (₹)"
                  htmlFor="income"
                >
                  <CalculatorInput
                    id="income"
                    value={monthlyIncome}
                    onChange={setMonthlyIncome}
                    placeholder="25,000"
                  />
                </CalculatorField>
                <CalculatorField
                  label="Withdrawal Period (years)"
                  htmlFor="years"
                >
                  <CalculatorInput
                    id="years"
                    value={withdrawalYears}
                    onChange={setWithdrawalYears}
                    placeholder="20"
                  />
                </CalculatorField>
              </>
            )}

            <CalculatorField
              label="Expected Annual Return (%)"
              htmlFor="return"
            >
              <CalculatorInput
                id="return"
                value={expectedReturn}
                onChange={setExpectedReturn}
                placeholder="8"
              />
            </CalculatorField>
          </div>

          {mode === "duration" && durationResult && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              {durationResult.neverDepletes ? (
                <div className="rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-4 text-center">
                  <p className="text-lg font-semibold text-content-primary">
                    Corpus never depletes
                  </p>
                  <p className="mt-2 text-sm text-content-secondary">
                    Monthly return ({fmt(durationResult.monthlyReturnAtStart)}) ≥
                    withdrawal ({fmt(durationResult.monthlyWithdrawal)}). Your
                    corpus is self-sustaining at this return rate.
                  </p>
                </div>
              ) : (
                <>
                  <ResultCard
                    label="Corpus will last"
                    value={`${durationResult.years} years ${durationResult.monthsRemainder} months`}
                    highlight
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ResultCard
                      label="Total withdrawn"
                      value={fmt(durationResult.totalWithdrawn)}
                    />
                    <ResultCard
                      label="Returns earned"
                      value={fmt(durationResult.totalReturnsEarned)}
                    />
                  </div>

                  {durationResult.yearRows.length > 0 && (
                    <>
                      <SwpDepletionChart
                        yearRows={durationResult.yearRows}
                        corpus={durationResult.corpus}
                      />
                      <div className="overflow-x-auto rounded-2xl border border-surface-border">
                        <table className="min-w-full text-sm">
                          <thead className="bg-surface-elevated">
                            <tr>
                              <th className="px-3 py-2 text-left">Year</th>
                              <th className="px-3 py-2 text-right">Opening</th>
                              <th className="px-3 py-2 text-right">Withdrawn</th>
                              <th className="px-3 py-2 text-right">Returns</th>
                              <th className="px-3 py-2 text-right">Closing</th>
                            </tr>
                          </thead>
                          <tbody>
                            {durationResult.yearRows.map((row) => (
                              <tr
                                key={row.year}
                                className="border-t border-surface-border"
                              >
                                <td className="px-3 py-2">{row.year}</td>
                                <td className="px-3 py-2 text-right">
                                  {fmt(row.openingBalance)}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  {fmt(row.withdrawn)}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  {fmt(row.returns)}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  {fmt(row.closingBalance)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}
              <CopyValueButton
                value={
                  durationResult.neverDepletes
                    ? "Never depletes"
                    : `${durationResult.years}y ${durationResult.monthsRemainder}m`
                }
                label="Copy duration"
                className="mx-auto flex"
              />
            </div>
          )}

          {mode === "corpus-needed" && corpusResult && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <ResultCard
                label="Corpus Required"
                value={fmt(corpusResult.corpusRequired)}
                highlight
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Total you'll withdraw"
                  value={fmt(corpusResult.totalWithdrawn)}
                />
                <ResultCard
                  label="Returns funding the gap"
                  value={fmt(corpusResult.returnsFundingGap)}
                />
              </div>
              <CopyValueButton
                value={fmt(corpusResult.corpusRequired)}
                label="Copy corpus"
                className="mx-auto flex"
              />
            </div>
          )}

          <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
            <Lightbulb className="mb-1 inline h-4 w-4" /> Vs Fixed Deposit:{" "}
            {fmt(insightCorpus)} FD at 7% generates {fmt(fdMonthly)}/month
            interest but never depletes capital. SWP withdraws from corpus but can
            earn higher returns in equity MFs (historically 10–12%).
          </div>

          <p className="mx-auto mt-4 max-w-3xl rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary">
            📌 SWP from equity mutual funds: First ₹1.25 lakh annual gains are
            exempt (LTCG). Beyond that, gains taxed at 12.5% (held &gt; 12 months)
            or 20% (held ≤ 12 months). Debt mutual funds: taxed at slab rate
            regardless of holding period.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-center text-xs text-content-muted">
            {SWP_DISCLAIMER}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: TrendingDown, title: "Depletion", desc: "Year-by-year table + chart" },
              { icon: PiggyBank, title: "Corpus needed", desc: "Target income mode" },
              { icon: Lightbulb, title: "Vs FD", desc: "Compare fixed deposit income" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-tool-photo" />
                <p className="mt-2 font-semibold text-content-primary">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="swp-calculator" />
          <ToolFeedback toolName="SWP Calculator" />
          <ToolSeoContent slug="swp-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
