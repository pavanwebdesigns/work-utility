"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Percent, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import { formatINRNumber, parseNumberInput } from "@/lib/format-inr";
import {
  addSubtractPercentage,
  percentOf,
  percentageChange,
  whatPercentIs,
} from "@/lib/percentage-calculator";

type PercentageMode =
  | "percent-of"
  | "what-percent"
  | "change"
  | "add-subtract";

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<PercentageMode>("percent-of");
  const [valueA, setValueA] = useState("20");
  const [valueB, setValueB] = useState("500");
  const [addSubtractOp, setAddSubtractOp] = useState<"add" | "subtract">("add");

  const result = useMemo(() => {
    const a = parseNumberInput(valueA);
    const b = parseNumberInput(valueB);

    switch (mode) {
      case "percent-of": {
        const value = percentOf(a, b);
        return value === null ? null : `${formatINRNumber(value, 2)}`;
      }
      case "what-percent": {
        const value = whatPercentIs(a, b);
        return value === null ? null : `${formatINRNumber(value, 2)}%`;
      }
      case "change": {
        const value = percentageChange(a, b);
        if (value === null) return null;
        const direction = value >= 0 ? "increase" : "decrease";
        return `${formatINRNumber(Math.abs(value), 2)}% ${direction}`;
      }
      case "add-subtract": {
        const value = addSubtractPercentage(b, a, addSubtractOp);
        return value === null ? null : formatINRNumber(value, 2);
      }
    }
  }, [addSubtractOp, mode, valueA, valueB]);

  const labels = {
    "percent-of": {
      a: "Percentage (%)",
      b: "Number (Y)",
      result: "Result",
    },
    "what-percent": {
      a: "Value (X)",
      b: "Total (Y)",
      result: "Percentage",
    },
    change: {
      a: "Original Value",
      b: "New Value",
      result: "Percentage Change",
    },
    "add-subtract": {
      a: "Percentage (%)",
      b: "Value",
      result: "Updated Value",
    },
  } as const;

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <Percent className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Percentage Calculator — Free Online % Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate percentage of a number, find what percent one value is of
              another, percentage change, and add or subtract percentages.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="percentage-calculator" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Calculator Mode" htmlFor="percentage-mode">
              <ToggleButtonGroup
                value={mode}
                onChange={setMode}
                ariaLabel="Percentage calculator mode"
                options={[
                  { value: "percent-of", label: "X% of Y" },
                  { value: "what-percent", label: "X is % of Y" },
                  { value: "change", label: "% Change" },
                  { value: "add-subtract", label: "Add/Subtract" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label={labels[mode].a} htmlFor="percentage-a">
              <CalculatorInput
                id="percentage-a"
                value={valueA}
                onChange={setValueA}
                placeholder="20"
              />
            </CalculatorField>

            <CalculatorField label={labels[mode].b} htmlFor="percentage-b">
              <CalculatorInput
                id="percentage-b"
                value={valueB}
                onChange={setValueB}
                placeholder="500"
              />
            </CalculatorField>

            {mode === "add-subtract" && (
              <CalculatorField label="Operation" htmlFor="add-subtract-op">
                <ToggleButtonGroup
                  value={addSubtractOp}
                  onChange={setAddSubtractOp}
                  ariaLabel="Add or subtract percentage"
                  options={[
                    { value: "add", label: "Add %" },
                    { value: "subtract", label: "Subtract %" },
                  ]}
                />
              </CalculatorField>
            )}
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-md">
              <ResultCard label={labels[mode].result} value={result} highlight />
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Percent, title: "Pick a Mode", description: "Choose the type of percentage calculation" },
                { step: "02", icon: Plus, title: "Enter Values", description: "Type numbers and see results instantly" },
                { step: "03", icon: Percent, title: "Use Anywhere", description: "Discounts, marks, growth, and salary math" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                    <step.icon className="h-5 w-5 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="percentage-calculator" />
          <ToolFeedback toolName="Percentage Calculator" />
          <ToolSeoContent slug="percentage-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
