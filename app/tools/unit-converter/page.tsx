"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, Ruler, Scale } from "lucide-react";
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
} from "@/components/calculator/CalculatorUi";
import { parseNumberInput } from "@/lib/format-inr";
import {
  UNIT_CATEGORIES,
  convertToAllUnits,
  convertUnit,
  formatUnitValue,
  type UnitCategory,
} from "@/lib/unit-converter";

const CATEGORY_OPTIONS = Object.entries(UNIT_CATEGORIES).map(([value, config]) => ({
  value: value as UnitCategory,
  label: config.label,
}));

export default function UnitConverterPage() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState(UNIT_CATEGORIES.length.units[0].id);
  const [toUnit, setToUnit] = useState(UNIT_CATEGORIES.length.units[1].id);
  const [inputValue, setInputValue] = useState("1");

  const units = UNIT_CATEGORIES[category].units;
  const unitOptions = units.map((unit) => ({
    value: unit.id,
    label: unit.label,
  }));

  const convertedValue = useMemo(() => {
    return convertUnit(
      parseNumberInput(inputValue),
      fromUnit,
      toUnit,
      category
    );
  }, [category, fromUnit, inputValue, toUnit]);

  const allConversions = useMemo(() => {
    return convertToAllUnits(parseNumberInput(inputValue), fromUnit, category);
  }, [category, fromUnit, inputValue]);

  const handleCategoryChange = (nextCategory: UnitCategory) => {
    setCategory(nextCategory);
    const nextUnits = UNIT_CATEGORIES[nextCategory].units;
    setFromUnit(nextUnits[0].id);
    setToUnit(nextUnits[1]?.id ?? nextUnits[0].id);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (convertedValue !== null) {
      setInputValue(String(convertedValue));
    }
  };

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <Ruler className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Unit Converter — Convert Any Unit Free Online
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Convert length, weight, temperature, area, volume, speed, and
              data units instantly with real-time results.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Category" htmlFor="unit-category">
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Unit category"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleCategoryChange(option.value)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      category === option.value
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-surface-border bg-surface-card text-content-secondary hover:text-content-primary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </CalculatorField>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <CalculatorField label="From" htmlFor="from-unit">
                <CalculatorSelect
                  id="from-unit"
                  value={fromUnit}
                  onChange={setFromUnit}
                  options={unitOptions}
                  ariaLabel="From unit"
                />
                <div className="mt-3">
                  <CalculatorInput
                    id="from-value"
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="1"
                    ariaLabel="Value to convert"
                  />
                </div>
              </CalculatorField>

              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap units"
                className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-surface-card text-xl transition-colors hover:bg-surface-elevated"
              >
                ↔️
              </button>

              <CalculatorField label="To" htmlFor="to-unit">
                <CalculatorSelect
                  id="to-unit"
                  value={toUnit}
                  onChange={setToUnit}
                  options={unitOptions}
                  ariaLabel="To unit"
                />
                <div className="mt-3 rounded-xl border border-brand-blue/30 bg-brand-blue/10 px-4 py-3 text-lg font-semibold text-content-primary">
                  {convertedValue === null
                    ? "—"
                    : formatUnitValue(convertedValue, category)}
                </div>
              </CalculatorField>
            </div>
          </div>

          {allConversions.length > 0 && (
            <div className="mx-auto mt-10 max-w-xl rounded-xl border border-surface-border bg-surface-card px-5">
              <h2 className="py-4 font-semibold text-content-primary">
                All Conversions
              </h2>
              {allConversions.map(({ unit, value }) => (
                <BreakdownRow
                  key={unit.id}
                  label={unit.label}
                  value={formatUnitValue(value, category)}
                />
              ))}
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Ruler, title: "Pick Category", description: "Choose length, weight, temperature, and more" },
                { step: "02", icon: ArrowLeftRight, title: "Convert", description: "Select units and enter a value" },
                { step: "03", icon: Scale, title: "See All Units", description: "View every equivalent conversion at once" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-photo/10">
                    <step.icon className="h-5 w-5 text-tool-photo" />
                  </div>
                  <p className="text-2xl font-bold text-content-muted/40">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="unit-converter" />
          <ToolFeedback toolName="Unit Converter" />
          <ToolSeoContent slug="unit-converter" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
