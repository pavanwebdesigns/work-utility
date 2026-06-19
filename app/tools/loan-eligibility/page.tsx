"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Scale } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import {
  calculateLoanEligibility,
  ELIGIBILITY_STATUS_LABELS,
  FOIR_CONSERVATIVE,
  FOIR_OPTIMISTIC,
  LOAN_TYPE_LABELS,
  type LoanType,
} from "@/lib/loan-eligibility-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

const LOAN_TYPES = Object.keys(LOAN_TYPE_LABELS) as LoanType[];

export default function LoanEligibilityPage() {
  const { symbol, currency } = useIndiaRulesCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);

  const [monthlyIncome, setMonthlyIncome] = useState("80000");
  const [existingEmis, setExistingEmis] = useState("15000");
  const [loanType, setLoanType] = useState<LoanType>("home");
  const [desiredAmount, setDesiredAmount] = useState("2500000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenureYears, setTenureYears] = useState("20");

  const result = useMemo(() => {
    return calculateLoanEligibility({
      monthlyIncome: parseNumberInput(monthlyIncome),
      existingEmis: parseNumberInput(existingEmis),
      desiredLoanAmount: parseNumberInput(desiredAmount),
      annualRatePercent: parseNumberInput(interestRate),
      tenureYears: parseNumberInput(tenureYears),
    });
  }, [
    desiredAmount,
    existingEmis,
    interestRate,
    monthlyIncome,
    tenureYears,
  ]);

  const statusClass =
    result?.status === "eligible"
      ? "text-emerald-600"
      : result?.status === "marginally_eligible"
        ? "text-amber-600"
        : "text-red-600";

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

        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Scale className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Loan Eligibility Calculator India — Check Bank Limit
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Estimate max loan amount using FOIR guidelines used by most
              Indian banks.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="loan-eligibility" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="loan-eligibility" />

          <div className="mt-10 space-y-5">
            <CalculatorField
              label={`Monthly net income / take-home (${symbol})`}
              htmlFor="monthly-income"
            >
              <CalculatorInput
                id="monthly-income"
                value={monthlyIncome}
                onChange={setMonthlyIncome}
                placeholder="80000"
              />
            </CalculatorField>

            <CalculatorField
              label={`Existing EMIs per month (${symbol})`}
              htmlFor="existing-emis"
            >
              <CalculatorInput
                id="existing-emis"
                value={existingEmis}
                onChange={setExistingEmis}
                placeholder="15000"
              />
            </CalculatorField>

            <CalculatorField label="Loan type" htmlFor="loan-type">
              <select
                id="loan-type"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value as LoanType)}
                className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none focus:border-brand-blue"
              >
                {LOAN_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {LOAN_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </CalculatorField>

            <CalculatorField
              label={`Desired loan amount (${symbol})`}
              htmlFor="desired-amount"
            >
              <CalculatorInput
                id="desired-amount"
                value={desiredAmount}
                onChange={setDesiredAmount}
                placeholder="2500000"
              />
            </CalculatorField>

            <div className="grid gap-5 sm:grid-cols-2">
              <CalculatorField
                label="Interest rate (% p.a.)"
                htmlFor="interest-rate"
              >
                <CalculatorInput
                  id="interest-rate"
                  value={interestRate}
                  onChange={setInterestRate}
                  placeholder="8.5"
                />
              </CalculatorField>

              <CalculatorField label="Tenure (years)" htmlFor="tenure-years">
                <CalculatorInput
                  id="tenure-years"
                  value={tenureYears}
                  onChange={setTenureYears}
                  placeholder="20"
                />
              </CalculatorField>
            </div>
          </div>

          {result && (
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <h2 className="font-semibold text-content-primary">
                  Maximum eligible loan (FOIR-based)
                </h2>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-content-secondary">
                      Conservative ({FOIR_CONSERVATIVE * 100}% FOIR)
                    </span>
                    <span className="font-semibold text-content-primary">
                      {fmt(result.maxLoanConservative)}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-content-secondary">
                      Optimistic ({FOIR_OPTIMISTIC * 100}% FOIR)
                    </span>
                    <span className="font-semibold text-content-primary">
                      {fmt(result.maxLoanOptimistic)}
                    </span>
                  </div>
                  <p className="text-xs text-content-muted">
                    Max EMI capacity: {fmt(result.maxEmiConservative)}/mo
                    (40%) · {fmt(result.maxEmiOptimistic)}/mo (50%)
                  </p>
                </div>
              </div>

              {result.desiredEmi !== null && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <ResultCard
                      label="Monthly EMI"
                      value={fmt(result.desiredEmi)}
                      highlight
                    />
                    <ResultCard
                      label="Eligibility status"
                      value={ELIGIBILITY_STATUS_LABELS[result.status]}
                    />
                  </div>
                  <div className="rounded-xl border border-surface-border bg-surface-card p-5 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-content-secondary">
                        Total EMI (incl. existing)
                      </span>
                      <span className="font-semibold text-content-primary">
                        {fmt(result.totalEmiWithDesired)}/mo
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <span className="text-content-secondary">FOIR ratio</span>
                      <span className={`font-semibold ${statusClass}`}>
                        {(result.foirWithDesired * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </>
              )}

              {result.status === "exceeds_recommended" && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                  <p className="font-medium text-amber-950">
                    Suggested comfortable loan amount
                  </p>
                  <p className="mt-2">
                    Based on the 40% FOIR threshold, a more comfortable loan
                    amount would be approximately{" "}
                    <strong>{fmt(result.comfortableLoanAmount)}</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            This is an estimate based on FOIR guidelines used by most Indian
            banks. Actual eligibility also depends on CIBIL score, employment
            type, age, and the specific lender&apos;s policies.
          </div>

          <p className="mt-4 text-center text-sm text-content-secondary">
            Calculate EMI separately with our{" "}
            <Link
              href="/tools/emi-calculator"
              className="font-medium text-brand-blue hover:underline"
            >
              EMI Calculator
            </Link>
            .
          </p>

          <RelatedTools currentSlug="loan-eligibility" />
          <ToolFeedback toolName="Loan Eligibility Calculator" />
          <ToolSeoContent slug="loan-eligibility" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
