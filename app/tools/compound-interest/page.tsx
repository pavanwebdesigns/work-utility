"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, LineChart, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import {
  calculateCompoundInterest,
  type CompoundFrequency,
} from "@/lib/compound-interest";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useCurrency } from "@/lib/currency-context";

const howItWorksSteps = [
  {
    step: "01",
    icon: Calculator,
    title: "Enter",
    description: "Enter principal, rate, years, and frequency",
  },
  {
    step: "02",
    icon: LineChart,
    title: "Calculate",
    description: "See compound growth with optional contributions",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "See Growth",
    description: "Review final amount and year-by-year breakdown",
  },
];

const FREQUENCY_OPTIONS: { value: CompoundFrequency; label: string }[] = [
  { value: "annually", label: "Annually" },
  { value: "semi-annually", label: "Semi-annually" },
  { value: "quarterly", label: "Quarterly" },
  { value: "monthly", label: "Monthly" },
  { value: "daily", label: "Daily" },
];

export default function CompoundInterestPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);

  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState<CompoundFrequency>("annually");
  const [monthlyContribution, setMonthlyContribution] = useState("0");
  const [result, setResult] = useState<ReturnType<
    typeof calculateCompoundInterest
  > | null>(null);

  const handleCalculate = () => {
    setResult(
      calculateCompoundInterest(
        parseNumberInput(principal),
        parseNumberInput(rate),
        parseNumberInput(years),
        frequency,
        parseNumberInput(monthlyContribution),
      ),
    );
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <TrendingUp
                className="h-6 w-6 text-tool-convert"
                strokeWidth={1.75}
              />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Compound Interest Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate how your investment grows with compound interest and
              optional monthly contributions.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Principal (${symbol})`} htmlFor="ci-principal">
              <CalculatorInput
                id="ci-principal"
                value={principal}
                onChange={setPrincipal}
                placeholder="1,00,000"
              />
            </CalculatorField>

            <CalculatorField label="Annual Rate (%)" htmlFor="ci-rate">
              <CalculatorInput
                id="ci-rate"
                value={rate}
                onChange={setRate}
                placeholder="8"
              />
            </CalculatorField>

            <CalculatorField label="Years" htmlFor="ci-years">
              <CalculatorInput
                id="ci-years"
                value={years}
                onChange={setYears}
                placeholder="10"
              />
            </CalculatorField>

            <CalculatorField label="Compounding Frequency" htmlFor="ci-freq">
              <CalculatorSelect
                id="ci-freq"
                value={frequency}
                onChange={(v) => setFrequency(v as CompoundFrequency)}
                options={FREQUENCY_OPTIONS}
              />
            </CalculatorField>

            <CalculatorField
              label={`Monthly Contribution (${symbol}) — optional`}
              htmlFor="ci-monthly"
            >
              <CalculatorInput
                id="ci-monthly"
                value={monthlyContribution}
                onChange={setMonthlyContribution}
                placeholder="0"
              />
            </CalculatorField>

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full cursor-pointer rounded-xl bg-tool-convert py-3 text-sm font-semibold text-white transition-colors hover:bg-tool-convert/90"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="mx-auto mt-8 max-w-xl space-y-5">
              <ResultCard
                label="Final Amount"
                value={fmt(result.finalAmount)}
                highlight
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <p className="text-sm text-content-secondary">
                    Total Interest
                  </p>
                  <p className="mt-1 text-xl font-bold text-tool-convert">
                    {fmt(result.totalInterest)}
                  </p>
                </div>
                <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <p className="text-sm text-content-secondary">
                    Total Contributions
                  </p>
                  <p className="mt-1 text-xl font-bold text-content-primary">
                    {fmt(result.totalContributions)}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <p className="mb-3 text-sm font-medium text-content-primary">
                  Year-by-Year Growth
                </p>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-border text-left text-content-secondary">
                        <th className="pb-2 pr-4">Year</th>
                        <th className="pb-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.map((row) => (
                        <tr
                          key={row.year}
                          className="border-b border-surface-border/50"
                        >
                          <td className="py-2 pr-4 text-content-primary">
                            {row.year}
                          </td>
                          <td className="py-2 text-tool-convert">
                            {fmt(row.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon
                      className="h-5 w-5 text-tool-convert"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-xs font-semibold text-tool-convert">
                    {step.step}
                  </p>
                  <p className="mt-1 font-semibold text-content-primary">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="compound-interest" />
          <ToolFeedback toolName="Compound Interest Calculator" />
          <ToolSeoContent slug="compound-interest" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
