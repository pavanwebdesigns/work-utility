"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, Shield, Stethoscope } from "lucide-react";
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
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  HSA_DISCLAIMER,
  HSA_FEDERAL_BRACKETS,
  HSA_LIMITS_2026,
  calculateHsa,
  type HsaCoverageType,
} from "@/lib/hsa-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useUSRulesCurrency } from "@/lib/use-us-rules-currency";

const BRACKET_OPTIONS = HSA_FEDERAL_BRACKETS.map((b) => ({
  value: String(b),
  label: `${b}%`,
}));

export default function HsaCalculatorPage() {
  const { currency } = useUSRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [coverageType, setCoverageType] = useState<HsaCoverageType>("individual");
  const [currentAge, setCurrentAge] = useState(35);
  const [contribution, setContribution] = useState("4300");
  const [federalBracket, setFederalBracket] = useState(22);
  const [stateTaxRate, setStateTaxRate] = useState("5");
  const [expectedReturn, setExpectedReturn] = useState("6");

  const result = useMemo(
    () =>
      calculateHsa({
        coverageType,
        currentAge,
        contribution: parseNumberInput(contribution),
        federalBracket,
        stateTaxRate: parseNumberInput(stateTaxRate),
        expectedReturn: parseNumberInput(expectedReturn),
      }),
    [contribution, coverageType, currentAge, expectedReturn, federalBracket, stateTaxRate],
  );

  const limitLabel =
    coverageType === "individual"
      ? HSA_LIMITS_2026.individual
      : HSA_LIMITS_2026.family;

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
              <Stethoscope className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              HSA Calculator 2026
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate HSA contribution limits, tax savings, and projected retirement balance with triple tax advantage.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="hsa-calculator" />
            </div>
          </div>

          <USRulesBadge toolSlug="hsa-calculator" />

          <p className="mx-auto mt-4 max-w-xl text-center text-xs text-content-muted">
            2026 IRS limit: ${HSA_LIMITS_2026.individual.toLocaleString("en-US")} (individual) / ${HSA_LIMITS_2026.family.toLocaleString("en-US")} (family). Age 55+: +$1,000 catch-up.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <ToggleButtonGroup
              value={coverageType}
              onChange={setCoverageType}
              ariaLabel="HSA coverage type"
              options={[
                { value: "individual", label: "Individual" },
                { value: "family", label: "Family" },
              ]}
            />
          </div>

          <div className="mx-auto mt-6 max-w-xl space-y-5">
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
            <CalculatorField label={`Annual HSA Contribution ($) — max $${limitLabel.toLocaleString("en-US")}`} htmlFor="contrib">
              <CalculatorInput id="contrib" value={contribution} onChange={setContribution} placeholder="4,300" />
            </CalculatorField>
            <CalculatorField label="Federal Tax Bracket" htmlFor="federal">
              <CalculatorSelect
                id="federal"
                value={String(federalBracket)}
                onChange={(v) => setFederalBracket(Number(v))}
                options={BRACKET_OPTIONS}
              />
            </CalculatorField>
            <CalculatorField label="State Tax Rate (%)" htmlFor="state">
              <CalculatorInput id="state" value={stateTaxRate} onChange={setStateTaxRate} placeholder="5" />
            </CalculatorField>
            <CalculatorField label="Expected Annual Return (%)" htmlFor="return">
              <CalculatorInput id="return" value={expectedReturn} onChange={setExpectedReturn} placeholder="6" />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label="2026 Contribution Room" value={fmt(result.maxContribution)} />
                <ResultCard label="Remaining Room" value={fmt(result.remainingRoom)} />
                <ResultCard label="Total Annual Tax Savings" value={fmt(result.totalTaxSavings)} highlight />
                <ResultCard label="Effective Cost" value={fmt(result.effectiveCost)} />
                <ResultCard label="Federal Tax Savings" value={fmt(result.federalTaxSavings)} />
                <ResultCard label="State Tax Savings" value={fmt(result.stateTaxSavings)} />
                <ResultCard
                  label="Projected HSA at Retirement"
                  value={fmt(result.projectedBalance)}
                  highlight
                />
                <ResultCard
                  label="Monthly Healthcare Budget (est.)"
                  value={fmt(result.monthlyHealthcareBudget)}
                />
              </div>
              {result.catchUpEligible && (
                <p className="text-center text-sm text-content-muted">
                  Catch-up eligible: +${HSA_LIMITS_2026.catchUp.toLocaleString("en-US")} allowed at age 55+
                </p>
              )}
              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                <p className="font-medium text-content-primary">🏥 HSA&apos;s Triple Tax Advantage:</p>
                <ol className="mt-2 list-inside list-decimal space-y-1">
                  <li>Tax-free contributions — saves {fmt(result.totalTaxSavings)}/year</li>
                  <li>Tax-free growth — no capital gains inside HSA</li>
                  <li>Tax-free withdrawals for qualified medical expenses</li>
                </ol>
                <p className="mt-2">After age 65: withdraw for any purpose — taxed like Traditional IRA (no penalty).</p>
              </div>
              <CopyValueButton value={fmt(result.projectedBalance)} label="Copy projected balance" className="mx-auto flex" />
            </div>
          )}

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            ⚠️ California and New Jersey do NOT recognize HSA state tax benefits — state income tax still applies if you live in CA or NJ.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-center text-xs text-content-muted">{HSA_DISCLAIMER}</p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Stethoscope, title: "2026 limits", desc: "$4,300 / $8,550" },
              { icon: Shield, title: "Triple tax", desc: "Contribute, grow, withdraw" },
              { icon: Heart, title: "HDHP required", desc: "Qualifying plan needed" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                <item.icon className="h-5 w-5 text-brand-blue" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="hsa-calculator" />
          <ToolFeedback toolName="HSA Calculator" />
          <ToolSeoContent slug="hsa-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
