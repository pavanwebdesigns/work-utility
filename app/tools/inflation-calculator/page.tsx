"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, TrendingDown, Wallet } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CalculatorField, CalculatorInput, ToggleButtonGroup } from "@/components/calculator/CalculatorUi";
import { AVG_INFLATION_RATES, calculateInflation } from "@/lib/inflation-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useCurrency } from "@/lib/currency-context";

const howItWorksSteps = [
  { step: "01", icon: Wallet, title: "Enter Amount", description: "Enter the amount to adjust" },
  { step: "02", icon: Calculator, title: "Set Years & Rate", description: "Set time period and inflation rate" },
  { step: "03", icon: TrendingDown, title: "See Impact", description: "See future or past value and purchasing power loss" },
];

export default function InflationCalculatorPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (v: number) => formatCurrency(v, currency);

  const [amount, setAmount] = useState("100000");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState(String(currency === "INR" ? AVG_INFLATION_RATES.India : AVG_INFLATION_RATES.US));
  const [mode, setMode] = useState<"future" | "past">("future");

  useEffect(() => {
    setRate(String(currency === "INR" ? AVG_INFLATION_RATES.India : AVG_INFLATION_RATES.US));
  }, [currency]);

  const result = useMemo(() => {
    return calculateInflation(
      parseNumberInput(amount),
      parseNumberInput(years),
      parseNumberInput(rate),
    );
  }, [amount, years, rate]);

  const displayValue = mode === "future" ? result.futureValue : result.pastValue;
  const displayLabel = mode === "future"
    ? "Future equivalent (same purchasing power)"
    : "Past equivalent (today's value)";

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10"><TrendingDown className="h-6 w-6 text-tool-pdf" /></div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Inflation Calculator</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Calculate the value of money over time adjusted for inflation.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="inflation-calculator" /></div>
          </div>
          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <ToggleButtonGroup value={mode} onChange={setMode} ariaLabel="Inflation calculation mode" options={[{ value: "future", label: "Future Value" }, { value: "past", label: "Past Value" }]} />
            <CalculatorField label={`Amount (${symbol})`} htmlFor="inf-amount"><CalculatorInput id="inf-amount" value={amount} onChange={setAmount} /></CalculatorField>
            <CalculatorField label="Number of Years" htmlFor="inf-years"><CalculatorInput id="inf-years" value={years} onChange={setYears} placeholder="10" /></CalculatorField>
            <CalculatorField label="Inflation Rate (% p.a.)" htmlFor="inf-rate"><CalculatorInput id="inf-rate" value={rate} onChange={setRate} placeholder="6.5" /></CalculatorField>
          </div>
          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center">
              <p className="text-sm text-content-secondary">{displayLabel}</p>
              <p className="mt-2 text-4xl font-bold text-tool-pdf">{fmt(displayValue)}</p>
              <p className="mt-3 text-sm text-content-muted">Purchasing power loss: {result.purchasingPowerLoss}%</p>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-card p-5">
              <p className="mb-3 text-sm font-medium text-content-primary">Value erosion over {parseNumberInput(years) || 0} years</p>
              <div className="flex h-8 overflow-hidden rounded-lg">
                <div className="bg-tool-pdf" style={{ width: `${100 - result.purchasingPowerLoss}%` }} title="Retained value" />
                <div className="bg-surface-elevated" style={{ width: `${result.purchasingPowerLoss}%` }} title="Lost to inflation" />
              </div>
              <div className="mt-2 flex justify-between text-xs text-content-muted">
                <span>Retained purchasing power</span>
                <span>Lost to inflation ({result.purchasingPowerLoss}%)</span>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{howItWorksSteps.map((s) => (<div key={s.title} className="rounded-xl border border-surface-border bg-surface-card p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-pdf/10"><s.icon className="h-5 w-5 text-tool-pdf" /></div><p className="text-xs font-semibold text-tool-pdf">{s.step}</p><p className="mt-1 font-semibold">{s.title}</p><p className="mt-1 text-sm text-content-secondary">{s.description}</p></div>))}</div>
          </div>
          <RelatedTools currentSlug="inflation-calculator" /><ToolFeedback toolName="Inflation Calculator" /><ToolSeoContent slug="inflation-calculator" /><DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
