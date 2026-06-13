"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, IndianRupee, PieChart, Scale } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { DinoGame } from "@/components/DinoGame";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { formatINR, parseNumberInput } from "@/lib/format-inr";
import {
  compareIncomeTax,
  type AgeGroup,
  type FinancialYear,
  type RegimeTaxResult,
} from "@/lib/income-tax-calculator";

const PIE_COLORS = ["#3B82F6", "#EF4444", "#10B981"];

function SlabBreakdownTable({ result }: { result: RegimeTaxResult }) {
  return (
    <div className="rounded-xl border border-surface-border bg-surface-card px-5">
      <p className="py-3 font-semibold text-content-primary">Slab-wise Breakdown</p>
      {result.slabBreakdown.map((slab) => (
        <BreakdownRow
          key={slab.label}
          label={`${slab.label} @ ${(slab.rate * 100).toFixed(0)}%`}
          value={formatINR(slab.tax, 0)}
        />
      ))}
      <BreakdownRow label="Tax Before Rebate" value={formatINR(result.taxBeforeRebate, 0)} />
      <BreakdownRow label="Rebate u/s 87A" value={`- ${formatINR(result.rebate, 0)}`} />
      <BreakdownRow label="Health & Education Cess (4%)" value={formatINR(result.cess, 0)} />
      <BreakdownRow label="Total Tax" value={formatINR(result.totalTax, 0)} />
      <BreakdownRow label="Take-home Income" value={formatINR(result.takeHome, 0)} />
    </div>
  );
}

