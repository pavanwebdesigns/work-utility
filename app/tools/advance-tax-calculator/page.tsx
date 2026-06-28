"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CalendarDays, Receipt } from "lucide-react";
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
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  ADVANCE_TAX_DISCLAIMER,
  calculateAdvanceTax,
  type IncomeType,
  type TaxRegime,
} from "@/lib/advance-tax-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function AdvanceTaxCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [estimatedIncome, setEstimatedIncome] = useState("1500000");
  const [incomeType, setIncomeType] = useState<IncomeType>("salaried");
  const [tdsDeducted, setTdsDeducted] = useState("0");
  const [regime, setRegime] = useState<TaxRegime>("new");
  const [otherDeductions, setOtherDeductions] = useState("0");

  const result = useMemo(
    () =>
      calculateAdvanceTax({
        estimatedIncome: parseNumberInput(estimatedIncome),
        incomeType,
        tdsDeducted: parseNumberInput(tdsDeducted),
        regime,
        otherDeductions: parseNumberInput(otherDeductions),
      }),
    [estimatedIncome, incomeType, otherDeductions, regime, tdsDeducted],
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
              <Receipt className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Advance Tax Calculator India FY 2026-27
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate advance tax liability, eligibility, and installment schedule
              for June, September, December, and March due dates.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="advance-tax-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="advance-tax-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label="Estimated Annual Income (₹)" htmlFor="income">
              <CalculatorInput
                id="income"
                value={estimatedIncome}
                onChange={setEstimatedIncome}
                placeholder="15,00,000"
              />
            </CalculatorField>

            <CalculatorField label="Income Type" htmlFor="income-type">
              <ToggleButtonGroup
                value={incomeType}
                onChange={setIncomeType}
                ariaLabel="Income type"
                options={[
                  { value: "salaried" as const, label: "Salaried + other" },
                  { value: "business" as const, label: "Business/Freelancer" },
                  {
                    value: "section-44ada" as const,
                    label: "Section 44ADA",
                  },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="TDS Already Deducted (₹)" htmlFor="tds">
              <CalculatorInput
                id="tds"
                value={tdsDeducted}
                onChange={setTdsDeducted}
                placeholder="0"
              />
            </CalculatorField>

            <CalculatorField label="Tax Regime" htmlFor="regime">
              <ToggleButtonGroup
                value={regime}
                onChange={setRegime}
                ariaLabel="Tax regime"
                options={[
                  { value: "new" as const, label: "New Regime" },
                  { value: "old" as const, label: "Old Regime" },
                ]}
              />
            </CalculatorField>

            {regime === "old" && (
              <CalculatorField
                label="Other Deductions (80C, 80D, HRA, etc.) (₹)"
                htmlFor="deductions"
              >
                <CalculatorInput
                  id="deductions"
                  value={otherDeductions}
                  onChange={setOtherDeductions}
                  placeholder="0"
                />
              </CalculatorField>
            )}
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard label="Total Tax" value={fmt(result.totalTax)} />
                <ResultCard
                  label="Net Tax Payable"
                  value={fmt(result.netTaxPayable)}
                  highlight
                />
                <ResultCard
                  label="Advance Tax"
                  value={result.advanceTaxRequired ? "Required" : "Not required"}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                <BreakdownRow
                  label="Taxable Income"
                  value={fmt(result.taxResult.taxableIncome)}
                />
                <BreakdownRow
                  label="TDS Deducted"
                  value={`- ${fmt(result.tdsDeducted)}`}
                />
                <BreakdownRow
                  label="Net Tax Payable"
                  value={fmt(result.netTaxPayable)}
                />
              </div>

              {!result.advanceTaxRequired && (
                <p className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-content-secondary">
                  No advance tax needed — net tax liability is ₹10,000 or below after TDS.
                </p>
              )}

              {result.advanceTaxRequired && result.isSinglePayment && (
                <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                  💡 Under Section 44ADA, you only need ONE payment — 100% of estimated
                  tax by 15 March 2027. No quarterly instalments needed.
                </div>
              )}

              {result.advanceTaxRequired && result.installments.length > 0 && (
                <div className="overflow-auto rounded-2xl border border-surface-border">
                  <table className="min-w-full text-sm">
                    <thead className="bg-surface-elevated">
                      <tr>
                        <th className="px-4 py-2 text-left">Installment</th>
                        <th className="px-4 py-2 text-left">Due Date</th>
                        <th className="px-4 py-2 text-right">Cumulative %</th>
                        <th className="px-4 py-2 text-right">Amount Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.installments.map((row) => (
                        <tr key={row.label} className="border-t border-surface-border">
                          <td className="px-4 py-2">{row.label}</td>
                          <td className="px-4 py-2">{row.dueDate}</td>
                          <td className="px-4 py-2 text-right">
                            {row.cumulativePercent}%
                          </td>
                          <td className="px-4 py-2 text-right font-medium">
                            {fmt(row.amountDue)}
                            <CopyValueButton
                              value={fmt(row.amountDue)}
                              label="Copy"
                              className="ml-1"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-content-secondary">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p>
                  If you miss any instalment: Interest under Section 234B (1% per month
                  on unpaid tax) and Section 234C (1% per month per quarter for shortfall)
                  will apply.
                </p>
              </div>
            </div>
          )}

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            {ADVANCE_TAX_DISCLAIMER}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: CalendarDays, title: "4 due dates", desc: "June, Sep, Dec, March" },
              { icon: Receipt, title: "44ADA rule", desc: "Single March payment option" },
              { icon: AlertTriangle, title: "Penalty alert", desc: "234B & 234C interest warning" },
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

          <RelatedTools currentSlug="advance-tax-calculator" />
          <ToolFeedback toolName="Advance Tax Calculator" />
          <ToolSeoContent slug="advance-tax-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
