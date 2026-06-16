"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, Calculator, Scale, TrendingUp } from "lucide-react";
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
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  calculateBMI,
  getBMICategory,
  getHealthyWeightRange,
  type UnitSystem,
} from "@/lib/bmi-calculator";
import { parseNumberInput } from "@/lib/format-inr";

const howItWorksSteps = [
  {
    step: "01",
    icon: Scale,
    title: "Enter",
    description: "Enter your weight and height",
  },
  {
    step: "02",
    icon: Calculator,
    title: "Calculate",
    description: "Click calculate to get your BMI",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "See Category",
    description: "View your BMI category and healthy range",
  },
];

const BMI_ZONES = [
  { label: "Underweight", max: 18.5, color: "#3B82F6" },
  { label: "Normal", max: 25, color: "#10B981" },
  { label: "Overweight", max: 30, color: "#F59E0B" },
  { label: "Obese", max: 40, color: "#EF4444" },
];

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [result, setResult] = useState<number | null>(null);
  const [category, setCategory] = useState<{
    category: string;
    color: string;
  } | null>(null);

  const handleCalculate = () => {
    const w = parseNumberInput(weight);
    const h = parseNumberInput(height);
    if (w <= 0 || h <= 0) return;
    const bmi = calculateBMI(w, h, unit);
    setResult(bmi);
    setCategory(getBMICategory(bmi));
  };

  const healthyRange =
    result !== null
      ? getHealthyWeightRange(parseNumberInput(height), unit)
      : null;

  const weightUnit = unit === "metric" ? "kg" : "lbs";
  const heightUnit = unit === "metric" ? "cm" : "inches";

  const bmiPosition = result
    ? Math.min(Math.max((result / 40) * 100, 0), 100)
    : 0;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
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
              <Activity
                className="h-6 w-6 text-tool-convert"
                strokeWidth={1.75}
              />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              BMI Calculator — Body Mass Index
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate your Body Mass Index with metric or imperial units.
              Instant category results.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="bmi-calculator" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <ToggleButtonGroup
              value={unit}
              onChange={setUnit}
              ariaLabel="BMI unit system"
              options={[
                { value: "metric", label: "Metric (kg/cm)" },
                { value: "imperial", label: "Imperial (lbs/in)" },
              ]}
            />

            <CalculatorField
              label={`Weight (${weightUnit})`}
              htmlFor="bmi-weight"
            >
              <CalculatorInput
                id="bmi-weight"
                value={weight}
                onChange={setWeight}
                placeholder={unit === "metric" ? "70" : "154"}
              />
            </CalculatorField>

            <CalculatorField
              label={`Height (${heightUnit})`}
              htmlFor="bmi-height"
            >
              <CalculatorInput
                id="bmi-height"
                value={height}
                onChange={setHeight}
                placeholder={unit === "metric" ? "170" : "68"}
              />
            </CalculatorField>

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full cursor-pointer rounded-xl bg-tool-convert py-3 text-sm font-semibold text-white transition-colors hover:bg-tool-convert/90"
            >
              Calculate BMI
            </button>
          </div>

          {result !== null && category && (
            <div className="mx-auto mt-8 max-w-xl space-y-6">
              <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center">
                <p className="text-sm text-content-secondary">Your BMI</p>
                <p className="mt-2 text-5xl font-bold text-content-primary">
                  {result.toFixed(1)}
                </p>
                <span
                  className="mt-3 inline-block rounded-full px-4 py-1 text-sm font-semibold text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.category}
                </span>
              </div>

              {healthyRange && (
                <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <p className="text-sm font-medium text-content-primary">
                    Healthy weight range
                  </p>
                  <p className="mt-2 text-lg font-semibold text-tool-convert">
                    {healthyRange.min.toFixed(1)} – {healthyRange.max.toFixed(1)}{" "}
                    {weightUnit}
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <p className="mb-3 text-sm font-medium text-content-primary">
                  BMI Scale
                </p>
                <div className="relative h-6 overflow-hidden rounded-full">
                  <div className="flex h-full w-full">
                    {BMI_ZONES.map((zone, i) => {
                      const prevMax = i === 0 ? 0 : BMI_ZONES[i - 1].max;
                      const width = ((zone.max - prevMax) / 40) * 100;
                      return (
                        <div
                          key={zone.label}
                          style={{ width: `${width}%`, backgroundColor: zone.color }}
                          title={zone.label}
                        />
                      );
                    })}
                  </div>
                  <div
                    className="absolute top-0 h-full w-1 -translate-x-1/2 bg-white shadow-md"
                    style={{ left: `${bmiPosition}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-content-muted">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>

              <p className="text-center text-xs text-content-muted">
                BMI is a general indicator and does not account for muscle mass,
                bone density, or body composition.
              </p>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-surface-border bg-surface-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon
                      className="h-5 w-5 text-tool-convert"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-xs font-semibold text-tool-convert">
                    {step.step}
                  </p>
                  <p className="mt-1 font-semibold text-content-primary">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-content-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="bmi-calculator" />
          <ToolFeedback toolName="BMI Calculator" />
          <ToolSeoContent slug="bmi-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
