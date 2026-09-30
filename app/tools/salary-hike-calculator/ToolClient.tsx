"use client";

import { useMemo, useState } from "react";
import { Calculator, TrendingUp, Wallet } from "lucide-react";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import {
  calculateHikeFromNewSalary,
  calculateSalaryHike,
} from "@/lib/salary-hike-calculator";
import { useCurrency } from "@/lib/currency-context";

type CalculatorMode = "forward" | "reverse";

export default function SalaryHikeCalculatorPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);
  const [mode, setMode] = useState<CalculatorMode>("forward");
  const [currentSalary, setCurrentSalary] = useState("800000");
  const [hikePercent, setHikePercent] = useState("15");
  const [desiredSalary, setDesiredSalary] = useState("920000");

  const result = useMemo(() => {
    const current = parseNumberInput(currentSalary);

    if (mode === "forward") {
      return calculateSalaryHike(current, parseNumberInput(hikePercent));
    }

    return calculateHikeFromNewSalary(current, parseNumberInput(desiredSalary));
  }, [currentSalary, desiredSalary, hikePercent, mode]);

  return (
    <>
<div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Calculator Mode" htmlFor="hike-mode">
              <ToggleButtonGroup
                value={mode}
                onChange={setMode}
                ariaLabel="Salary hike calculator mode"
                options={[
                  { value: "forward", label: "Hike % → New Salary" },
                  { value: "reverse", label: "New Salary → Hike %" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label={`Current Salary (${symbol})`} htmlFor="current-salary">
              <CalculatorInput
                id="current-salary"
                value={currentSalary}
                onChange={setCurrentSalary}
                placeholder="8,00,000"
              />
            </CalculatorField>

            {mode === "forward" ? (
              <CalculatorField label="Hike Percentage (%)" htmlFor="hike-percent">
                <CalculatorInput
                  id="hike-percent"
                  value={hikePercent}
                  onChange={setHikePercent}
                  placeholder="15"
                />
              </CalculatorField>
            ) : (
              <CalculatorField label={`Desired New Salary (${symbol})`} htmlFor="desired-salary">
                <CalculatorInput
                  id="desired-salary"
                  value={desiredSalary}
                  onChange={setDesiredSalary}
                  placeholder="9,20,000"
                />
              </CalculatorField>
            )}
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Hike Amount"
                  value={fmt(result.hikeAmount, 0)}
                />
                <ResultCard
                  label="New Salary"
                  value={fmt(result.newSalary, 0)}
                  highlight
                />
                <ResultCard
                  label="Monthly Increase"
                  value={fmt(result.monthlyIncrease, 0)}
                />
              </div>
              {mode === "reverse" && (
                <p className="mt-4 text-center text-sm text-content-secondary">
                  Required hike:{" "}
                  <span className="font-semibold text-content-primary">
                    {result.hikePercent.toFixed(2)}%
                  </span>
                </p>
              )}
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Wallet, title: "Current Salary", description: "Enter your existing annual CTC or salary" },
                { step: "02", icon: TrendingUp, title: "Hike or Target", description: "Add hike % or desired new salary" },
                { step: "03", icon: Calculator, title: "See Results", description: "Get hike amount and monthly increase" },
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

