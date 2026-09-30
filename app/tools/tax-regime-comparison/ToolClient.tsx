"use client";

import { useMemo, useState } from "react";
import { GitCompare, Scale, Sparkles } from "lucide-react";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  CalculatorInput,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { compareTaxRegimes } from "@/lib/tax-regime-comparison";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function TaxRegimeComparisonPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [annualSalary, setAnnualSalary] = useState("800000");
  const [hraReceived, setHraReceived] = useState("20000");
  const [rentPaid, setRentPaid] = useState("15000");
  const [isMetro, setIsMetro] = useState<"metro" | "non-metro">("non-metro");
  const [section80c, setSection80c] = useState("150000");
  const [section80d, setSection80d] = useState("25000");
  const [otherDeductions, setOtherDeductions] = useState("0");

  const result = useMemo(
    () =>
      compareTaxRegimes({
        annualGrossSalary: parseNumberInput(annualSalary),
        hraReceivedMonthly: parseNumberInput(hraReceived),
        rentPaidMonthly: parseNumberInput(rentPaid),
        isMetroCity: isMetro === "metro",
        section80c: parseNumberInput(section80c),
        section80d: parseNumberInput(section80d),
        otherDeductions: parseNumberInput(otherDeductions),
      }),
    [annualSalary, hraReceived, isMetro, otherDeductions, rentPaid, section80c, section80d],
  );

  const verdictColor =
    result?.verdict === "old"
      ? "border-brand-blue/40 bg-brand-blue/10"
      : result?.verdict === "new"
        ? "border-tool-convert/40 bg-tool-convert/10"
        : "border-surface-border bg-surface-card";

  return (
    <>
<IndiaRulesBadge toolSlug="tax-regime-comparison" />

          <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">
            <CalculatorField label="Annual Gross Salary (₹)" htmlFor="salary">
              <CalculatorInput id="salary" value={annualSalary} onChange={setAnnualSalary} placeholder="8,00,000" />
            </CalculatorField>
            <CalculatorField label="HRA Received (₹/month)" htmlFor="hra">
              <CalculatorInput id="hra" value={hraReceived} onChange={setHraReceived} placeholder="20,000" />
            </CalculatorField>
            <CalculatorField label="Rent Paid (₹/month)" htmlFor="rent">
              <CalculatorInput id="rent" value={rentPaid} onChange={setRentPaid} placeholder="15,000" />
            </CalculatorField>
            <CalculatorField label="City Type" htmlFor="metro">
              <ToggleButtonGroup
                value={isMetro}
                onChange={setIsMetro}
                ariaLabel="Metro city"
                options={[
                  { value: "metro" as const, label: "Metro" },
                  { value: "non-metro" as const, label: "Non-Metro" },
                ]}
              />
            </CalculatorField>
            <CalculatorField label="Section 80C (₹/year)" htmlFor="80c">
              <CalculatorInput id="80c" value={section80c} onChange={setSection80c} placeholder="1,50,000" />
            </CalculatorField>
            <CalculatorField label="Section 80D (₹/year)" htmlFor="80d">
              <CalculatorInput id="80d" value={section80d} onChange={setSection80d} placeholder="25,000" />
            </CalculatorField>
            <div className="sm:col-span-2">
              <CalculatorField label="Other Deductions (₹/year)" htmlFor="other">
                <CalculatorInput id="other" value={otherDeductions} onChange={setOtherDeductions} placeholder="0" />
              </CalculatorField>
            </div>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className={`rounded-xl border p-5 text-center text-sm font-medium ${verdictColor}`}>
                {result.verdictMessage}
                <div className="mt-2 flex justify-center">
                  <CopyValueButton value={result.verdictMessage} label="Copy verdict" />
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="bg-surface-elevated">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-content-secondary" />
                      <th className="px-4 py-3 text-left font-medium text-content-secondary">Old Regime</th>
                      <th className="px-4 py-3 text-left font-medium text-content-secondary">New Regime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row) => (
                      <tr key={row.label} className="border-t border-surface-border">
                        <td className="px-4 py-2.5 text-content-primary">{row.label}</td>
                        <td className="px-4 py-2.5 font-medium">{fmt(row.oldValue)}</td>
                        <td className="px-4 py-2.5 font-medium">{fmt(row.newValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-content-muted">
                HRA exemption is calculated as the minimum of: (1) Actual HRA received, (2) Rent paid minus 10% of basic salary, (3) 50%/40% of basic salary. HRA exemption is not available under the New Regime. Basic assumed at 40% of gross for HRA calculation.
              </p>
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Scale, title: "One input", desc: "Enter salary and deductions once" },
              { icon: GitCompare, title: "Side by side", desc: "Old vs new regime in one view" },
              { icon: Sparkles, title: "Clear verdict", desc: "See which regime saves more" },
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