export default function IncomeTaxCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState("1200000");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("below-60");
  const [financialYear, setFinancialYear] = useState<FinancialYear>("fy-2025-26");
  const [selectedRegime, setSelectedRegime] = useState<"old" | "new">("new");
  const [hraExemption, setHraExemption] = useState("0");
  const [section80c, setSection80c] = useState("150000");
  const [section80d, setSection80d] = useState("25000");
  const [homeLoanInterest, setHomeLoanInterest] = useState("0");
  const [nps80ccd1b, setNps80ccd1b] = useState("0");

  const comparison = useMemo(() => {
    return compareIncomeTax(
      {
        annualIncome: parseNumberInput(annualIncome),
        ageGroup,
        hraExemption: parseNumberInput(hraExemption),
        section80c: parseNumberInput(section80c),
        section80d: parseNumberInput(section80d),
        homeLoanInterest: parseNumberInput(homeLoanInterest),
        nps80ccd1b: parseNumberInput(nps80ccd1b),
      },
      financialYear
    );
  }, [
    ageGroup,
    annualIncome,
    financialYear,
    homeLoanInterest,
    hraExemption,
    nps80ccd1b,
    section80c,
    section80d,
  ]);

  const activeResult =
    comparison && selectedRegime === "old"
      ? comparison.oldRegime
      : comparison?.newRegime;

  const pieData = activeResult
    ? [
        { name: "Take-home", value: Math.round(activeResult.takeHome) },
        { name: "Tax", value: Math.round(activeResult.totalTax) },
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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <IndianRupee className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Income Tax Calculator — Old Regime vs New Regime 2025-26
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Compare income tax under old and new regime with slab-wise
              breakdown, rebate, cess, and take-home estimate.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Annual Income (₹)" htmlFor="annual-income">
              <CalculatorInput
                id="annual-income"
                value={annualIncome}
                onChange={setAnnualIncome}
                placeholder="12,00,000"
              />
            </CalculatorField>

            <CalculatorField label="Age Group" htmlFor="age-group">
              <CalculatorSelect
                id="age-group"
                value={ageGroup}
                onChange={(value) => setAgeGroup(value as AgeGroup)}
                options={[
                  { value: "below-60", label: "Below 60" },
                  { value: "60-80", label: "60 - 80" },
                  { value: "above-80", label: "Above 80" },
                ]}
                ariaLabel="Age group"
              />
            </CalculatorField>

            <CalculatorField label="Financial Year" htmlFor="financial-year">
              <ToggleButtonGroup
                value={financialYear}
                onChange={setFinancialYear}
                ariaLabel="Financial year"
                options={[
                  { value: "fy-2024-25", label: "FY 2024-25" },
                  { value: "fy-2025-26", label: "FY 2025-26" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="View Regime Details" htmlFor="regime-toggle">
              <ToggleButtonGroup
                value={selectedRegime}
                onChange={setSelectedRegime}
                ariaLabel="Tax regime details"
                options={[
                  { value: "old", label: "Old Regime" },
                  { value: "new", label: "New Regime" },
                ]}
              />
            </CalculatorField>

            {selectedRegime === "old" && (
              <div className="space-y-4 rounded-xl border border-surface-border bg-surface-card p-4">
                <p className="text-sm font-semibold text-content-primary">
                  Old Regime Deductions
                </p>
                <CalculatorField label="HRA Exemption (₹)" htmlFor="hra">
                  <CalculatorInput id="hra" value={hraExemption} onChange={setHraExemption} placeholder="0" />
                </CalculatorField>
                <CalculatorField label="80C Investments (max ₹1,50,000)" htmlFor="80c">
                  <CalculatorInput id="80c" value={section80c} onChange={setSection80c} placeholder="1,50,000" />
                </CalculatorField>
                <CalculatorField label="80D Health Insurance (max ₹25,000)" htmlFor="80d">
                  <CalculatorInput id="80d" value={section80d} onChange={setSection80d} placeholder="25,000" />
                </CalculatorField>
                <CalculatorField label="Home Loan Interest 24(b) (max ₹2,00,000)" htmlFor="home-loan">
                  <CalculatorInput id="home-loan" value={homeLoanInterest} onChange={setHomeLoanInterest} placeholder="0" />
                </CalculatorField>
                <CalculatorField label="NPS 80CCD(1B) (max ₹50,000)" htmlFor="nps">
                  <CalculatorInput id="nps" value={nps80ccd1b} onChange={setNps80ccd1b} placeholder="0" />
                </CalculatorField>
                <p className="text-xs text-content-muted">
                  Standard deduction of ₹50,000 is applied automatically for old regime.
                </p>
              </div>
            )}

            {selectedRegime === "new" && (
              <p className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                New regime applies standard deduction of ₹75,000 automatically. No other deductions are available.
              </p>
            )}
          </div>

          {comparison && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Tax under Old Regime"
                  value={formatINR(comparison.oldRegime.totalTax, 0)}
                />
                <ResultCard
                  label="Tax under New Regime"
                  value={formatINR(comparison.newRegime.totalTax, 0)}
                  highlight
                />
              </div>

              <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-4 text-center">
                <p className="text-sm text-content-secondary">Recommendation</p>
                <p className="mt-1 text-lg font-semibold text-tool-convert">
                  {comparison.recommended === "equal"
                    ? "Both regimes result in similar tax"
                    : `${comparison.recommended === "new" ? "New" : "Old"} Regime saves ${formatINR(comparison.savings, 0)}`}
                </p>
              </div>

              <SlabBreakdownTable result={activeResult!} />

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-brand-blue" />
                  <h2 className="font-semibold text-content-primary">
                    Income vs Tax vs Take-home
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={2}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={PIE_COLORS[index % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatINR(Number(value), 0)}
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid #1F2937",
                            borderRadius: "0.75rem",
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    <BreakdownRow label="Gross Income" value={formatINR(activeResult!.grossIncome, 0)} />
                    <BreakdownRow label="Total Tax" value={formatINR(activeResult!.totalTax, 0)} />
                    <BreakdownRow label="Take-home" value={formatINR(activeResult!.takeHome, 0)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: IndianRupee, title: "Enter Income", description: "Add salary and old regime deductions" },
                { step: "02", icon: Scale, title: "Compare Regimes", description: "See old vs new tax with cess and rebate" },
                { step: "03", icon: Calculator, title: "Choose Better Option", description: "Get recommendation and take-home estimate" },
              ].map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="income-tax-calculator" />
          <ToolFeedback toolName="Income Tax Calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
