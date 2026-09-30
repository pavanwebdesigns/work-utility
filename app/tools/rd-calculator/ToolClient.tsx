"use client";

import { useMemo, useState } from "react";
import { Landmark } from "lucide-react";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import { calculateRd } from "@/lib/rd-calculator";
import {
  formatCurrency,
  formatIndianCompact,
  parseNumberInput,
} from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

function formatTenure(months: number): string {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${months} months`;
  if (rem === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years}y ${rem}m`;
}

export default function RdCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [interestRate, setInterestRate] = useState("7.0");
  const [tenureMonths, setTenureMonths] = useState(24);

  const result = useMemo(
    () =>
      calculateRd(
        monthlyDeposit,
        parseNumberInput(interestRate),
        tenureMonths,
      ),
    [interestRate, monthlyDeposit, tenureMonths],
  );

  return (
    <>
<IndiaRulesBadge toolSlug="rd-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField
              label={`Monthly Deposit (₹500 – ₹1,00,000) — ${monthlyDeposit.toLocaleString("en-IN")}`}
              htmlFor="monthly-deposit"
            >
              <input
                id="monthly-deposit"
                type="range"
                min={500}
                max={100000}
                step={500}
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label="Annual Interest Rate (% p.a.)" htmlFor="rate">
              <CalculatorInput
                id="rate"
                value={interestRate}
                onChange={setInterestRate}
                placeholder="7.0"
              />
            </CalculatorField>

            <CalculatorField
              label={`Tenure — ${formatTenure(tenureMonths)}`}
              htmlFor="tenure"
            >
              <input
                id="tenure"
                type="range"
                min={3}
                max={120}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard label="Total Deposited" value={fmt(result.totalDeposited)} />
                <ResultCard label="Interest Earned" value={fmt(result.interestEarned)} />
                <ResultCard label="Maturity Value" value={fmt(result.maturityValue)} highlight />
              </div>
              <p className="text-center text-sm text-content-muted">
                Maturity: {formatIndianCompact(result.maturityValue)}
                <CopyValueButton
                  value={fmt(result.maturityValue)}
                  label="Copy"
                  className="ml-2"
                />
              </p>

              <div className="rounded-xl border border-tool-photo/30 bg-tool-photo/5 px-4 py-3 text-sm text-content-secondary">
                <strong>TDS note:</strong> If your total interest across all bank
                accounts exceeds ₹40,000 in a year (₹50,000 for senior citizens),
                the bank deducts 10% TDS on RD interest. Submit Form 15G/15H if
                your income is below the taxable limit.
              </div>

              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                💡 If you invested the same total amount ({fmt(result.fdComparison.lumpSum)})
                as a lump sum FD at the same rate, maturity would be{" "}
                {fmt(result.fdComparison.fdMaturity)}. RD{" "}
                {result.fdComparison.rdBetter ? "gives more" : "gives less"} because
                deposits are spread over time (difference:{" "}
                {fmt(result.fdComparison.difference)}).
              </div>

              <div className="max-h-80 overflow-auto rounded-2xl border border-surface-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-surface-elevated">
                    <tr>
                      <th className="px-4 py-2 text-left">Period</th>
                      <th className="px-4 py-2 text-right">Deposited</th>
                      <th className="px-4 py-2 text-right">Interest</th>
                      <th className="px-4 py-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.periodRows.map((row) => (
                      <tr key={row.period} className="border-t border-surface-border">
                        <td className="px-4 py-2">{row.label}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.deposited)}</td>
                        <td className="px-4 py-2 text-right">{fmt(row.interest)}</td>
                        <td className="px-4 py-2 text-right font-medium">
                          {fmt(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary">
            <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-tool-photo" />
            <p>
              RD rates vary by bank and tenure — SBI typically offers 6.5–7.0%,
              HDFC 7.0–7.4% (June 2026). Verify current rates before opening an
              account.
            </p>
          </div>

          <div className="mt-10">
            
            
            
            
          </div>
    </>
  );
}

