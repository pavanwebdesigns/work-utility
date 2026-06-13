"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, Calculator, LineChart, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import { formatINR, parseNumberInput } from "@/lib/format-inr";
import { calculateSipReturns } from "@/lib/sip-calculator";

export default function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [years, setYears] = useState("10");

  const result = useMemo(() => {
    return calculateSipReturns(
      parseNumberInput(monthlyInvestment),
      parseNumberInput(expectedReturn),
      parseNumberInput(years)
    );
  }, [expectedReturn, monthlyInvestment, years]);

  const chartData =
    result?.yearlyBreakdown.map((item) => ({
      year: `Year ${item.year}`,
      Invested: Math.round(item.invested),
      Returns: Math.round(item.returns),
    })) ?? [];

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <TrendingUp className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              SIP Calculator — Calculate Mutual Fund SIP Returns
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Estimate SIP maturity value, total invested amount, and returns
              with a year-by-year growth chart.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Monthly Investment (₹)" htmlFor="sip-amount">
              <CalculatorInput
                id="sip-amount"
                value={monthlyInvestment}
                onChange={setMonthlyInvestment}
                placeholder="5,000"
              />
            </CalculatorField>

            <CalculatorField label="Expected Return Rate (% per annum)" htmlFor="sip-rate">
              <CalculatorInput
                id="sip-rate"
                value={expectedReturn}
                onChange={setExpectedReturn}
                placeholder="12"
              />
            </CalculatorField>

            <CalculatorField label="Investment Period (years)" htmlFor="sip-years">
              <CalculatorInput
                id="sip-years"
                value={years}
                onChange={setYears}
                placeholder="10"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Total Invested Amount"
                  value={formatINR(result.totalInvested, 0)}
                />
                <ResultCard
                  label="Estimated Returns"
                  value={formatINR(result.estimatedReturns, 0)}
                  highlight
                />
                <ResultCard
                  label="Total Maturity Value"
                  value={formatINR(result.maturityValue, 0)}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-tool-convert" />
                  <h2 className="font-semibold text-content-primary">
                    Invested vs Returns (Year by Year)
                  </h2>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
                      <XAxis dataKey="year" stroke="#94A3B8" />
                      <YAxis
                        tickFormatter={(value) => formatINR(Number(value), 0)}
                        stroke="#94A3B8"
                        width={90}
                      />
                      <Tooltip
                        formatter={(value) => formatINR(Number(value), 0)}
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "1px solid #1F2937",
                          borderRadius: "0.75rem",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="Invested" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Returns" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: TrendingUp, title: "Enter SIP Details", description: "Add monthly amount, return rate, and years" },
                { step: "02", icon: Calculator, title: "Instant Projection", description: "See invested amount and estimated returns" },
                { step: "03", icon: LineChart, title: "Track Growth", description: "Compare invested vs returns each year" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon className="h-5 w-5 text-tool-convert" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="sip-calculator" />
          <ToolFeedback toolName="SIP Calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
