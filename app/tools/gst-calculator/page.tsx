"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Percent, Receipt } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { GST_RATES, calculateGst, type GstMode } from "@/lib/gst-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useCurrency } from "@/lib/currency-context";
import { IndiaTaxNotice } from "@/components/IndiaTaxNotice";

export default function GstCalculatorPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);
  const [amount, setAmount] = useState("10000");
  const [gstRate, setGstRate] = useState("18");
  const [mode, setMode] = useState<GstMode>("add");

  const result = useMemo(() => {
    return calculateGst(parseNumberInput(amount), Number(gstRate), mode);
  }, [amount, gstRate, mode]);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <Percent className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              GST Calculator — Calculate GST Amount Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Add or remove GST from any amount with CGST and SGST split for
              Indian tax rates.
            </p>
          </div>

          <IndiaTaxNotice />

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Amount (${symbol})`} htmlFor="gst-amount">
              <CalculatorInput
                id="gst-amount"
                value={amount}
                onChange={setAmount}
                placeholder="10,000"
              />
            </CalculatorField>

            <CalculatorField label="GST Rate" htmlFor="gst-rate">
              <CalculatorSelect
                id="gst-rate"
                value={gstRate}
                onChange={setGstRate}
                options={GST_RATES.map((rate) => ({
                  value: String(rate),
                  label: `${rate}%`,
                }))}
                ariaLabel="GST rate"
              />
            </CalculatorField>

            <CalculatorField label="Calculation Type" htmlFor="gst-mode">
              <ToggleButtonGroup
                value={mode}
                onChange={setMode}
                ariaLabel="GST calculation type"
                options={[
                  { value: "add", label: "Add GST" },
                  { value: "remove", label: "Remove GST" },
                ]}
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Original Amount"
                  value={fmt(result.originalAmount, 2)}
                />
                <ResultCard
                  label="GST Amount"
                  value={fmt(result.gstAmount, 2)}
                  highlight
                />
                <ResultCard
                  label="Total Amount"
                  value={fmt(result.totalAmount, 2)}
                />
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                <BreakdownRow label="CGST (50%)" value={fmt(result.cgst, 2)} />
                <BreakdownRow label="SGST (50%)" value={fmt(result.sgst, 2)} />
                <BreakdownRow label="Total GST" value={fmt(result.gstAmount, 2)} />
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Receipt, title: "Enter Amount", description: "Add base or GST-inclusive amount" },
                { step: "02", icon: Percent, title: "Choose Rate", description: "Select 0% to 28% GST slab" },
                { step: "03", icon: Calculator, title: "Get Breakdown", description: "See CGST, SGST, and total" },
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

          <RelatedTools currentSlug="gst-calculator" />
          <ToolFeedback toolName="GST Calculator" />
          <ToolSeoContent slug="gst-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
