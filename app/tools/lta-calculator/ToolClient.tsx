"use client";

import { useState } from "react";
import { Calculator, Plane, Receipt } from "lucide-react";
import { CalculatorField, CalculatorInput } from "@/components/calculator/CalculatorUi";
import { calculateLTA, LTA_RULES } from "@/lib/lta-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";

const howItWorksSteps = [
  { step: "01", icon: Plane, title: "Enter LTA & Expense", description: "Enter LTA received and travel costs" },
  { step: "02", icon: Calculator, title: "Calculate", description: "See exempt vs taxable amount" },
  { step: "03", icon: Receipt, title: "See Exemption", description: "Review your LTA tax exemption" },
];

export default function LtaCalculatorPage() {
  const { symbol, currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency);

  const [ltaReceived, setLtaReceived] = useState("50000");
  const [travelExpense, setTravelExpense] = useState("40000");
  const [trips, setTrips] = useState("2");
  const [result, setResult] = useState<ReturnType<typeof calculateLTA> | null>(null);

  const handleCalculate = () => {
    setResult(calculateLTA({
      ltaReceived: parseNumberInput(ltaReceived),
      actualTravelExpense: parseNumberInput(travelExpense),
      numberOfTrips: parseNumberInput(trips),
    }));
  };

  return (
    <>
<IndiaRulesBadge toolSlug="lta-calculator" />

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`LTA Received (annual ${symbol})`} htmlFor="lta-received"><CalculatorInput id="lta-received" value={ltaReceived} onChange={setLtaReceived} /></CalculatorField>
            <CalculatorField label={`Actual Travel Expense (${symbol})`} htmlFor="lta-expense"><CalculatorInput id="lta-expense" value={travelExpense} onChange={setTravelExpense} /></CalculatorField>
            <CalculatorField label="Number of Trips this block" htmlFor="lta-trips"><CalculatorInput id="lta-trips" value={trips} onChange={setTrips} placeholder="2" /></CalculatorField>
            <button type="button" onClick={handleCalculate} className="w-full rounded-xl bg-tool-photo py-3 text-sm font-semibold text-white">Calculate</button>
          </div>
          {result && (
            <div className="mx-auto mt-8 max-w-xl grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-center"><p className="text-sm text-content-secondary">Exempt Amount</p><p className="mt-2 text-2xl font-bold text-green-400">{fmt(result.exemptAmount)}</p></div>
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-center"><p className="text-sm text-content-secondary">Taxable Amount</p><p className="mt-2 text-2xl font-bold text-red-400">{fmt(result.taxableAmount)}</p></div>
            </div>
          )}
          <div className="mx-auto mt-8 max-w-xl rounded-xl border border-surface-border bg-surface-card p-5 text-sm text-content-secondary">
            <p className="font-medium text-content-primary">LTA Rules</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>
                Current block: {LTA_RULES.currentBlock} (previous block{" "}
                {LTA_RULES.previousBlock} ended 31 Dec 2025)
              </li>
              <li>Max {LTA_RULES.maxJourneysPerBlock} journeys per {LTA_RULES.blockYears}-year block</li>
              <li>{LTA_RULES.eligibleExpenses}</li>
              <li>{LTA_RULES.taxRegimeNote}</li>
            </ul>
          </div>
          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{howItWorksSteps.map((s) => (<div key={s.title} className="rounded-xl border border-surface-border bg-surface-card p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-photo/10"><s.icon className="h-5 w-5 text-tool-photo" /></div><p className="text-xs font-semibold text-tool-photo">{s.step}</p><p className="mt-1 font-semibold">{s.title}</p><p className="mt-1 text-sm text-content-secondary">{s.description}</p></div>))}</div>
          </div>
    </>
  );
}

