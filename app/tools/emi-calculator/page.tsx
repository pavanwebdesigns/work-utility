"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Download, IndianRupee, PieChart } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { calculateEmi, tenureToMonths } from "@/lib/emi-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useCurrency } from "@/lib/currency-context";

const PIE_COLORS = ["#3B82F6", "#F59E0B"];

export default function EmiCalculatorPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);
  const [loanAmount, setLoanAmount] = useState("2500000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");

  const result = useMemo(() => {
    const principal = parseNumberInput(loanAmount);
    const rate = parseNumberInput(interestRate);
    const tenureValue = parseNumberInput(tenure);
    const months = tenureToMonths(tenureValue, tenureUnit);
    return calculateEmi(principal, rate, months);
  }, [interestRate, loanAmount, tenure, tenureUnit]);

  const pieData = result
    ? [
        { name: "Principal", value: Math.round(result.principal) },
        { name: "Interest", value: Math.round(result.totalInterest) },
      ]
    : [];

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
              <IndianRupee className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              EMI Calculator — Calculate Your Loan EMI Instantly
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate monthly EMI for home loans, car loans, and personal loans
              with total interest breakdown.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="emi-calculator" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Loan Amount (${symbol})`} htmlFor="loan-amount">
              <CalculatorInput
                id="loan-amount"
                value={loanAmount}
                onChange={setLoanAmount}
                placeholder="25,00,000"
              />
            </CalculatorField>

            <CalculatorField label="Interest Rate (% per annum)" htmlFor="interest-rate">
              <CalculatorInput
                id="interest-rate"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="8.5"
              />
            </CalculatorField>

            <CalculatorField label="Loan Tenure" htmlFor="loan-tenure">
              <div className="space-y-3">
                <CalculatorInput
                  id="loan-tenure"
                  value={tenure}
                  onChange={setTenure}
                  placeholder={tenureUnit === "years" ? "20" : "240"}
                />
                <ToggleButtonGroup
                  value={tenureUnit}
                  onChange={setTenureUnit}
                  ariaLabel="Loan tenure unit"
                  options={[
                    { value: "years", label: "Years" },
                    { value: "months", label: "Months" },
                  ]}
                />
              </div>
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Monthly EMI"
                  value={fmt(result.emi, 0)}
                  highlight
                />
                <ResultCard
                  label="Total Interest Payable"
                  value={fmt(result.totalInterest, 0)}
                />
                <ResultCard
                  label="Total Amount Payable"
                  value={fmt(result.totalAmount, 0)}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-brand-blue" />
                  <h2 className="font-semibold text-content-primary">
                    Amortization Summary
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={2}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={PIE_COLORS[index % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => fmt(Number(value), 0)}
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid #1F2937",
                            borderRadius: "0.75rem",
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-content-secondary">Principal</span>
                      <span className="font-semibold text-content-primary">
                        {fmt(result.principal, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-content-secondary">Interest</span>
                      <span className="font-semibold text-content-primary">
                        {fmt(result.totalInterest, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-surface-border pt-3">
                      <span className="text-sm text-content-secondary">Total Payable</span>
                      <span className="font-semibold text-brand-blue">
                        {fmt(result.totalAmount, 0)}
                      </span>
                    </div>
                  </div>
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
                { step: "01", icon: IndianRupee, title: "Enter Loan Details", description: "Add amount, rate, and tenure" },
                { step: "02", icon: Calculator, title: "Instant EMI", description: "See monthly EMI in real time" },
                { step: "03", icon: Download, title: "Plan Repayment", description: "Review principal vs interest split" },
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

          <RelatedTools currentSlug="emi-calculator" />
          <ToolFeedback toolName="EMI Calculator" />
          <ToolSeoContent slug="emi-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
