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
  CalculatorField,
  CalculatorInput,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import {
  FOUR_OH_ONE_K_DISCLAIMER,
  calculate401k,
} from "@/lib/401k-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useUSRulesCurrency } from "@/lib/use-us-rules-currency";

export default function FourOhOneKCalculatorPage() {
  const { currency } = useUSRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(67);
  const [currentBalance, setCurrentBalance] = useState("0");
  const [annualSalary, setAnnualSalary] = useState("75000");
  const [contributionRate, setContributionRate] = useState(10);
  const [employerMatchEnabled, setEmployerMatchEnabled] = useState(true);
  const [employerMatchPercent, setEmployerMatchPercent] = useState("50");
  const [employerMatchUpTo, setEmployerMatchUpTo] = useState("6");
  const [expectedReturn, setExpectedReturn] = useState("7");

  const salary = parseNumberInput(annualSalary);
  const employeeAnnual = salary * (contributionRate / 100);
  const monthlyEmployee = employeeAnnual / 12;

  const result = useMemo(
    () =>
      calculate401k({
        currentAge,
        retirementAge,
        currentBalance: parseNumberInput(currentBalance),
        annualSalary: salary,
        contributionRatePercent: contributionRate,
        employerMatchEnabled,
        employerMatchPercent: parseNumberInput(employerMatchPercent),
        employerMatchUpToPercent: parseNumberInput(employerMatchUpTo),
        expectedReturnPercent: parseNumberInput(expectedReturn),
      }),
    [
      contributionRate,
      currentAge,
      currentBalance,
      employerMatchEnabled,
      employerMatchPercent,
      employerMatchUpTo,
      expectedReturn,
      retirementAge,
      salary,
    ],
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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <DollarSign className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              401k Calculator 2026 — Retirement Savings Projector
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Project your 401k balance at retirement with 2026 IRS limits,
              employer match impact, and year-by-year growth table.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="401k-calculator" />
            </div>
          </div>

          <USRulesBadge toolSlug="401k-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label={`Current Age — ${currentAge}`} htmlFor="current-age">
              <input
                id="current-age"
                type="range"
                min={22}
                max={70}
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label={`Retirement Age — ${retirementAge}`} htmlFor="retire-age">
              <input
                id="retire-age"
                type="range"
                min={55}
                max={75}
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label="Current 401k Balance ($)" htmlFor="balance">
              <CalculatorInput id="balance" value={currentBalance} onChange={setCurrentBalance} placeholder="0" />
            </CalculatorField>

            <CalculatorField label="Annual Salary ($)" htmlFor="salary">
              <CalculatorInput id="salary" value={annualSalary} onChange={setAnnualSalary} placeholder="75000" />
            </CalculatorField>

            <CalculatorField
              label={`Contribution Rate — ${contributionRate}% = ${fmt(employeeAnnual)}/year = ${fmt(monthlyEmployee)}/month`}
              htmlFor="contrib-rate"
            >
              <input
                id="contrib-rate"
                type="range"
                min={1}
                max={100}
                value={contributionRate}
                onChange={(e) => setContributionRate(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <div className="rounded-xl border border-surface-border bg-surface-card p-4 space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-content-primary">
                <input
                  type="checkbox"
                  checked={employerMatchEnabled}
                  onChange={(e) => setEmployerMatchEnabled(e.target.checked)}
                  className="accent-brand-blue"
                />
                Employer Match
              </label>
              {employerMatchEnabled && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <CalculatorField label="Match %" htmlFor="match-pct">
                    <CalculatorInput
                      id="match-pct"
                      value={employerMatchPercent}
                      onChange={setEmployerMatchPercent}
                      placeholder="50"
                    />
                  </CalculatorField>
                  <CalculatorField label="Match up to (% of salary)" htmlFor="match-up-to">
                    <CalculatorInput
                      id="match-up-to"
                      value={employerMatchUpTo}
                      onChange={setEmployerMatchUpTo}
                      placeholder="6"
                    />
                  </CalculatorField>
                </div>
              )}
            </div>

            <CalculatorField label="Expected Annual Return (%)" htmlFor="return">
              <CalculatorInput id="return" value={expectedReturn} onChange={setExpectedReturn} placeholder="7" />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-2 text-center text-sm text-content-primary">
                2026 IRS limit for your age: <strong>{fmt(result.irsLimit)}</strong>
              </div>

              {result.contributionCapped && (
                <div className="flex items-start gap-2 rounded-xl border border-tool-photo/30 bg-tool-photo/10 px-4 py-3 text-sm text-content-primary">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    ⚠️ Contribution capped at 2026 IRS limit ({fmt(result.irsLimit)}).
                    Your desired contribution was {fmt(result.employeeAnnualContribution)}/year.
                  </p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label="Projected Balance at Retirement" value={fmt(result.projectedBalance)} highlight />
                <ResultCard label="Est. Monthly Income (4% rule)" value={`${fmt(result.monthlyRetirementIncome)}/mo`} highlight />
                <ResultCard label="Your Total Contributions" value={fmt(result.totalYourContributions)} />
                <ResultCard label="Employer Contributions" value={fmt(result.totalEmployerContributions)} />
                <ResultCard label="Investment Growth" value={fmt(result.investmentGrowth)} />
              </div>
              <p className="text-center text-sm text-content-muted">
                <CopyValueButton value={fmt(result.projectedBalance)} label="Copy balance" />
              </p>

              {result.employerAnnualContribution > 0 && (
                <div className="flex items-start gap-2 rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-sm text-content-secondary">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-tool-convert" />
                  <p>
                    Your employer contributes <strong>{fmt(result.employerAnnualContribution)}/year</strong> —
                    don&apos;t leave this free money on the table!
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-4 text-sm text-content-secondary">
                <p className="font-semibold text-content-primary">
                  💰 Annual tax savings from 401k contributions
                </p>
                <p className="mt-2">
                  Traditional 401k reduces taxable income. At your contribution of{" "}
                  <strong>{fmt(result.cappedEmployeeContribution)}/year</strong>:
                </p>
                <ul className="mt-2 space-y-1">
                  <li>If in 22% bracket: saves ~<strong>{fmt(result.annualTaxSavings22)}/year</strong> in federal taxes</li>
                  <li>
                    Monthly take-home reduction is only{" "}
                    <strong>{fmt(result.monthlyTakeHomeReduction)}/month</strong> (not{" "}
                    {fmt(result.cappedEmployeeContribution / 12)}/month) after tax savings
                  </li>
                </ul>
              </div>

              <div className="max-h-96 overflow-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-surface-elevated">
                    <tr>
                      <th className="px-4 py-2 text-left">Year</th>
                      <th className="px-4 py-2 text-left">Age</th>
                      <th className="px-4 py-2 text-right">Your Contributions</th>
                      <th className="px-4 py-2 text-right">Employer Match</th>
                      <th className="px-4 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearRows.map((row) => (
                      <tr key={row.year} className="border-t border-surface-border">
                        <td className="px-4 py-2">{row.year}</td>
                        <td className="px-4 py-2">{row.age}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.yourContributions)}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.employerMatch)}</td>
                        <td className="px-4 py-2 text-right font-medium">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-content-muted">
            {FOUR_OH_ONE_K_DISCLAIMER}
          </p>

          <div className="mt-10">
            <RelatedTools currentSlug="401k-calculator" />
            <ToolSeoContent slug="401k-calculator" />
            <ToolFeedback toolName="401k Calculator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
