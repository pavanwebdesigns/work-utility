"use client";

import { useMemo, useState } from "react";
import { Award, IndianRupee, Scale } from "lucide-react";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import {
  BONUS_DISCLAIMER,
  BONUS_MAX_RATE,
  BONUS_MIN_RATE,
  calculateBonus,
} from "@/lib/bonus-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function BonusCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [monthlySalary, setMonthlySalary] = useState("15000");
  const [bonusRate, setBonusRate] = useState(BONUS_MIN_RATE);
  const [employmentMonths, setEmploymentMonths] = useState(12);

  const result = useMemo(
    () =>
      calculateBonus(
        parseNumberInput(monthlySalary),
        bonusRate,
        employmentMonths,
      ),
    [bonusRate, employmentMonths, monthlySalary],
  );

  return (
    <>
<IndiaRulesBadge toolSlug="bonus-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label="Monthly Gross Salary (₹)" htmlFor="salary">
              <CalculatorInput
                id="salary"
                value={monthlySalary}
                onChange={setMonthlySalary}
                placeholder="15,000"
              />
            </CalculatorField>

            <CalculatorField
              label={`Bonus Rate — ${bonusRate}%`}
              htmlFor="rate"
            >
              <input
                id="rate"
                type="range"
                min={BONUS_MIN_RATE}
                max={BONUS_MAX_RATE}
                step={0.01}
                value={bonusRate}
                onChange={(e) => setBonusRate(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setBonusRate(BONUS_MIN_RATE)}
                  className="rounded-lg border border-surface-border px-3 py-1 text-xs hover:bg-surface-elevated"
                >
                  Minimum (8.33%)
                </button>
                <button
                  type="button"
                  onClick={() => setBonusRate(BONUS_MAX_RATE)}
                  className="rounded-lg border border-surface-border px-3 py-1 text-xs hover:bg-surface-elevated"
                >
                  Maximum (20%)
                </button>
              </div>
            </CalculatorField>

            <CalculatorField
              label={`Employment Duration — ${employmentMonths} months`}
              htmlFor="months"
            >
              <input
                id="months"
                type="range"
                min={1}
                max={12}
                value={employmentMonths}
                onChange={(e) => setEmploymentMonths(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <p
                className={`rounded-xl border px-4 py-3 text-center text-sm ${
                  result.eligibility === "eligible"
                    ? "border-tool-convert/30 bg-tool-convert/5 text-content-secondary"
                    : "border-surface-border bg-surface-card text-content-secondary"
                }`}
              >
                {result.eligibilityMessage}
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Minimum (8.33%)"
                  value={fmt(result.minimumBonus)}
                />
                <ResultCard
                  label={`Your Bonus (${bonusRate.toFixed(2)}%)`}
                  value={fmt(result.selectedBonus)}
                  highlight
                />
                <ResultCard
                  label="Maximum (20%)"
                  value={fmt(result.maximumBonus)}
                />
              </div>

              <p className="text-center text-sm text-content-muted">
                Calculation wage: {fmt(result.calculationWage)}/month (ceiling
                ₹7,000)
                <CopyValueButton
                  value={fmt(result.selectedBonus)}
                  label="Copy"
                  className="ml-2"
                />
              </p>

              <p className="rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary">
                The wage ceiling for bonus calculation is ₹7,000/month. Even if
                your salary is higher, bonus is calculated on ₹7,000. This
                ceiling was last revised in 2015.
              </p>
            </div>
          )}

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            {BONUS_DISCLAIMER}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Scale, title: "8.33–20%", desc: "Statutory bonus range" },
              { icon: IndianRupee, title: "₹7,000 ceiling", desc: "Wage cap for calculation" },
              { icon: Award, title: "Eligibility", desc: "₹21,000 salary threshold" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-tool-photo" />
                <p className="mt-2 font-semibold text-content-primary">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
    </>
  );
}

