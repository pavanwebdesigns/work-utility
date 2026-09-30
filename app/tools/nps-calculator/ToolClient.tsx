"use client";

import { useMemo, useState } from "react";
import { Landmark } from "lucide-react";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import {
  NPS_DISCLAIMER,
  calculateNps,
} from "@/lib/nps-calculator";
import {
  formatCurrency,
  formatIndianCompact,
  parseNumberInput,
} from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function NpsCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [expectedReturn, setExpectedReturn] = useState("10");
  const [annuityPercent, setAnnuityPercent] = useState(40);
  const [annuityRate, setAnnuityRate] = useState("6");
  const [showAllYears, setShowAllYears] = useState(false);

  const result = useMemo(
    () =>
      calculateNps(
        monthlyContribution,
        currentAge,
        parseNumberInput(expectedReturn),
        annuityPercent,
        parseNumberInput(annuityRate),
      ),
    [annuityPercent, annuityRate, currentAge, expectedReturn, monthlyContribution],
  );

  const visibleRows = showAllYears
    ? result?.yearRows ?? []
    : (result?.yearRows ?? []).slice(0, 10);

  return (
    <>
<IndiaRulesBadge toolSlug="nps-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField
              label={`Monthly Contribution (₹500 – ₹50,000) — ${monthlyContribution.toLocaleString("en-IN")}`}
              htmlFor="monthly"
            >
              <input
                id="monthly"
                type="range"
                min={500}
                max={50000}
                step={500}
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label={`Current Age — ${currentAge} years`} htmlFor="age">
              <input
                id="age"
                type="range"
                min={18}
                max={59}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <div className="rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary">
              Retirement age: <strong>60 years</strong> (NPS standard exit age)
            </div>

            <CalculatorField
              label={`Expected Annual Return — ${expectedReturn}%`}
              htmlFor="return"
            >
              <input
                id="return"
                type="range"
                min={8}
                max={14}
                step={0.5}
                value={parseNumberInput(expectedReturn) || 10}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField
              label={`Annuity Percentage — ${annuityPercent}% (min 40% mandatory)`}
              htmlFor="annuity-pct"
            >
              <input
                id="annuity-pct"
                type="range"
                min={40}
                max={100}
                value={annuityPercent}
                onChange={(e) => setAnnuityPercent(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label="Expected Annuity Rate (% p.a.)" htmlFor="annuity-rate">
              <CalculatorInput
                id="annuity-rate"
                value={annuityRate}
                onChange={setAnnuityRate}
                placeholder="6"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard label="Total Invested" value={fmt(result.totalInvested)} />
                <ResultCard label="NPS Corpus at Retirement" value={fmt(result.corpus)} highlight />
                <ResultCard label="Lump Sum (tax-free up to 60%)" value={fmt(result.lumpSumWithdrawal)} />
                <ResultCard label="Annuity Corpus" value={fmt(result.annuityCorpus)} />
                <ResultCard
                  label="Estimated Monthly Pension"
                  value={`${fmt(result.monthlyPension)}/mo`}
                  highlight
                />
              </div>
              <p className="text-center text-sm text-content-muted">
                Corpus: {formatIndianCompact(result.corpus)}
                <CopyValueButton value={fmt(result.corpus)} label="Copy" className="ml-2" />
              </p>

              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-4 text-sm text-content-secondary">
                <p className="font-semibold text-content-primary">
                  📊 Annual Tax Savings from NPS Contributions (Old Regime, 30% slab)
                </p>
                <ul className="mt-2 space-y-1">
                  <li>
                    80CCD(1) deduction (up to ₹1.5L): saves{" "}
                    <strong>{fmt(result.taxSavings.taxSavedCcd1At30)}/year</strong>
                  </li>
                  <li>
                    80CCD(1B) extra deduction (up to ₹50,000): saves{" "}
                    <strong>{fmt(result.taxSavings.taxSavedCcd1bAt30)}/year</strong>
                  </li>
                  <li>
                    Total estimated tax savings:{" "}
                    <strong>{fmt(result.taxSavings.totalTaxSavedAt30)}/year</strong>
                  </li>
                </ul>
                <p className="mt-3 rounded-lg border border-tool-photo/30 bg-tool-photo/5 px-3 py-2 text-xs">
                  ⚠️ Under the new tax regime, only your employer&apos;s NPS contribution
                  (Sec 80CCD(2)) is deductible — not your own contribution.
                </p>
              </div>

              <div className="max-h-96 overflow-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-surface-elevated">
                    <tr>
                      <th className="px-4 py-2 text-left">Year</th>
                      <th className="px-4 py-2 text-left">Age</th>
                      <th className="px-4 py-2 text-right">Invested</th>
                      <th className="px-4 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row) => (
                      <tr key={row.year} className="border-t border-surface-border">
                        <td className="px-4 py-2">{row.year}</td>
                        <td className="px-4 py-2">{row.age}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.invested)}</td>
                        <td className="px-4 py-2 text-right font-medium">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(result.yearRows.length ?? 0) > 10 && (
                <button
                  type="button"
                  onClick={() => setShowAllYears((v) => !v)}
                  className="mx-auto block text-sm text-brand-blue hover:underline"
                >
                  {showAllYears ? "Show less" : `Show all ${result.yearRows.length} years`}
                </button>
              )}
            </div>
          )}

          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary">
            <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-tool-photo" />
            <p>{NPS_DISCLAIMER}</p>
          </div>

          <div className="mt-10">
            
            
            
            
          </div>
    </>
  );
}

