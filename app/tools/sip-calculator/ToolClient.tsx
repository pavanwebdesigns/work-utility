"use client";

import { useMemo, useState } from "react";
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
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { calculateSipReturns } from "@/lib/sip-calculator";
import { useCurrency } from "@/lib/currency-context";

export default function SipCalculatorPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);
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
    <>
<div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Monthly Investment (${symbol})`} htmlFor="sip-amount">
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
                  value={fmt(result.totalInvested, 0)}
                />
                <ResultCard
                  label="Estimated Returns"
                  value={fmt(result.estimatedReturns, 0)}
                  highlight
                />
                <ResultCard
                  label="Total Maturity Value"
                  value={fmt(result.maturityValue, 0)}
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
                        tickFormatter={(value) => fmt(Number(value), 0)}
                        stroke="#94A3B8"
                        width={90}
                      />
                      <Tooltip
                        formatter={(value) => fmt(Number(value), 0)}
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
    </>
  );
}

