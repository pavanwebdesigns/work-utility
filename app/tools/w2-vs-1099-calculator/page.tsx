"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GitCompare, Lightbulb } from "lucide-react";
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
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useUSRulesCurrency } from "@/lib/use-us-rules-currency";
import { US_TAX_DISCLAIMER } from "@/lib/us-federal-tax-2026";
import {
  compareW2Vs1099,
  type W2Vs1099Input,
} from "@/lib/w2-vs-1099-calculator";
import type { USFilingStatus } from "@/lib/us-federal-tax-2026";

const COMPARISON_ROWS = [
  ["Who pays FICA?", "Split 50/50 (you pay 7.65%)", "You pay full 15.3%"],
  ["Tax withholding", "Automatic from paycheck", "Quarterly estimated payments"],
  ["Benefits", "Often employer-provided", "You buy your own"],
  ["QBI deduction", "No", "Up to 20% of net income"],
  ["Business deductions", "Very limited", "Schedule C deductions"],
  ["Job security", "Higher", "Lower"],
  ["Income flexibility", "Fixed salary", "Unlimited"],
] as const;

export default function W2Vs1099CalculatorPage() {
  const { currency } = useUSRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [w2Salary, setW2Salary] = useState("80000");
  const [filingStatus, setFilingStatus] = useState<USFilingStatus>("single");
  const [healthMonthly, setHealthMonthly] = useState("500");
  const [match401k, setMatch401k] = useState("2400");
  const [ptoDays, setPtoDays] = useState("15");
  const [expenses, setExpenses] = useState("3000");

  const input: W2Vs1099Input = useMemo(
    () => ({
      w2AnnualSalary: parseNumberInput(w2Salary),
      filingStatus,
      employerHealthInsuranceMonthly: parseNumberInput(healthMonthly),
      employer401kMatchAnnual: parseNumberInput(match401k),
      ptoDays: parseNumberInput(ptoDays),
      businessExpensesAnnual: parseNumberInput(expenses),
    }),
    [expenses, filingStatus, healthMonthly, match401k, ptoDays, w2Salary],
  );

  const result = useMemo(() => compareW2Vs1099(input), [input]);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <GitCompare className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              W-2 vs 1099 Tax Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Find the minimum 1099 rate needed to match your W-2 take-home pay — after SE tax, benefits, and expenses.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="w2-vs-1099-calculator" />
            </div>
          </div>

          <USRulesBadge toolSlug="w2-vs-1099-calculator" />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-5 rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-content-primary">Your W-2 Details</h2>
              <CalculatorField label="W-2 Annual Salary ($)" htmlFor="w2-salary">
                <CalculatorInput id="w2-salary" value={w2Salary} onChange={setW2Salary} placeholder="80,000" />
              </CalculatorField>
              <CalculatorField label="Filing Status" htmlFor="filing-status">
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
              <CalculatorField label="Employer Health Insurance ($/month)" htmlFor="health-monthly">
                <CalculatorInput id="health-monthly" value={healthMonthly} onChange={setHealthMonthly} placeholder="500" />
              </CalculatorField>
              <CalculatorField label="Annual 401(k) Employer Match ($)" htmlFor="match-401k">
                <CalculatorInput id="match-401k" value={match401k} onChange={setMatch401k} placeholder="2,400" />
              </CalculatorField>
              <CalculatorField label="Paid Time Off (days)" htmlFor="pto-days">
                <CalculatorInput id="pto-days" value={ptoDays} onChange={setPtoDays} placeholder="15" />
              </CalculatorField>
              <CalculatorField label="Estimated 1099 Business Expenses ($/year)" htmlFor="expenses">
                <CalculatorInput id="expenses" value={expenses} onChange={setExpenses} placeholder="3,000" />
              </CalculatorField>
            </div>

            {result && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
                  <h2 className="mb-4 text-lg font-semibold text-content-primary">W-2 Breakdown</h2>
                  <dl className="space-y-2 text-sm">
                    {[
                      ["Gross W-2 Salary", fmt(result.w2.grossSalary)],
                      ["Employee FICA (7.65%)", `−${fmt(result.w2.employeeFica)}`],
                      ["Federal Income Tax", `−${fmt(result.w2.federalIncomeTax)}`],
                      ["Employer FICA (hidden benefit)", fmt(result.w2.employerFica)],
                      ["Health Insurance Value", fmt(result.w2.healthInsuranceValue)],
                      ["401(k) Match Value", fmt(result.w2.employer401kMatch)],
                      ["PTO Cash Value", fmt(result.w2.ptoCashValue)],
                      ["Total Compensation Value", fmt(result.w2.totalCompensationValue)],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4">
                        <dt className="text-content-secondary">{label}</dt>
                        <dd className="font-medium text-content-primary">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4">
                    <ResultCard label="Estimated Monthly Take-Home" value={fmt(result.w2.monthlyTakeHome)} highlight />
                  </div>
                </div>
              </div>
            )}
          </div>

          {result && (
            <>
              <div className="mt-8 rounded-2xl border-2 border-brand-blue/40 bg-brand-blue/5 p-6 text-center">
                <p className="text-sm font-medium text-content-secondary">Minimum 1099 Annual Rate Needed</p>
                <p className="mt-2 text-3xl font-bold text-brand-blue sm:text-4xl">
                  {fmt(result.equivalent1099.minimum1099Rate)}
                </p>
                <p className="mt-2 text-content-secondary">
                  ≈ {formatCurrency(result.equivalent1099.hourlyRate, currency, 2)}/hour (2,080 hours/year)
                </p>
                <div className="mt-3 flex justify-center">
                  <CopyValueButton
                    value={String(Math.round(result.equivalent1099.minimum1099Rate))}
                    label="Minimum 1099 rate"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
                <h2 className="mb-4 text-lg font-semibold text-content-primary">1099 Equivalence Steps</h2>
                <dl className="space-y-2 text-sm">
                  {[
                    ["W-2 take-home target", fmt(result.equivalent1099.w2TakeHomeTarget)],
                    ["Benefits you now pay yourself", `+${fmt(result.equivalent1099.benefitsToSelfPay)}`],
                    ["Self-Employment Tax (15.3% on 92.35%)", `+${fmt(result.equivalent1099.seTaxAmount)}`],
                    ["50% SE tax deduction from AGI", `−${fmt(result.equivalent1099.seTaxDeduction)}`],
                    ["Business expense deductions", `−${fmt(result.equivalent1099.businessExpenseDeduction)}`],
                    ["QBI deduction (20%)", `−${fmt(result.equivalent1099.qbiDeduction)}`],
                    ["Federal income tax on 1099 income", fmt(result.equivalent1099.federalIncomeTax)],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-content-secondary">{label}</dt>
                      <dd className="font-medium text-content-primary">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 flex gap-3 rounded-xl border border-tool-photo/30 bg-tool-photo/10 p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-tool-photo" />
                <p className="text-sm text-content-primary">
                  <strong>Rule of thumb:</strong> A 1099 contractor typically needs to earn 25–40% more than their W-2 equivalent to match take-home pay, after self-employment taxes, benefits, and business expenses.
                </p>
              </div>

              <div className="mt-8 overflow-x-auto rounded-2xl border border-surface-border">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-surface-card">
                    <tr>
                      <th className="px-4 py-3 font-semibold" />
                      <th className="px-4 py-3 font-semibold">W-2 Employee</th>
                      <th className="px-4 py-3 font-semibold">1099 Contractor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map(([label, w2, c1099]) => (
                      <tr key={label} className="border-t border-surface-border">
                        <td className="px-4 py-3 text-content-secondary">{label}</td>
                        <td className="px-4 py-3">{w2}</td>
                        <td className="px-4 py-3">{c1099}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <p className="mt-8 text-center text-xs text-content-secondary">{US_TAX_DISCLAIMER}</p>

          <div className="mt-10">
            <RelatedTools currentSlug="w2-vs-1099-calculator" />
            <ToolSeoContent slug="w2-vs-1099-calculator" />
            <ToolFeedback toolName="W-2 vs 1099 Calculator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
