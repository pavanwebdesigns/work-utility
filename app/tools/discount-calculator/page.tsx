"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Percent, Tag } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import {
  CalculatorField,
  CalculatorInput,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { useCurrency } from "@/lib/currency-context";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import {
  calculateDiscount,
  calculateDiscountPercent,
  calculateOriginalPrice,
} from "@/lib/discount-calculator";

type DiscountMode = "percent-off" | "find-percent" | "find-original";

const QUICK_DISCOUNTS = [5, 10, 20, 25, 30, 50, 70];

export default function DiscountCalculatorPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);

  const [mode, setMode] = useState<DiscountMode>("percent-off");
  const [originalPrice, setOriginalPrice] = useState("1000");
  const [discountPercent, setDiscountPercent] = useState("20");
  const [finalPrice, setFinalPrice] = useState("800");

  const result = useMemo(() => {
    const original = parseNumberInput(originalPrice);
    const discount = parseFloat(discountPercent) || 0;
    const final = parseNumberInput(finalPrice);

    switch (mode) {
      case "percent-off": {
        if (original <= 0) return null;
        const calc = calculateDiscount(original, discount);
        return {
          original,
          discountPercent: discount,
          discountAmount: calc.discountAmount,
          finalPrice: calc.finalPrice,
        };
      }
      case "find-percent": {
        if (original <= 0 || final < 0 || final > original) return null;
        const pct = calculateDiscountPercent(original, final);
        return {
          original,
          discountPercent: pct,
          discountAmount: original - final,
          finalPrice: final,
        };
      }
      case "find-original": {
        if (final <= 0 || discount <= 0 || discount >= 100) return null;
        const orig = calculateOriginalPrice(final, discount);
        const calc = calculateDiscount(orig, discount);
        return {
          original: orig,
          discountPercent: discount,
          discountAmount: calc.discountAmount,
          finalPrice: final,
        };
      }
    }
  }, [mode, originalPrice, discountPercent, finalPrice]);

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

        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-pdf/10">
              <Tag className="h-6 w-6 text-tool-pdf" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Discount Calculator — Find Sale Price Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate discount amount, percentage off, and final sale price instantly.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <CalculatorField label="Calculation Mode" htmlFor="discount-mode">
              <ToggleButtonGroup
                value={mode}
                onChange={setMode}
                ariaLabel="Discount calculation mode"
                options={[
                  { value: "percent-off", label: "% Off" },
                  { value: "find-percent", label: "Find %" },
                  { value: "find-original", label: "Original Price" },
                ]}
              />
            </CalculatorField>

            {(mode === "percent-off" || mode === "find-percent") && (
              <CalculatorField
                label={`Original Price (${symbol})`}
                htmlFor="original-price"
              >
                <CalculatorInput
                  id="original-price"
                  value={originalPrice}
                  onChange={setOriginalPrice}
                  placeholder="Enter original price"
                />
              </CalculatorField>
            )}

            {(mode === "percent-off" || mode === "find-original") && (
              <div>
                <CalculatorField
                  label="Discount Percentage (%)"
                  htmlFor="discount-percent"
                >
                  <CalculatorInput
                    id="discount-percent"
                    value={discountPercent}
                    onChange={setDiscountPercent}
                    placeholder="Enter discount %"
                  />
                </CalculatorField>
                <div className="mt-2 flex flex-wrap gap-2">
                  {QUICK_DISCOUNTS.map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDiscountPercent(String(pct))}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors ${
                        discountPercent === String(pct)
                          ? "border-tool-pdf bg-tool-pdf/10 text-tool-pdf"
                          : "border-surface-border bg-surface-card text-content-secondary hover:text-content-primary"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(mode === "find-percent" || mode === "find-original") && (
              <CalculatorField
                label={`Final Price (${symbol})`}
                htmlFor="final-price"
              >
                <CalculatorInput
                  id="final-price"
                  value={finalPrice}
                  onChange={setFinalPrice}
                  placeholder="Enter final price"
                />
              </CalculatorField>
            )}

            <div className="rounded-xl border border-surface-border bg-surface-card p-5">
              <h2 className="mb-4 text-sm font-semibold text-content-primary">Results</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-content-secondary">Original Price</span>
                  <span className="font-semibold text-content-primary">
                    {result ? fmt(result.original) : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-content-secondary">Discount</span>
                  <span className="font-semibold text-content-primary">
                    {result
                      ? `${result.discountPercent.toFixed(1)}% = ${fmt(result.discountAmount)} saved`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-surface-border pt-3">
                  <span className="text-content-secondary">Final Price</span>
                  <span className="text-xl font-bold text-tool-convert">
                    {result ? fmt(result.finalPrice) : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Tag, title: "Choose Mode", description: "Pick calculation type" },
                { step: "02", icon: Percent, title: "Enter Values", description: "Fill in the known values" },
                { step: "03", icon: Calculator, title: "Get Result", description: "See discount and final price" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-pdf/10">
                    <step.icon className="h-5 w-5 text-tool-pdf" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="discount-calculator" />
          <ToolFeedback toolName="Discount Calculator" />
          <ToolSeoContent slug="discount-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
