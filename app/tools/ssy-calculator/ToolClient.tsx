"use client";

import { useMemo, useState } from "react";
import { Award, GraduationCap, Shield } from "lucide-react";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import {
  SSY_DEFAULT_RATE,
  SSY_DISCLAIMER,
  SSY_MAX_GIRL_AGE,
  SSY_MAX_INVESTMENT,
  SSY_MIN_INVESTMENT,
  calculateSsy,
} from "@/lib/ssy-calculator";
import {
  formatCurrency,
  formatIndianCompact,
  parseNumberInput,
} from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function SsyCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [annualInvestment, setAnnualInvestment] = useState(SSY_MAX_INVESTMENT);
  const [girlAge, setGirlAge] = useState(3);
  const [interestRate, setInterestRate] = useState(String(SSY_DEFAULT_RATE));

  const result = useMemo(
    () =>
      calculateSsy(
        annualInvestment,
        girlAge,
        parseNumberInput(interestRate),
      ),
    [annualInvestment, girlAge, interestRate],
  );

  return (
    <>
<IndiaRulesBadge toolSlug="ssy-calculator" />

          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-content-secondary">
            🏆 SSY offers EEE tax status: Investment deductible under 80C (up to ₹1.5L),
            interest earned is tax-free, maturity amount is tax-free.
          </div>

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField
              label={`Annual Investment (₹${SSY_MIN_INVESTMENT.toLocaleString("en-IN")} – ₹${SSY_MAX_INVESTMENT.toLocaleString("en-IN")}) — ${annualInvestment.toLocaleString("en-IN")}`}
              htmlFor="investment"
            >
              <input
                id="investment"
                type="range"
                min={SSY_MIN_INVESTMENT}
                max={SSY_MAX_INVESTMENT}
                step={250}
                value={annualInvestment}
                onChange={(e) => setAnnualInvestment(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField
              label={`Girl Child's Current Age (0–${SSY_MAX_GIRL_AGE}) — ${girlAge} years`}
              htmlFor="girl-age"
            >
              <input
                id="girl-age"
                type="range"
                min={0}
                max={SSY_MAX_GIRL_AGE}
                value={girlAge}
                onChange={(e) => setGirlAge(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label="Current SSY Interest Rate (%)" htmlFor="rate">
              <CalculatorInput
                id="rate"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="8.2"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-3 text-center text-sm text-content-secondary sm:grid-cols-2">
                <p>Account opened: <strong>{result.accountOpenYear}</strong></p>
                <p>Deposits end: <strong>{result.depositEndYear}</strong></p>
                <p>Partial withdrawal: <strong>{result.partialWithdrawalYear}</strong> (age 18)</p>
                <p>Maturity: <strong>{result.maturityYear}</strong> (21 years)</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard label="Total Deposited" value={fmt(result.totalDeposited)} />
                <ResultCard label="Total Interest" value={fmt(result.totalInterest)} />
                <ResultCard
                  label="Maturity Amount"
                  value={fmt(result.maturityAmount)}
                  highlight
                />
                <ResultCard
                  label="Partial Withdrawal (at 18)"
                  value={fmt(result.partialWithdrawalAmount)}
                />
                <ResultCard
                  label="Maturity Date"
                  value={String(result.maturityYear)}
                />
              </div>

              <p className="text-center text-sm text-content-muted">
                {formatIndianCompact(result.maturityAmount)}
                <CopyValueButton
                  value={fmt(result.maturityAmount)}
                  label="Copy"
                  className="ml-2"
                />
              </p>

              <div className="max-h-96 overflow-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-surface-elevated">
                    <tr>
                      <th className="px-4 py-2 text-left">Year</th>
                      <th className="px-4 py-2 text-left">Girl&apos;s Age</th>
                      <th className="px-4 py-2 text-right">Deposit</th>
                      <th className="px-4 py-2 text-right">Interest</th>
                      <th className="px-4 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearRows.map((row) => (
                      <tr
                        key={row.year}
                        className={`border-t border-surface-border ${row.girlAge === 18 ? "bg-tool-convert/5" : ""}`}
                      >
                        <td className="px-4 py-2">{row.year}</td>
                        <td className="px-4 py-2">{row.girlAge}</td>
                        <td className="px-4 py-2 text-right">
                          {row.deposit > 0 ? fmt(row.deposit) : "—"}
                        </td>
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

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            {SSY_DISCLAIMER}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Award, title: "8.2% rate", desc: "Q1 FY2026-27 government rate" },
              { icon: GraduationCap, title: "Withdraw at 18", desc: "50% for higher education" },
              { icon: Shield, title: "EEE status", desc: "Tax-free investment & returns" },
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
    </>
  );
}

