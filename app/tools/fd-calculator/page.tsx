"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Landmark, LineChart, PiggyBank } from "lucide-react";
import {
  Line,
  LineChart as RechartsLineChart,
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
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  calculateFdReturns,
  tenureToYears,
  type CompoundingFrequency,
} from "@/lib/fd-calculator";
import { formatINR, parseNumberInput } from "@/lib/format-inr";

export default function FdCalculatorPage() {
  const [principal, setPrincipal] = useState("500000");
  const [interestRate, setInterestRate] = useState("7.25");
  const [tenure, setTenure] = useState("5");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [frequency, setFrequency] = useState<CompoundingFrequency>("quarterly");

  const result = useMemo(() => {
    const tenureYears = tenureToYears(parseNumberInput(tenure), tenureUnit);
    return calculateFdReturns(
      parseNumberInput(principal),
      parseNumberInput(interestRate),
      tenureYears,
      frequency
    );
  }, [frequency, interestRate, principal, tenure, tenureUnit]);

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <PiggyBank className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              FD Returns Calculator — Calculate Fixed Deposit Maturity Amount
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate fixed deposit maturity value, interest earned, and
              year-by-year growth with compounding options.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Principal Amount (₹)" htmlFor="fd-principal">
              <CalculatorInput
                id="fd-principal"
                value={principal}
                onChange={setPrincipal}
                placeholder="5,00,000"
              />
            </CalculatorField>

            <CalculatorField label="Interest Rate (% per annum)" htmlFor="fd-rate">
              <CalculatorInput
                id="fd-rate"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="7.25"
              />
            </CalculatorField>

            <CalculatorField label="Tenure" htmlFor="fd-tenure">
              <div className="space-y-3">
                <CalculatorInput
                  id="fd-tenure"
                  value={tenure}
                  onChange={setTenure}
                  placeholder={tenureUnit === "years" ? "5" : "60"}
                />
                <ToggleButtonGroup
                  value={tenureUnit}
                  onChange={setTenureUnit}
                  ariaLabel="FD tenure unit"
                  options={[
                    { value: "years", label: "Years" },
                    { value: "months", label: "Months" },
                  ]}
                />
              </div>
            </CalculatorField>

            <CalculatorField label="Compounding Frequency" htmlFor="fd-frequency">
              <CalculatorSelect
                id="fd-frequency"
                value={frequency}
                onChange={(value) => setFrequency(value as CompoundingFrequency)}
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "quarterly", label: "Quarterly" },
                  { value: "yearly", label: "Yearly" },
                ]}
                ariaLabel="Compounding frequency"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Maturity Amount"
                  value={formatINR(result.maturityAmount, 0)}
                  highlight
                />
                <ResultCard
                  label="Total Interest Earned"
                  value={formatINR(result.interestEarned, 0)}
                />
                <ResultCard
                  label="Effective Annual Rate"
                  value={`${result.effectiveAnnualRate.toFixed(2)}%`}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-tool-photo" />
                  <h2 className="font-semibold text-content-primary">
                    Growth Chart
                  </h2>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={result.yearlyGrowth}>
                      <XAxis
                        dataKey="year"
                        tickFormatter={(value) => `Year ${value}`}
                        stroke="#94A3B8"
                      />
                      <YAxis
                        tickFormatter={(value) => formatINR(Number(value), 0)}
                        stroke="#94A3B8"
                        width={90}
                      />
                      <Tooltip
                        formatter={(value) => formatINR(Number(value), 0)}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "1px solid #1F2937",
                          borderRadius: "0.75rem",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#F59E0B"
                        strokeWidth={3}
                        dot={{ fill: "#F59E0B", r: 4 }}
                      />
                    </RechartsLineChart>
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
                { step: "01", icon: PiggyBank, title: "Deposit Details", description: "Enter principal, rate, and tenure" },
                { step: "02", icon: Landmark, title: "Compounding", description: "Choose monthly, quarterly, or yearly" },
                { step: "03", icon: Calculator, title: "Maturity Value", description: "See interest earned and growth chart" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-photo/10">
                    <step.icon className="h-5 w-5 text-tool-photo" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="fd-calculator" />
          <ToolFeedback toolName="FD Returns Calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
