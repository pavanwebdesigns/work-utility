"use client";

import { useState } from "react";
import { Award, Calculator, Wallet } from "lucide-react";
import { CalculatorField, CalculatorInput, ToggleButtonGroup } from "@/components/calculator/CalculatorUi";
import { calculateGratuity, GRATUITY_MAX_LIMIT, MIN_YEARS_ELIGIBLE } from "@/lib/gratuity-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";

const howItWorksSteps = [
  { step: "01", icon: Wallet, title: "Enter Salary & Years", description: "Enter last drawn salary and years of service" },
  { step: "02", icon: Calculator, title: "Calculate", description: "Apply gratuity formula" },
  { step: "03", icon: Award, title: "See Amount", description: "View gratuity amount and formula used" },
];

export default function GratuityCalculatorPage() {
  const { symbol, currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency);

  const [salary, setSalary] = useState("50000");
  const [years, setYears] = useState("10");
  const [covered, setCovered] = useState<"yes" | "no">("yes");
  const [result, setResult] = useState<ReturnType<typeof calculateGratuity> | null>(null);

  const handleCalculate = () => {
    setResult(calculateGratuity(parseNumberInput(salary), parseNumberInput(years), covered === "yes"));
  };

  const yearsNum = parseNumberInput(years);

  return (
    <>
<IndiaRulesBadge toolSlug="gratuity-calculator" />

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Last Drawn Salary Basic+DA (${symbol}/month)`} htmlFor="grat-salary"><CalculatorInput id="grat-salary" value={salary} onChange={setSalary} /></CalculatorField>
            <CalculatorField label="Years of Service" htmlFor="grat-years"><CalculatorInput id="grat-years" value={years} onChange={setYears} placeholder="10" /></CalculatorField>
            <ToggleButtonGroup value={covered} onChange={setCovered} ariaLabel="Gratuity Act coverage" options={[{ value: "yes", label: "Covered under Act" }, { value: "no", label: "Not covered" }]} />
            <button type="button" onClick={handleCalculate} className="w-full rounded-xl bg-tool-convert py-3 text-sm font-semibold text-white">Calculate</button>
          </div>
          {result && (
            <div className="mx-auto mt-8 max-w-xl space-y-4">
              <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center">
                <p className="text-sm text-content-secondary">Gratuity Amount</p>
                <p className="mt-2 text-4xl font-bold text-tool-convert">{fmt(result.gratuityAmount)}</p>
                <p className="mt-2 text-sm text-content-muted">Formula: {result.formula} · Years used: {result.roundedYears}</p>
              </div>
            </div>
          )}
          <div className="mx-auto mt-6 max-w-xl space-y-2 text-center text-xs text-content-muted">
            <p>Minimum {MIN_YEARS_ELIGIBLE} years of continuous service required to be eligible for gratuity (except in case of death or disability).</p>
            <p>Tax-free gratuity limit is {formatCurrency(GRATUITY_MAX_LIMIT, "INR")} as per current rules.</p>
          </div>
          {yearsNum > 0 && yearsNum < MIN_YEARS_ELIGIBLE && (
            <p className="mx-auto mt-4 max-w-xl text-center text-sm text-amber-400">Note: You may not be eligible with less than {MIN_YEARS_ELIGIBLE} years of service.</p>
          )}
          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{howItWorksSteps.map((s) => (<div key={s.title} className="rounded-xl border border-surface-border bg-surface-card p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10"><s.icon className="h-5 w-5 text-tool-convert" /></div><p className="text-xs font-semibold text-tool-convert">{s.step}</p><p className="mt-1 font-semibold">{s.title}</p><p className="mt-1 text-sm text-content-secondary">{s.description}</p></div>))}</div>
          </div>
    </>
  );
}

