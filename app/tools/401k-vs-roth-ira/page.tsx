"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DollarSign, Lightbulb, Scale, TrendingUp } from "lucide-react";
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
  CalculatorSelect,
} from "@/components/calculator/CalculatorUi";
import {
  FEDERAL_TAX_BRACKETS,
  FOUR_OH_ONE_K_VS_ROTH_DISCLAIMER,
  LIMITS_2026,
  calculate401kVsRothIra,
  type FederalBracket,
} from "@/lib/401k-vs-roth-ira";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useUSRulesCurrency } from "@/lib/use-us-rules-currency";

const BRACKET_OPTIONS = FEDERAL_TAX_BRACKETS.map((b) => ({
  value: String(b),
  label: `${b}%`,
}));

export default function FourOhOneKVsRothIraPage() {
  const { currency } = useUSRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [annualContribution, setAnnualContribution] = useState("10000");
  const [currentBracket, setCurrentBracket] = useState<FederalBracket>(22);
  const [retirementBracket, setRetirementBracket] =
    useState<FederalBracket>(22);
  const [stateTaxRate, setStateTaxRate] = useState("5");
  const [expectedReturn, setExpectedReturn] = useState("7");

  const result = useMemo(
    () =>
      calculate401kVsRothIra({
        currentAge,
        retirementAge,
        annualContribution: parseNumberInput(annualContribution),
        currentFederalBracket: currentBracket,
        retirementFederalBracket: retirementBracket,
        stateTaxRate: parseNumberInput(stateTaxRate),
        expectedReturn: parseNumberInput(expectedReturn),
      }),
    [
      annualContribution,
      currentAge,
      currentBracket,
      expectedReturn,
      retirementAge,
      retirementBracket,
      stateTaxRate,
    ],
  );

  const scenarios = result
    ? [result.traditional, result.roth401k, result.rothIra]
    : [];

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Scale className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              401k vs Roth IRA Calculator 2026
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Compare Traditional 401k, Roth 401k, and Roth IRA side by side.
              See which wins based on your current vs retirement tax brackets.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="401k-vs-roth-ira" />
            </div>
          </div>

          <USRulesBadge toolSlug="401k-vs-roth-ira" />

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            2026 limits: 401k ${LIMITS_2026.fourOhOneK.toLocaleString("en-US")}{" "}
            (under 50) | IRA ${LIMITS_2026.ira.toLocaleString("en-US")} (under
            50). Contribution limit not enforced — enter any amount for
            planning purposes.
          </p>

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label={`Current Age — ${currentAge}`} htmlFor="age">
              <input
                id="age"
                type="range"
                min={18}
                max={64}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField
              label={`Retirement Age — ${retirementAge}`}
              htmlFor="retire"
            >
              <input
                id="retire"
                type="range"
                min={Math.max(currentAge + 1, 50)}
                max={75}
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label="Annual Contribution ($)" htmlFor="contrib">
              <CalculatorInput
                id="contrib"
                value={annualContribution}
                onChange={setAnnualContribution}
                placeholder="10,000"
              />
            </CalculatorField>

            <CalculatorField label="Current Federal Tax Bracket" htmlFor="cur-bracket">
              <CalculatorSelect
                id="cur-bracket"
                value={String(currentBracket)}
                onChange={(v) => setCurrentBracket(Number(v) as FederalBracket)}
                options={BRACKET_OPTIONS}
              />
            </CalculatorField>

            <CalculatorField
              label="Expected Retirement Tax Bracket"
              htmlFor="ret-bracket"
            >
              <CalculatorSelect
                id="ret-bracket"
                value={String(retirementBracket)}
                onChange={(v) =>
                  setRetirementBracket(Number(v) as FederalBracket)
                }
                options={BRACKET_OPTIONS}
              />
            </CalculatorField>

            <CalculatorField label="State Income Tax Rate (%)" htmlFor="state">
              <CalculatorInput
                id="state"
                value={stateTaxRate}
                onChange={setStateTaxRate}
                placeholder="5"
              />
            </CalculatorField>

            <CalculatorField label="Expected Annual Return (%)" htmlFor="return">
              <CalculatorInput
                id="return"
                value={expectedReturn}
                onChange={setExpectedReturn}
                placeholder="7"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-4xl space-y-6">
              <div
                className={`rounded-xl border px-4 py-4 text-center text-sm font-medium ${
                  result.verdict === "roth"
                    ? "border-green-500/30 bg-green-500/5 text-content-primary"
                    : result.verdict === "traditional"
                      ? "border-brand-blue/30 bg-brand-blue/5 text-content-primary"
                      : "border-amber-500/30 bg-amber-500/5 text-content-primary"
                }`}
              >
                {result.verdictMessage}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="bg-surface-elevated">
                    <tr>
                      <th className="px-3 py-2 text-left" />
                      {scenarios.map((s) => (
                        <th key={s.label} className="px-3 py-2 text-right">
                          {s.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: "Annual contribution",
                        get: (s: (typeof scenarios)[0]) =>
                          fmt(s.annualContribution),
                      },
                      {
                        label: "Tax saving today",
                        get: (s: (typeof scenarios)[0]) =>
                          fmt(s.taxSavingToday),
                      },
                      {
                        label: "Net annual cost",
                        get: (s: (typeof scenarios)[0]) =>
                          fmt(s.netAnnualCost),
                      },
                      {
                        label: "Future balance",
                        get: (s: (typeof scenarios)[0]) =>
                          fmt(s.futureBalance),
                      },
                      {
                        label: "Tax on withdrawal",
                        get: (s: (typeof scenarios)[0]) =>
                          fmt(s.taxOnWithdrawal),
                      },
                      {
                        label: "Net retirement money",
                        get: (s: (typeof scenarios)[0]) => (
                          <strong>{fmt(s.netRetirementMoney)}</strong>
                        ),
                        highlight: true,
                      },
                      {
                        label: "RMDs required?",
                        get: (s: (typeof scenarios)[0]) =>
                          s.rmdsRequired ? "Yes (age 73)" : "❌ No",
                      },
                    ].map((row) => (
                      <tr
                        key={row.label}
                        className={`border-t border-surface-border ${row.highlight ? "bg-brand-blue/5" : ""}`}
                      >
                        <td className="px-3 py-2 text-content-secondary">
                          {row.label}
                        </td>
                        {scenarios.map((s) => (
                          <td
                            key={s.label}
                            className="px-3 py-2 text-right font-medium"
                          >
                            {row.get(s)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-center text-sm text-content-muted">
                Combined rate: {result.currentCombinedRate}% now →{" "}
                {result.retirementCombinedRate}% at retirement
                <CopyValueButton
                  value={fmt(result.traditional.netRetirementMoney)}
                  label="Copy Traditional net"
                  className="ml-2"
                />
              </p>

              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                <Lightbulb className="mb-1 inline h-4 w-4" /> Roth 401k
                eliminated Required Minimum Distributions in 2024 (SECURE 2.0).
                Your Roth 401k can continue growing tax-free without forced
                withdrawals at age 73.
              </div>

              <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-content-secondary">
                ⚠️ Roth IRA income limit 2026: $168,000 (single) / $252,000
                (MFJ). If above, you may need a Backdoor Roth strategy.
              </p>
            </div>
          )}

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            {FOUR_OH_ONE_K_VS_ROTH_DISCLAIMER}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Scale, title: "3 scenarios", desc: "Traditional, Roth 401k, Roth IRA" },
              { icon: TrendingUp, title: "Tax bracket", desc: "Dynamic verdict box" },
              { icon: DollarSign, title: "No RMDs", desc: "Roth 401k since 2024" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-brand-blue" />
                <p className="mt-2 font-semibold text-content-primary">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="401k-vs-roth-ira" />
          <ToolFeedback toolName="401k vs Roth IRA Calculator" />
          <ToolSeoContent slug="401k-vs-roth-ira" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
