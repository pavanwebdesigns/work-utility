"use client";

import { useMemo, useState } from "react";
import { Copy, Minus, Plus, Receipt, Users } from "lucide-react";
import {
  CalculatorField,
  CalculatorInput,
} from "@/components/calculator/CalculatorUi";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { calculateTip, TIP_PRESETS } from "@/lib/tip-calculator";

export default function TipCalculatorPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (value: number) => formatCurrency(value, currency, 2);

  const [bill, setBill] = useState("100");
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState(1);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const billAmount = parseNumberInput(bill);
    if (billAmount <= 0) return null;
    return calculateTip(billAmount, tipPercent, Math.max(1, people));
  }, [bill, tipPercent, people]);

  const copySummary = async () => {
    if (!result) return;
    const lines = [
      `Bill: ${fmt(parseNumberInput(bill))}`,
      `Tip (${tipPercent}%): ${fmt(result.tipAmount)}`,
      `Total: ${fmt(result.totalAmount)}`,
    ];
    if (people > 1) {
      lines.push(`Per Person: ${fmt(result.perPerson)}`);
      lines.push(`Tip Per Person: ${fmt(result.tipPerPerson)}`);
    }
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
<div className="mt-10 space-y-5">
            <CalculatorField label={`${symbol} Bill Amount`} htmlFor="bill-amount">
              <CalculatorInput
                id="bill-amount"
                value={bill}
                onChange={setBill}
                placeholder="Enter bill amount"
              />
            </CalculatorField>

            <div>
              <p className="mb-2 block text-sm font-medium text-content-primary">
                Tip Percentage
              </p>
              <div className="flex flex-wrap gap-2">
                {TIP_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setTipPercent(preset)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
                      tipPercent === preset
                        ? "border-tool-convert bg-tool-convert/10 text-tool-convert"
                        : "border-surface-border bg-surface-card text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <CalculatorInput
                  id="custom-tip"
                  value={String(tipPercent)}
                  onChange={(v) => {
                    const n = parseFloat(v.replace(/[^\d.]/g, ""));
                    setTipPercent(Number.isFinite(n) ? n : 0);
                  }}
                  placeholder="Custom tip %"
                  inputMode="decimal"
                  ariaLabel="Custom tip percentage"
                />
              </div>
            </div>

            <CalculatorField label="Number of People" htmlFor="people-count">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-surface-card text-content-primary transition-colors hover:bg-surface-elevated"
                  aria-label="Decrease people"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <CalculatorInput
                  id="people-count"
                  value={String(people)}
                  onChange={(v) => {
                    const n = parseInt(v.replace(/\D/g, ""), 10);
                    setPeople(Number.isFinite(n) && n > 0 ? n : 1);
                  }}
                  inputMode="numeric"
                  ariaLabel="Number of people"
                />
                <button
                  type="button"
                  onClick={() => setPeople((p) => p + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-surface-card text-content-primary transition-colors hover:bg-surface-elevated"
                  aria-label="Increase people"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </CalculatorField>

            {currency === "USD" && (
              <p className="rounded-lg border border-tool-convert/20 bg-tool-convert/5 px-3 py-2 text-xs text-content-secondary">
                Standard US tip is 15–20%
              </p>
            )}

            <div className="rounded-xl border border-surface-border bg-surface-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-content-primary">Results</h2>
                <button
                  type="button"
                  onClick={copySummary}
                  disabled={!result}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border px-2.5 py-1 text-xs font-medium text-content-secondary transition-colors hover:text-content-primary disabled:opacity-50"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-content-secondary">Tip Amount</span>
                  <span className="font-semibold text-content-primary">
                    {result ? fmt(result.tipAmount) : fmt(0)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-surface-border pt-3">
                  <span className="text-content-secondary">Total Bill</span>
                  <span className="text-xl font-bold text-tool-convert">
                    {result ? fmt(result.totalAmount) : fmt(0)}
                  </span>
                </div>
                {people > 1 && result && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-content-secondary">Per Person</span>
                      <span className="font-semibold text-content-primary">
                        {fmt(result.perPerson)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-content-secondary">Tip Per Person</span>
                      <span className="font-semibold text-content-primary">
                        {fmt(result.tipPerPerson)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Receipt, title: "Enter Bill", description: "Type the total bill amount" },
                { step: "02", icon: Plus, title: "Choose Tip", description: "Select or enter tip percentage" },
                { step: "03", icon: Users, title: "Split", description: "Divide between friends" },
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

