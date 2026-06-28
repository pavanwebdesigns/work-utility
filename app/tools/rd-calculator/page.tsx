"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Landmark, PiggyBank } from "lucide-react";
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
} from "@/components/calculator/CalculatorUi";
import { calculateRd } from "@/lib/rd-calculator";
import {
  formatCurrency,
  formatIndianCompact,
  parseNumberInput,
} from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

function formatTenure(months: number): string {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${months} months`;
  if (rem === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years}y ${rem}m`;
}

export default function RdCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [interestRate, setInterestRate] = useState("7.0");
  const [tenureMonths, setTenureMonths] = useState(24);

  const result = useMemo(
    () =>
      calculateRd(
        monthlyDeposit,
        parseNumberInput(interestRate),
        tenureMonths,
      ),
    [interestRate, monthlyDeposit, tenureMonths],
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
              <PiggyBank className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              RD Calculator India — Recurring Deposit Returns
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate recurring deposit maturity with quarterly compounding,
              year-by-year breakdown, TDS notes, and RD vs FD comparison.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="rd-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="rd-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField
              label={`Monthly Deposit (₹500 – ₹1,00,000) — ${monthlyDeposit.toLocaleString("en-IN")}`}
              htmlFor="monthly-deposit"
            >
              <input
                id="monthly-deposit"
                type="range"
                min={500}
                max={100000}
                step={500}
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label="Annual Interest Rate (% p.a.)" htmlFor="rate">
              <CalculatorInput
                id="rate"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="7.0"
              />
            </CalculatorField>

            <CalculatorField
              label={`Tenure — ${formatTenure(tenureMonths)}`}
              htmlFor="tenure"
            >
              <input
                id="tenure"
                type="range"
                min={3}
                max={120}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard label="Total Deposited" value={fmt(result.totalDeposited)} />
                <ResultCard label="Interest Earned" value={fmt(result.interestEarned)} />
                <ResultCard label="Maturity Value" value={fmt(result.maturityValue)} highlight />
              </div>
              <p className="text-center text-sm text-content-muted">
                Maturity: {formatIndianCompact(result.maturityValue)}
                <CopyValueButton
                  value={fmt(result.maturityValue)}
                  label="Copy"
                  className="ml-2"
                />
              </p>

              <div className="rounded-xl border border-tool-photo/30 bg-tool-photo/5 px-4 py-3 text-sm text-content-secondary">
                <strong>TDS note:</strong> If your total interest across all bank
                accounts exceeds ₹40,000 in a year (₹50,000 for senior citizens),
                the bank deducts 10% TDS on RD interest. Submit Form 15G/15H if
                your income is below the taxable limit.
              </div>

              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                💡 If you invested the same total amount ({fmt(result.fdComparison.lumpSum)})
                as a lump sum FD at the same rate, maturity would be{" "}
                {fmt(result.fdComparison.fdMaturity)}. RD{" "}
                {result.fdComparison.rdBetter ? "gives more" : "gives less"} because
                deposits are spread over time (difference:{" "}
                {fmt(result.fdComparison.difference)}).
              </div>

              <div className="max-h-80 overflow-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-surface-elevated">
                    <tr>
                      <th className="px-4 py-2 text-left">Period</th>
                      <th className="px-4 py-2 text-right">Deposited</th>
                      <th className="px-4 py-2 text-right">Interest</th>
                      <th className="px-4 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.periodRows.map((row) => (
                      <tr key={row.period} className="border-t border-surface-border">
                        <td className="px-4 py-2">{row.label}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.deposited)}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.interest)}</td>
                        <td className="px-4 py-2 text-right font-medium">
                          {fmt(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary">
            <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-tool-photo" />
            <p>
              RD rates vary by bank and tenure — SBI typically offers 6.5–7.0%,
              HDFC 7.0–7.4% (June 2026). Verify current rates before opening an
              account.
            </p>
          </div>

          <div className="mt-10">
            <RelatedTools currentSlug="rd-calculator" />
            <ToolSeoContent slug="rd-calculator" />
            <ToolFeedback toolName="RD Calculator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
