"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Landmark, PiggyBank, Shield } from "lucide-react";
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
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  PPF_DEFAULT_RATE,
  calculatePpf,
  type PpfFrequency,
} from "@/lib/ppf-calculator";
import {
  formatCurrency,
  formatIndianCompact,
  parseNumberInput,
} from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function PpfCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [annualInvestment, setAnnualInvestment] = useState("150000");
  const [frequency, setFrequency] = useState<PpfFrequency>("yearly");
  const [interestRate, setInterestRate] = useState(String(PPF_DEFAULT_RATE));
  const [tenureYears, setTenureYears] = useState(15);

  const result = useMemo(
    () =>
      calculatePpf(
        parseNumberInput(annualInvestment),
        tenureYears,
        parseNumberInput(interestRate),
      ),
    [annualInvestment, interestRate, tenureYears],
  );

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <PiggyBank className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              PPF Calculator India — Maturity & Returns
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate Public Provident Fund maturity with year-by-year breakdown,
              withdrawal rules, and loan eligibility at 7.1% rate.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="ppf-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="ppf-calculator" />

          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-content-secondary">
            🏆 PPF is Exempt-Exempt-Exempt (EEE): 80C deductible, interest tax-free, maturity tax-free (80C under old regime).
          </div>

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label={`Annual Investment (₹500 – ₹1,50,000) — ${parseNumberInput(annualInvestment).toLocaleString("en-IN")}`} htmlFor="investment">
              <input
                id="investment"
                type="range"
                min={500}
                max={150000}
                step={500}
                value={Math.min(150000, Math.max(500, parseNumberInput(annualInvestment) || 150000))}
                onChange={(e) => setAnnualInvestment(e.target.value)}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label="Investment Frequency" htmlFor="freq">
              <ToggleButtonGroup
                value={frequency}
                onChange={setFrequency}
                ariaLabel="Investment frequency"
                options={[
                  { value: "yearly" as const, label: "Yearly" },
                  { value: "monthly" as const, label: "Monthly (same total/year)" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="Interest Rate (% p.a.)" htmlFor="rate">
              <CalculatorInput id="rate" value={interestRate} onChange={setInterestRate} placeholder="7.1" />
            </CalculatorField>

            <CalculatorField label={`Tenure — ${tenureYears} years`} htmlFor="tenure">
              <input
                id="tenure"
                type="range"
                min={15}
                max={50}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ResultCard label="Total Invested" value={fmt(result.totalInvested)} />
                <ResultCard label="Interest Earned" value={fmt(result.totalInterest)} />
                <ResultCard label="Maturity Value" value={fmt(result.maturityValue)} highlight />
                <ResultCard label="≈ Tax saved (30% slab)" value={fmt(result.estimatedTaxSaved)} />
              </div>
              <p className="text-center text-sm text-content-muted">
                Maturity: {formatIndianCompact(result.maturityValue)}
                <CopyValueButton value={fmt(result.maturityValue)} label="Copy" className="ml-2" />
              </p>

              <div className="max-h-80 overflow-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-surface-elevated">
                    <tr>
                      <th className="px-4 py-2 text-left">Year</th>
                      <th className="px-4 py-2 text-right">Investment</th>
                      <th className="px-4 py-2 text-right">Interest</th>
                      <th className="px-4 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearRows.map((row) => (
                      <tr key={row.year} className="border-t border-surface-border">
                        <td className="px-4 py-2">{row.year}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.investment)}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.interest)}</td>
                        <td className="px-4 py-2 text-right font-medium">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 text-sm text-content-secondary">
                <p>
                  <strong>Partial withdrawal:</strong> From Year {result.partialWithdrawalEligibleFromYear} ({result.partialWithdrawalEligibleFy}), withdraw up to 50% of balance at end of Year 4 — once per financial year.
                </p>
                <p>
                  <strong>Loan against PPF:</strong> Between Year {result.loanEligibleFromYear} and Year {result.loanEligibleUntilYear} ({result.loanEligibleFromFy} to {result.loanEligibleUntilFy}), borrow up to 25% of balance at end of Year 2.
                </p>
                {result.extensionBlocks > 0 && (
                  <p>
                    <strong>Extensions:</strong> You are extending PPF in {result.extensionBlocks} block(s) of 5 years after the initial 15-year period.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: PiggyBank, title: "Year-by-year", desc: "Full balance table each year" },
              { icon: Shield, title: "EEE status", desc: "Tax-free interest and maturity" },
              { icon: Landmark, title: "Govt backed", desc: "7.1% Q2 FY2026-27 rate" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                <item.icon className="h-5 w-5 text-tool-photo" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="ppf-calculator" />
          <ToolFeedback toolName="PPF Calculator" />
          <ToolSeoContent slug="ppf-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
