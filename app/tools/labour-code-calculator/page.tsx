"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Scale, TrendingDown, TrendingUp, Wallet } from "lucide-react";
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
  calculateLabourCodeImpact,
  type CityType,
  type PfPreference,
} from "@/lib/labour-code-calculator";
import {
  formatCurrency,
  formatIndianCompact,
  parseNumberInput,
} from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

function fmtMonthly(value: number, currency: "INR") {
  return formatCurrency(value, currency, 0);
}

export default function LabourCodeCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const [annualCtc, setAnnualCtc] = useState("1000000");
  const [basicPercent, setBasicPercent] = useState(30);
  const [cityType, setCityType] = useState<CityType>("non-metro");
  const [pfPreference, setPfPreference] = useState<PfPreference>("standard");

  const result = useMemo(
    () =>
      calculateLabourCodeImpact({
        annualCtc: parseNumberInput(annualCtc),
        currentBasicPercent: basicPercent,
        cityType,
        pfPreference,
      }),
    [annualCtc, basicPercent, cityType, pfPreference],
  );

  const rows = result
    ? [
        { label: "Basic Salary (monthly)", key: "basicMonthly" as const },
        { label: "HRA (monthly)", key: "hraMonthly" as const },
        { label: "Special Allowance (monthly)", key: "specialAllowanceMonthly" as const },
        { label: "Employee PF (monthly)", key: "employeePfMonthly" as const },
        { label: "Take-Home Salary (monthly)", key: "takeHomeMonthly" as const },
      ]
    : [];

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <Scale className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              New Labour Code 2026 Salary Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Compare your current salary structure with the New Labour Code 50%
              basic rule — see take-home, PF, and gratuity impact in real time.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="labour-code-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="labour-code-calculator" />

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Annual CTC (₹)" htmlFor="annual-ctc">
              <CalculatorInput
                id="annual-ctc"
                value={annualCtc}
                onChange={setAnnualCtc}
                placeholder="10,00,000"
              />
              {parseNumberInput(annualCtc) >= 100_000 && (
                <p className="mt-1 text-xs text-content-muted">
                  {formatIndianCompact(parseNumberInput(annualCtc))} per year
                </p>
              )}
            </CalculatorField>

            <CalculatorField
              label={`Current Basic Salary — ${basicPercent}% of CTC`}
              htmlFor="basic-percent"
            >
              <input
                id="basic-percent"
                type="range"
                min={20}
                max={60}
                value={basicPercent}
                onChange={(e) => setBasicPercent(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
              <div className="mt-1 flex justify-between text-xs text-content-muted">
                <span>20%</span>
                <span>60%</span>
              </div>
            </CalculatorField>

            <CalculatorField label="City Type (HRA rate)" htmlFor="city-type">
              <ToggleButtonGroup
                value={cityType}
                onChange={setCityType}
                ariaLabel="City type"
                options={[
                  { value: "metro" as const, label: "Metro (50% HRA)" },
                  { value: "non-metro" as const, label: "Non-Metro (40%)" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="PF Preference" htmlFor="pf-pref">
              <ToggleButtonGroup
                value={pfPreference}
                onChange={setPfPreference}
                ariaLabel="PF preference"
                options={[
                  { value: "standard" as const, label: "Standard (₹1,800/mo cap)" },
                  { value: "full" as const, label: "Full (12% uncapped)" },
                ]}
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-8">
              <div className="overflow-x-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="bg-surface-elevated text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium text-content-secondary">Component</th>
                      <th className="px-4 py-3 font-medium text-content-secondary">Current Structure</th>
                      <th className="px-4 py-3 font-medium text-content-secondary">After Labour Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.label} className="border-t border-surface-border">
                        <td className="px-4 py-3 text-content-primary">{row.label}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-content-primary">
                              {fmtMonthly(result.current[row.key], currency)}
                            </span>
                            <CopyValueButton
                              value={fmtMonthly(result.current[row.key], currency)}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-content-primary">
                              {fmtMonthly(result.afterCode[row.key], currency)}
                            </span>
                            <CopyValueButton
                              value={fmtMonthly(result.afterCode[row.key], currency)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Take-home change / month"
                  value={`${result.takeHomeChangeMonthly >= 0 ? "+" : ""}${fmtMonthly(result.takeHomeChangeMonthly, currency)}`}
                  highlight
                />
                <ResultCard
                  label="PF corpus change / year"
                  value={`+${fmtMonthly(result.pfCorpusIncreaseAnnual, currency)}`}
                />
                <ResultCard
                  label="Gratuity accrual change / month"
                  value={`+${fmtMonthly(result.gratuityAccrualIncreaseMonthly, currency)}`}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5 text-sm text-content-secondary">
                <p className="font-medium text-content-primary">What does this mean?</p>
                <p className="mt-2">
                  Your total CTC stays the same. Under the New Labour Code, a higher basic
                  means more PF and gratuity — building your long-term savings — while
                  take-home may reduce slightly. This is the trade-off: less cash today,
                  more retirement wealth tomorrow.
                </p>
                <p className="mt-3 text-xs text-content-muted">
                  This is an estimate. Actual numbers depend on your employer&apos;s exact
                  restructuring, state minimum wages, PF ceiling applicability, and other
                  allowances. Verify with your HR/payroll team.
                </p>
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Wallet, title: "Enter CTC", description: "Annual CTC and current basic %" },
                { step: "02", icon: TrendingUp, title: "Apply 50% rule", description: "New basic = max(50% of CTC, ₹1.5L floor)" },
                { step: "03", icon: TrendingDown, title: "Compare impact", description: "See take-home vs PF/gratuity change" },
              ].map((item) => (
                <div key={item.step} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <p className="text-2xl font-bold text-content-muted/40">{item.step}</p>
                  <item.icon className="mt-2 h-5 w-5 text-tool-convert" />
                  <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="labour-code-calculator" />
          <ToolFeedback toolName="Labour Code Calculator" />
          <ToolSeoContent slug="labour-code-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
