"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, DollarSign, Lightbulb } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { USRulesBadge } from "@/components/USRulesBadge";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useUSRulesCurrency } from "@/lib/use-us-rules-currency";
import { US_TAX_DISCLAIMER } from "@/lib/us-federal-tax-2026";
import { calculateSelfEmploymentTaxFull } from "@/lib/self-employment-tax-calculator";
import type { USFilingStatus } from "@/lib/us-federal-tax-2026";

export default function SelfEmploymentTaxPage() {
  const { currency } = useUSRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);
  const fmtPct = (v: number) => `${v.toFixed(1)}%`;

  const [netSeIncome, setNetSeIncome] = useState("60000");
  const [w2Income, setW2Income] = useState("0");
  const [filingStatus, setFilingStatus] = useState<USFilingStatus>("single");
  const [includeQbi, setIncludeQbi] = useState(false);

  const result = useMemo(
    () =>
      calculateSelfEmploymentTaxFull({
        netSeIncome: parseNumberInput(netSeIncome),
        w2Income: parseNumberInput(w2Income),
        filingStatus,
        includeQbi,
      }),
    [filingStatus, includeQbi, netSeIncome, w2Income],
  );

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <DollarSign className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Self-Employment Tax Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate SE tax, federal income tax, total burden, and quarterly payment amounts with 2026 due dates.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="self-employment-tax" />
            </div>
          </div>

          <USRulesBadge toolSlug="self-employment-tax" />

          <div className="mt-10 space-y-5 rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
            <CalculatorField label="Net Self-Employment Income ($/year)" htmlFor="net-se-income">
              <CalculatorInput id="net-se-income" value={netSeIncome} onChange={setNetSeIncome} placeholder="60,000" />
              <p className="mt-1 text-xs text-content-secondary">Gross business income minus business expenses</p>
            </CalculatorField>
            <CalculatorField label="Other W-2 Income ($/year)" htmlFor="w2-income">
              <CalculatorInput id="w2-income" value={w2Income} onChange={setW2Income} placeholder="0" />
            </CalculatorField>
            <CalculatorField label="Filing Status" htmlFor="se-filing-status">
              <ToggleButtonGroup
                value={filingStatus}
                onChange={setFilingStatus}
                ariaLabel="Filing status"
                options={[
                  { value: "single", label: "Single" },
                  { value: "mfj", label: "Married Filing Jointly" },
                ]}
              />
            </CalculatorField>
            <CalculatorField label="Include QBI Deduction (20%)" htmlFor="include-qbi">
              <ToggleButtonGroup
                value={includeQbi ? "yes" : "no"}
                onChange={(v) => setIncludeQbi(v === "yes")}
                ariaLabel="QBI deduction"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <ResultCard label="Total SE Tax" value={fmt(result.seTax.totalSeTax)} />
                <ResultCard label="Total Tax (SE + Federal)" value={fmt(result.totalTax)} highlight />
                <ResultCard label="Effective Rate" value={fmtPct(result.effectiveRate)} />
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
                <h2 className="mb-4 text-lg font-semibold text-content-primary">Step-by-Step Calculation</h2>
                {result.steps.map((step) => (
                  <BreakdownRow key={step.label} label={step.label} value={fmt(step.value)} />
                ))}
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-content-primary">Quarterly Payment Schedule</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-content-secondary">
                      {fmt(result.quarterlyPayment)}/quarter
                    </span>
                    <CopyValueButton value={String(Math.round(result.quarterlyPayment))} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[400px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-surface-border text-content-secondary">
                        <th className="py-2 pr-4">Quarter</th>
                        <th className="py-2 pr-4">Period</th>
                        <th className="py-2 pr-4">Due Date</th>
                        <th className="py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.quarterlySchedule.map((row) => (
                        <tr key={row.quarter} className="border-b border-surface-border last:border-0">
                          <td className="py-3 pr-4 font-medium">{row.quarter}</td>
                          <td className="py-3 pr-4">{row.period}</td>
                          <td className="py-3 pr-4">{row.dueDate}</td>
                          <td className="py-3 font-semibold">{fmt(row.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-tool-convert/30 bg-tool-convert/10 p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-tool-convert" />
                <p className="text-sm text-content-primary">
                  <strong>SE Tax Deduction:</strong> Deducting 50% of SE tax ({fmt(result.seTax.seTaxDeduction)}) from your income saved you approximately {fmt(result.incomeTaxSavedBySeDeduction)} in federal income tax.
                </p>
              </div>

              <div className="flex gap-3 rounded-xl border border-tool-pdf/30 bg-tool-pdf/10 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-tool-pdf" />
                <p className="text-sm text-content-primary">
                  <strong>Quarterly payments:</strong> Failing to pay estimated taxes can result in an IRS underpayment penalty even if you get a refund at year-end.
                </p>
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-content-secondary">{US_TAX_DISCLAIMER}</p>

          <div className="mt-10">
            <RelatedTools currentSlug="self-employment-tax" />
            <ToolSeoContent slug="self-employment-tax" />
            <ToolFeedback toolName="Self-Employment Tax Calculator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
