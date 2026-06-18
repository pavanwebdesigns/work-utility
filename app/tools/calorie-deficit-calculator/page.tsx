"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Flame, Scale, TrendingDown } from "lucide-react";
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
  CalculatorSelect,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  ACTIVITY_LABELS,
  calculateCalorieDeficit,
  GOAL_LABELS,
  type ActivityLevel,
  type DeficitGoal,
  type Gender,
  type UnitSystem,
} from "@/lib/calorie-deficit-calculator";
import { parseNumberInput } from "@/lib/format-inr";

const howItWorksSteps = [
  { step: "01", icon: Scale, title: "Enter details", description: "Age, gender, height, weight, and activity level" },
  { step: "02", icon: Calculator, title: "Choose goal", description: "Maintenance or a calorie deficit level" },
  { step: "03", icon: TrendingDown, title: "See targets", description: "BMR, TDEE, and daily calorie target" },
];

export default function CalorieDeficitCalculatorPage() {
  const [unit, setUnit] = useState<UnitSystem>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [activity, setActivity] = useState<ActivityLevel>("moderately-active");
  const [goal, setGoal] = useState<DeficitGoal>("moderate");
  const [result, setResult] = useState<ReturnType<typeof calculateCalorieDeficit> | null>(null);

  const handleCalculate = () => {
    const a = parseNumberInput(age);
    const w = parseNumberInput(weight);
    const h = parseNumberInput(height);
    if (a <= 0 || w <= 0 || h <= 0) return;
    setResult(calculateCalorieDeficit(w, h, a, gender, unit, activity, goal));
  };

  const weightUnit = unit === "metric" ? "kg" : "lbs";
  const heightUnit = unit === "metric" ? "cm" : "inches";

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <Flame className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Calorie Deficit Calculator Free</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Calculate BMR, maintenance calories (TDEE), and a daily target using the Mifflin-St Jeor formula.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="calorie-deficit-calculator" /></div>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <ToggleButtonGroup value={unit} onChange={setUnit} ariaLabel="Unit system"
              options={[{ value: "metric", label: "Metric (kg/cm)" }, { value: "imperial", label: "Imperial (lbs/in)" }]} />
            <ToggleButtonGroup value={gender} onChange={setGender} ariaLabel="Gender"
              options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }]} />
            <CalculatorField label="Age (years)" htmlFor="age"><CalculatorInput id="age" value={age} onChange={setAge} placeholder="30" /></CalculatorField>
            <CalculatorField label={`Weight (${weightUnit})`} htmlFor="weight"><CalculatorInput id="weight" value={weight} onChange={setWeight} placeholder={unit === "metric" ? "70" : "154"} /></CalculatorField>
            <CalculatorField label={`Height (${heightUnit})`} htmlFor="height"><CalculatorInput id="height" value={height} onChange={setHeight} placeholder={unit === "metric" ? "170" : "68"} /></CalculatorField>
            <CalculatorField label="Activity level" htmlFor="activity">
              <CalculatorSelect
                id="activity"
                value={activity}
                onChange={(v) => setActivity(v as ActivityLevel)}
                options={(Object.entries(ACTIVITY_LABELS) as [ActivityLevel, string][]).map(([k, label]) => ({
                  value: k,
                  label,
                }))}
              />
            </CalculatorField>
            <CalculatorField label="Goal" htmlFor="goal">
              <CalculatorSelect
                id="goal"
                value={goal}
                onChange={(v) => setGoal(v as DeficitGoal)}
                options={(Object.entries(GOAL_LABELS) as [DeficitGoal, string][]).map(([k, label]) => ({
                  value: k,
                  label,
                }))}
              />
            </CalculatorField>
            <button type="button" onClick={handleCalculate} className="w-full rounded-xl bg-tool-convert py-3 text-sm font-semibold text-white hover:bg-tool-convert/90">Calculate</button>
          </div>

          {result && (
            <div className="mx-auto mt-8 max-w-xl space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-surface-border bg-surface-card p-5 text-center">
                  <p className="text-xs text-content-secondary">BMR</p>
                  <p className="mt-1 text-2xl font-bold text-content-primary">{result.bmr}</p>
                  <p className="text-xs text-content-muted">cal/day at rest</p>
                </div>
                <div className="rounded-xl border border-surface-border bg-surface-card p-5 text-center">
                  <p className="text-xs text-content-secondary">TDEE</p>
                  <p className="mt-1 text-2xl font-bold text-content-primary">{result.tdee}</p>
                  <p className="text-xs text-content-muted">maintenance cal/day</p>
                </div>
                <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 p-5 text-center">
                  <p className="text-xs text-content-secondary">Daily target</p>
                  <p className="mt-1 text-2xl font-bold text-tool-convert">{result.targetCalories}</p>
                  <p className="text-xs text-content-muted">{result.deficit > 0 ? `${result.deficit} cal deficit` : "maintenance"}</p>
                </div>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-content-secondary">
                <strong className="text-content-primary">Important:</strong> This tool provides a general estimate for informational purposes only — not medical or nutritional advice. Anyone with health conditions, a history of disordered eating, who is pregnant or breastfeeding, or considering a significant deficit should consult a doctor or registered dietitian.
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10">
                    <step.icon className="h-5 w-5 text-tool-convert" />
                  </div>
                  <p className="text-xs font-semibold text-tool-convert">{step.step}</p>
                  <p className="mt-1 font-semibold text-content-primary">{step.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedTools currentSlug="calorie-deficit-calculator" />
          <ToolFeedback toolName="Calorie Deficit Calculator" />
          <ToolSeoContent slug="calorie-deficit-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
