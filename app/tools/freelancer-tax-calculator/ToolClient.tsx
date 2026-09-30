"use client";

import { useMemo, useState } from "react";
import { Calculator, FileText, IndianRupee } from "lucide-react";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  FREELANCER_PROFESSION_OPTIONS,
  calculateFreelancerTax,
  type FreelancerProfession,
  type TaxRegime,
} from "@/lib/freelancer-tax-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function FreelancerTaxCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [grossReceipts, setGrossReceipts] = useState("2000000");
  const [digitalPercent, setDigitalPercent] = useState(100);
  const [profession, setProfession] = useState<FreelancerProfession>("it-software");
  const [actualExpenses, setActualExpenses] = useState("");
  const [otherIncome, setOtherIncome] = useState("0");
  const [regime, setRegime] = useState<TaxRegime>("new");
  const [section80c, setSection80c] = useState("150000");
  const [section80d, setSection80d] = useState("25000");

  const result = useMemo(
    () =>
      calculateFreelancerTax({
        grossReceipts: parseNumberInput(grossReceipts),
        digitalPercent,
        profession,
        actualExpenses: actualExpenses ? parseNumberInput(actualExpenses) : undefined,
        otherIncome: parseNumberInput(otherIncome),
        regime,
        section80c: parseNumberInput(section80c),
        section80d: parseNumberInput(section80d),
      }),
    [actualExpenses, digitalPercent, grossReceipts, otherIncome, profession, regime, section80c, section80d],
  );

  const ada = result?.section44Ada;

  return (
    <>
<IndiaRulesBadge toolSlug="freelancer-tax-calculator" />

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Gross Professional Receipts (₹/year)" htmlFor="gross">
              <CalculatorInput id="gross" value={grossReceipts} onChange={setGrossReceipts} placeholder="20,00,000" />
            </CalculatorField>

            <CalculatorField label={`Digital Receipts — ${digitalPercent}%`} htmlFor="digital">
              <input id="digital" type="range" min={0} max={100} value={digitalPercent} onChange={(e) => setDigitalPercent(Number(e.target.value))} className="w-full accent-brand-blue" />
            </CalculatorField>

            <CalculatorField label="Profession Type" htmlFor="profession">
              <CalculatorSelect
                id="profession"
                value={profession}
                onChange={(v) => setProfession(v as FreelancerProfession)}
                options={FREELANCER_PROFESSION_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
              />
            </CalculatorField>

            <CalculatorField label="Actual Expenses (optional, for comparison)" htmlFor="expenses">
              <CalculatorInput id="expenses" value={actualExpenses} onChange={setActualExpenses} placeholder="Leave blank to skip" />
            </CalculatorField>

            <CalculatorField label="Other Income (₹/year)" htmlFor="other">
              <CalculatorInput id="other" value={otherIncome} onChange={setOtherIncome} placeholder="0" />
            </CalculatorField>

            <CalculatorField label="Tax Regime" htmlFor="regime">
              <ToggleButtonGroup
                value={regime}
                onChange={setRegime}
                ariaLabel="Tax regime"
                options={[
                  { value: "new" as const, label: "New Regime" },
                  { value: "old" as const, label: "Old Regime" },
                ]}
              />
            </CalculatorField>

            {regime === "old" && (
              <>
                <CalculatorField label="Section 80C (₹/year)" htmlFor="80c">
                  <CalculatorInput id="80c" value={section80c} onChange={setSection80c} placeholder="1,50,000" />
                </CalculatorField>
                <CalculatorField label="Section 80D (₹/year)" htmlFor="80d">
                  <CalculatorInput id="80d" value={section80d} onChange={setSection80d} placeholder="25,000" />
                </CalculatorField>
              </>
            )}
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-2xl space-y-6">
              <div className={`rounded-xl border p-4 text-sm ${result.eligibility.eligible ? "border-tool-convert/30 bg-tool-convert/5 text-tool-convert" : "border-tool-pdf/30 bg-tool-pdf/5 text-tool-pdf"}`}>
                {result.eligibility.message}
              </div>

              {ada && (
                <>
                  <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
                    <h2 className="text-lg font-semibold text-content-primary">Under Section 44ADA</h2>
                    <div className="mt-4 space-y-2">
                      <BreakdownRow label="Gross Receipts" value={fmt(ada.grossReceipts)} />
                      <BreakdownRow label="Presumptive Income (50%)" value={fmt(ada.presumptiveIncome)} />
                      {regime === "old" && ada.deductions > 0 && (
                        <BreakdownRow label="Chapter VI-A Deductions" value={fmt(ada.deductions)} />
                      )}
                      <BreakdownRow label="Taxable Income" value={fmt(ada.taxableIncome)} />
                      <BreakdownRow label="Tax (before rebate)" value={fmt(ada.taxBeforeRebate)} />
                      {ada.rebate > 0 && <BreakdownRow label="87A Rebate" value={`−${fmt(ada.rebate)}`} />}
                      <BreakdownRow label="Cess (4%)" value={fmt(ada.cess)} />
                      <BreakdownRow label="Total Tax Payable" value={fmt(ada.totalTax)} />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <ResultCard label="Effective tax rate" value={`${ada.effectiveRate.toFixed(2)}%`} />
                      <CopyValueButton value={fmt(ada.totalTax)} label="Copy tax" />
                    </div>
                    <p className="mt-3 text-xs text-content-muted">ITR Form: {ada.itrForm} · Books required: No</p>
                    <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                      ⚠️ Advance tax: pay 100% of estimated tax by 15 March 2027 (single payment under 44ADA).
                    </p>
                  </div>

                  {result.regularBooks && (
                    <div className="rounded-2xl border border-surface-border bg-surface-card p-5">
                      <h2 className="text-lg font-semibold text-content-primary">Regular Books Comparison</h2>
                      <BreakdownRow label="Total Tax Payable" value={fmt(result.regularBooks.totalTax)} />
                      {result.verdict && <p className="mt-3 text-sm font-medium text-brand-blue">{result.verdict}</p>}
                    </div>
                  )}

                  <p className="text-xs text-content-muted">
                    This is an estimate for planning purposes. Consult a CA before filing. Tax laws change frequently.
                  </p>
                </>
              )}
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: FileText, title: "Check eligibility", desc: "₹50L or ₹75L based on digital receipts" },
              { icon: Calculator, title: "50% presumptive", desc: "Tax on half of gross receipts" },
              { icon: IndianRupee, title: "Compare methods", desc: "44ADA vs regular books side by side" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                <item.icon className="h-5 w-5 text-tool-convert" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
    </>
  );
}

