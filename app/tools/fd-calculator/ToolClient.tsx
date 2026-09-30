"use client";

import { useMemo, useState } from "react";
import { Calculator, Landmark, LineChart, PiggyBank } from "lucide-react";
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  calculateFdReturns,
  tenureToYears,
  type CompoundingFrequency,
} from "@/lib/fd-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useCurrency } from "@/lib/currency-context";

export default function FdCalculatorPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);
  const [principal, setPrincipal] = useState("500000");
  const [interestRate, setInterestRate] = useState("7.25");
  const [tenure, setTenure] = useState("5");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [frequency, setFrequency] = useState<CompoundingFrequency>("quarterly");

  const result = useMemo(() => {
    const tenureYears = tenureToYears(parseNumberInput(tenure), tenureUnit);
    return calculateFdReturns(
      parseNumberInput(principal),
      parseNumberInput(interestRate),
      tenureYears,
      frequency
    );
  }, [frequency, interestRate, principal, tenure, tenureUnit]);

  return (
    <>
<div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Principal Amount (${symbol})`} htmlFor="fd-principal">
              <CalculatorInput
                id="fd-principal"
                value={principal}
                onChange={setPrincipal}
                placeholder="5,00,000"
              />
            </CalculatorField>

            <CalculatorField label="Interest Rate (% per annum)" htmlFor="fd-rate">
              <CalculatorInput
                id="fd-rate"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="7.25"
              />
            </CalculatorField>

            <CalculatorField label="Tenure" htmlFor="fd-tenure">
              <div className="space-y-3">
                <CalculatorInput
                  id="fd-tenure"
                  value={tenure}
                  onChange={setTenure}
                  placeholder={tenureUnit === "years" ? "5" : "60"}
                />
                <ToggleButtonGroup
                  value={tenureUnit}
                  onChange={setTenureUnit}
                  ariaLabel="FD tenure unit"
                  options={[
                    { value: "years", label: "Years" },
                    { value: "months", label: "Months" },
                  ]}
                />
              </div>
            </CalculatorField>

            <CalculatorField label="Compounding Frequency" htmlFor="fd-frequency">
              <CalculatorSelect
                id="fd-frequency"
                value={frequency}
                onChange={(value) => setFrequency(value as CompoundingFrequency)}
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "quarterly", label: "Quarterly" },
                  { value: "yearly", label: "Yearly" },
                ]}
                ariaLabel="Compounding frequency"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Maturity Amount"
                  value={fmt(result.maturityAmount, 0)}
                  highlight
                />
                <ResultCard
                  label="Total Interest Earned"
                  value={fmt(result.interestEarned, 0)}
                />
                <ResultCard
                  label="Effective Annual Rate"
                  value={`${result.effectiveAnnualRate.toFixed(2)}%`}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-tool-photo" />
                  <h2 className="font-semibold text-content-primary">
                    Growth Chart
                  </h2>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={result.yearlyGrowth}>
                      <XAxis
                        dataKey="year"
                        tickFormatter={(value) => `Year ${value}`}
                        stroke="#94A3B8"
                      />
                      <YAxis
                        tickFormatter={(value) => fmt(Number(value), 0)}
                        stroke="#94A3B8"
                        width={90}
                      />
                      <Tooltip
                        formatter={(value) => fmt(Number(value), 0)}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "1px solid #1F2937",
                          borderRadius: "0.75rem",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#F59E0B"
                        strokeWidth={3}
                        dot={{ fill: "#F59E0B", r: 4 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
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
                { step: "01", icon: PiggyBank, title: "Deposit Details", description: "Enter principal, rate, and tenure" },
                { step: "02", icon: Landmark, title: "Compounding", description: "Choose monthly, quarterly, or yearly" },
                { step: "03", icon: Calculator, title: "Maturity Value", description: "See interest earned and growth chart" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-photo/10">
                    <step.icon className="h-5 w-5 text-tool-photo" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
    </>
  );
}

