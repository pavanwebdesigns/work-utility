"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DollarSign, PieChart } from "lucide-react";
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
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { USRulesBadge } from "@/components/USRulesBadge";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useUSRulesCurrency } from "@/lib/use-us-rules-currency";
import {
  calculatePaycheck,
  NO_STATE_INCOME_TAX_STATES,
  payFrequencyLabel,
  US_STATES_AND_DC,
  type FilingStatus,
  type PayFrequency,
  type SalaryInputMode,
} from "@/lib/paycheck-calculator";

const PIE_COLORS = ["#10B981", "#EF4444", "#F59E0B", "#8B5CF6", "#3B82F6"];

export default function PaycheckCalculatorPage() {
  const { symbol, currency } = useUSRulesCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);

  const [salaryInputMode, setSalaryInputMode] =
    useState<SalaryInputMode>("annual");
  const [annualSalary, setAnnualSalary] = useState("85000");
  const [hourlyRate, setHourlyRate] = useState("25");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [stateCode, setStateCode] = useState("TX");
  const [stateTaxRatePercent, setStateTaxRatePercent] = useState("5");
  const [retirement401kPercent, setRetirement401kPercent] = useState("0");
  const [healthInsuranceMonthly, setHealthInsuranceMonthly] = useState("0");
  const [hsaMonthly, setHsaMonthly] = useState("0");

  const noStateTax = NO_STATE_INCOME_TAX_STATES.has(stateCode);

  const result = useMemo(() => {
    return calculatePaycheck({
      salaryInputMode,
      annualSalary: parseNumberInput(annualSalary),
      hourlyRate: parseNumberInput(hourlyRate),
      hoursPerWeek: parseNumberInput(hoursPerWeek),
      payFrequency,
      filingStatus,
      stateCode,
      stateTaxRatePercent: parseNumberInput(stateTaxRatePercent),
      retirement401kPercent: parseNumberInput(retirement401kPercent),
      healthInsuranceMonthly: parseNumberInput(healthInsuranceMonthly),
      hsaMonthly: parseNumberInput(hsaMonthly),
    });
  }, [
    annualSalary,
    filingStatus,
    healthInsuranceMonthly,
    hourlyRate,
    hoursPerWeek,
    hsaMonthly,
    payFrequency,
    retirement401kPercent,
    salaryInputMode,
    stateCode,
    stateTaxRatePercent,
  ]);

  const pieData = result
    ? [
        { name: "Take-home", value: Math.round(result.chartBreakdown.takeHome) },
        { name: "Federal tax", value: Math.round(result.chartBreakdown.federalTax) },
        { name: "FICA", value: Math.round(result.chartBreakdown.fica) },
        { name: "State tax", value: Math.round(result.chartBreakdown.stateTax) },
        {
          name: "Pre-tax deductions",
          value: Math.round(result.chartBreakdown.preTaxDeductions),
        },
      ].filter((item) => item.value > 0)
    : [];

  const freqLabel = payFrequencyLabel(payFrequency);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
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
              <DollarSign className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Paycheck Calculator 2026 — Estimate Your Take-Home Pay
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Estimate net pay after 2026 federal tax, FICA, pre-tax deductions, and
              a simplified state tax estimate.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="paycheck-calculator" />
            </div>
          </div>

          <USRulesBadge toolSlug="paycheck-calculator" />

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Salary Input" htmlFor="salary-mode">
              <ToggleButtonGroup
                value={salaryInputMode}
                onChange={setSalaryInputMode}
                ariaLabel="Salary input mode"
                options={[
                  { value: "annual", label: "Annual salary" },
                  { value: "hourly", label: "Hourly rate" },
                ]}
              />
            </CalculatorField>

            {salaryInputMode === "annual" ? (
              <CalculatorField label={`Gross Annual Salary (${symbol})`} htmlFor="annual-salary">
                <CalculatorInput
                  id="annual-salary"
                  value={annualSalary}
                  onChange={setAnnualSalary}
                  placeholder="85,000"
                />
              </CalculatorField>
            ) : (
              <>
                <CalculatorField label={`Hourly Rate (${symbol})`} htmlFor="hourly-rate">
                  <CalculatorInput
                    id="hourly-rate"
                    value={hourlyRate}
                    onChange={setHourlyRate}
                    placeholder="25"
                  />
                </CalculatorField>
                <CalculatorField label="Hours per Week" htmlFor="hours-week">
                  <CalculatorInput
                    id="hours-week"
                    value={hoursPerWeek}
                    onChange={setHoursPerWeek}
                    placeholder="40"
                  />
                </CalculatorField>
              </>
            )}

            <CalculatorField label="Pay Frequency" htmlFor="pay-frequency">
              <CalculatorSelect
                id="pay-frequency"
                value={payFrequency}
                onChange={(value) => setPayFrequency(value as PayFrequency)}
                options={[
                  { value: "weekly", label: "Weekly" },
                  { value: "biweekly", label: "Biweekly" },
                  { value: "semimonthly", label: "Semi-monthly" },
                  { value: "monthly", label: "Monthly" },
                  { value: "annual", label: "Annual" },
                ]}
                ariaLabel="Pay frequency"
              />
            </CalculatorField>

            <CalculatorField label="Filing Status" htmlFor="filing-status">
              <CalculatorSelect
                id="filing-status"
                value={filingStatus}
                onChange={(value) => setFilingStatus(value as FilingStatus)}
                options={[
                  { value: "single", label: "Single" },
                  { value: "mfj", label: "Married Filing Jointly" },
                  { value: "hoh", label: "Head of Household" },
                ]}
                ariaLabel="Filing status"
              />
            </CalculatorField>

            <CalculatorField label="State" htmlFor="state">
              <CalculatorSelect
                id="state"
                value={stateCode}
                onChange={setStateCode}
                options={US_STATES_AND_DC.map((s) => ({
                  value: s.code,
                  label: s.name,
                }))}
                ariaLabel="State"
              />
            </CalculatorField>

            {!noStateTax && (
              <CalculatorField
                label="Estimated State Tax Rate (%)"
                htmlFor="state-rate"
              >
                <CalculatorInput
                  id="state-rate"
                  value={stateTaxRatePercent}
                  onChange={setStateTaxRatePercent}
                  placeholder="5"
                />
                <p className="mt-2 text-xs text-content-muted">
                  Rough flat-rate estimate — not your state&apos;s actual bracket
                  structure. Enter your known effective rate if you have one.
                </p>
              </CalculatorField>
            )}

            <div className="space-y-4 rounded-xl border border-surface-border bg-surface-card p-4">
              <p className="text-sm font-semibold text-content-primary">
                Pre-tax Deductions (optional)
              </p>
              <CalculatorField label="401(k) Contribution (%)" htmlFor="401k">
                <CalculatorInput
                  id="401k"
                  value={retirement401kPercent}
                  onChange={setRetirement401kPercent}
                  placeholder="0"
                />
              </CalculatorField>
              <CalculatorField
                label={`Health Insurance (${symbol}/month)`}
                htmlFor="health"
              >
                <CalculatorInput
                  id="health"
                  value={healthInsuranceMonthly}
                  onChange={setHealthInsuranceMonthly}
                  placeholder="0"
                />
              </CalculatorField>
              <CalculatorField label={`HSA (${symbol}/month)`} htmlFor="hsa">
                <CalculatorInput
                  id="hsa"
                  value={hsaMonthly}
                  onChange={setHsaMonthly}
                  placeholder="0"
                />
              </CalculatorField>
            </div>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultCard
                  label={`Net Take-Home (${freqLabel})`}
                  value={fmt(result.netPerPayPeriod, 2)}
                  highlight
                />
                <ResultCard
                  label={`Gross Pay (${freqLabel})`}
                  value={fmt(result.grossPerPayPeriod, 2)}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                <p className="py-3 font-semibold text-content-primary">
                  Annual Breakdown
                </p>
                <BreakdownRow label="Gross Pay" value={fmt(result.grossAnnual, 0)} />
                <BreakdownRow
                  label="Pre-tax Deductions"
                  value={`- ${fmt(result.preTaxDeductionsAnnual, 0)}`}
                />
                <BreakdownRow
                  label="Federal Income Tax"
                  value={`- ${fmt(result.federalTax, 0)}`}
                />
                <BreakdownRow
                  label="Social Security (6.2%)"
                  value={`- ${fmt(result.socialSecurityTax, 0)}`}
                />
                <BreakdownRow
                  label="Medicare (1.45%)"
                  value={`- ${fmt(result.medicareTax, 2)}`}
                />
                {result.additionalMedicareTax > 0 && (
                  <BreakdownRow
                    label="Additional Medicare (0.9%)"
                    value={`- ${fmt(result.additionalMedicareTax, 2)}`}
                  />
                )}
                <BreakdownRow
                  label={
                    noStateTax
                      ? "State Tax (no income tax)"
                      : "Estimated State Tax"
                  }
                  value={
                    noStateTax
                      ? fmt(0, 0)
                      : `- ${fmt(result.stateTax, 0)}`
                  }
                />
                <BreakdownRow
                  label="Net Take-Home (annual)"
                  value={fmt(result.netAnnual, 0)}
                />
                <p className="border-t border-surface-border py-3 text-xs text-content-muted">
                  Federal taxable income after standard deduction:{" "}
                  {fmt(result.federalTaxableIncome, 0)} · Marginal federal bracket:{" "}
                  {(result.marginalFederalBracket * 100).toFixed(0)}%
                </p>
              </div>

              {!noStateTax && (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-content-secondary">
                  State tax shown is a simplified flat-rate estimate, not your
                  state&apos;s actual bracket structure. Federal tax and FICA above are
                  precise; state tax is an approximation.
                </p>
              )}

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-brand-blue" />
                  <h2 className="font-semibold text-content-primary">
                    Pay Breakdown
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
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                        >
                          {pieData.map((_, index) => (
                            <Cell
                              key={index}
                              fill={PIE_COLORS[index % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => fmt(Number(value), 0)}
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid #1F2937",
                            borderRadius: "0.75rem",
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {pieData.map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="flex items-center gap-2 text-content-secondary">
                          <span
                            className="inline-block h-3 w-3 rounded-full"
                            style={{
                              backgroundColor:
                                PIE_COLORS[index % PIE_COLORS.length],
                            }}
                          />
                          {item.name}
                        </span>
                        <span className="font-medium text-content-primary">
                          {fmt(item.value, 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <RelatedTools currentSlug="paycheck-calculator" />
          <ToolSeoContent slug="paycheck-calculator" />
          <ToolFeedback toolName="Paycheck Calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
