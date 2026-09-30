"use client";

import { useMemo, useState } from "react";
import { Calculator, Landmark, Wallet } from "lucide-react";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  PROFESSIONAL_TAX_OPTIONS,
  calculateCtcToInHand,
} from "@/lib/ctc-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";

export default function CtcCalculatorPage() {
  const { symbol, currency } = useIndiaRulesCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);
  const [annualCtc, setAnnualCtc] = useState("1200000");
  const [pfEnabled, setPfEnabled] = useState<"yes" | "no">("yes");
  const [taxOption, setTaxOption] = useState("maharashtra");
  const [customTax, setCustomTax] = useState("200");

  const professionalTaxMonthly = useMemo(() => {
    if (taxOption === "custom") return parseNumberInput(customTax);
    return (
      PROFESSIONAL_TAX_OPTIONS.find((option) => option.id === taxOption)
        ?.monthly ?? 0
    );
  }, [customTax, taxOption]);

  const result = useMemo(() => {
    return calculateCtcToInHand(
      parseNumberInput(annualCtc),
      pfEnabled === "yes",
      professionalTaxMonthly
    );
  }, [annualCtc, pfEnabled, professionalTaxMonthly]);

  return (
    <>
<IndiaRulesBadge toolSlug="ctc-calculator" />

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Annual CTC (${symbol})`} htmlFor="annual-ctc">
              <CalculatorInput
                id="annual-ctc"
                value={annualCtc}
                onChange={setAnnualCtc}
                placeholder="12,00,000"
              />
            </CalculatorField>

            <CalculatorField label="PF Contribution (12% of Basic)" htmlFor="pf-toggle">
              <ToggleButtonGroup
                value={pfEnabled}
                onChange={setPfEnabled}
                ariaLabel="PF contribution toggle"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="Professional Tax" htmlFor="professional-tax">
              <CalculatorSelect
                id="professional-tax"
                value={taxOption}
                onChange={setTaxOption}
                options={PROFESSIONAL_TAX_OPTIONS.map((option) => ({
                  value: option.id,
                  label: option.label,
                }))}
                ariaLabel="Professional tax state"
              />
            </CalculatorField>

            {taxOption === "custom" && (
              <CalculatorField label={`Custom Professional Tax (${symbol}/month)`} htmlFor="custom-tax">
                <CalculatorInput
                  id="custom-tax"
                  value={customTax}
                  onChange={setCustomTax}
                  placeholder="200"
                />
              </CalculatorField>
            )}
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Monthly In-Hand Salary"
                  value={fmt(result.monthlyInHand, 0)}
                  highlight
                />
                <ResultCard
                  label="Annual In-Hand Salary"
                  value={fmt(result.annualInHand, 0)}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                <p className="py-3 text-sm font-semibold text-content-primary">
                  Deductions Breakdown
                </p>
                <BreakdownRow
                  label="PF Employee (12% of Basic)"
                  value={fmt(result.pfEmployee, 0)}
                />
                <BreakdownRow
                  label="Professional Tax"
                  value={fmt(result.professionalTaxAnnual, 0)}
                />
                <BreakdownRow
                  label="Income Tax (estimated, new regime)"
                  value={fmt(result.incomeTax, 0)}
                />
                <BreakdownRow
                  label="Total Deductions"
                  value={fmt(result.totalDeductions, 0)}
                />
              </div>

              <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-4 py-3 text-sm leading-relaxed text-content-secondary">
                <p className="font-medium text-content-primary">Assumptions</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Basic salary = 50% of CTC</li>
                  <li>HRA = 20% of CTC</li>
                  <li>Special allowance = remaining 30%</li>
                  <li>Standard deduction of {symbol}75,000 applied for tax estimate</li>
                  <li>Income tax uses simplified new tax regime slabs</li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Wallet, title: "Enter CTC", description: "Add your annual cost to company" },
                { step: "02", icon: Landmark, title: "Set Deductions", description: "Choose PF and professional tax" },
                { step: "03", icon: Calculator, title: "Take-Home Pay", description: "See monthly and annual in-hand salary" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon className="h-5 w-5 text-tool-convert" />
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

