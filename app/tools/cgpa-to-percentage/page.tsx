"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GraduationCap, Percent, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  BreakdownRow,
  CalculatorField,
  CalculatorInput,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  calculateCgpaToPercentage,
  calculatePercentageToCgpa,
  type CgpaScale,
} from "@/lib/cgpa-calculator";
import { formatINRNumber, parseNumberInput } from "@/lib/format-inr";

type ConverterMode = "cgpa-to-percentage" | "percentage-to-cgpa";

export default function CgpaToPercentagePage() {
  const [mode, setMode] = useState<ConverterMode>("cgpa-to-percentage");
  const [scale, setScale] = useState<CgpaScale>("10");
  const [cgpa, setCgpa] = useState("8.2");
  const [percentage, setPercentage] = useState("77.9");

  const cgpaResult = useMemo(() => {
    if (mode !== "cgpa-to-percentage") return null;
    return calculateCgpaToPercentage(parseNumberInput(cgpa), scale);
  }, [cgpa, mode, scale]);

  const percentageResult = useMemo(() => {
    if (mode !== "percentage-to-cgpa") return null;
    return calculatePercentageToCgpa(parseNumberInput(percentage));
  }, [mode, percentage]);

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
              <GraduationCap className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              CGPA to Percentage Converter — Free Online Calculator
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Convert CGPA to percentage using VTU, CBSE, and 4-point scale
              formulas. Reverse converter included.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="cgpa-to-percentage" />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label="Converter Mode" htmlFor="cgpa-mode">
              <ToggleButtonGroup
                value={mode}
                onChange={setMode}
                ariaLabel="CGPA converter mode"
                options={[
                  { value: "cgpa-to-percentage", label: "CGPA → Percentage" },
                  { value: "percentage-to-cgpa", label: "Percentage → CGPA" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="University Scale" htmlFor="cgpa-scale">
              <ToggleButtonGroup
                value={scale}
                onChange={setScale}
                ariaLabel="University CGPA scale"
                options={[
                  { value: "10", label: "10 Point" },
                  { value: "4", label: "4 Point" },
                ]}
              />
            </CalculatorField>

            {mode === "cgpa-to-percentage" ? (
              <CalculatorField label="CGPA" htmlFor="cgpa-value">
                <CalculatorInput
                  id="cgpa-value"
                  value={cgpa}
                  onChange={setCgpa}
                  placeholder={scale === "10" ? "8.2" : "3.5"}
                />
              </CalculatorField>
            ) : (
              <CalculatorField label="Percentage (%)" htmlFor="percentage-value">
                <CalculatorInput
                  id="percentage-value"
                  value={percentage}
                  onChange={setPercentage}
                  placeholder="77.9"
                />
              </CalculatorField>
            )}
          </div>

          {cgpaResult && (
            <div className="mx-auto mt-10 max-w-xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultCard
                  label="VTU / Anna University"
                  value={`${formatINRNumber(cgpaResult.vtuPercentage, 2)}%`}
                  highlight
                />
                <ResultCard
                  label="CBSE Formula"
                  value={`${formatINRNumber(cgpaResult.cbsePercentage, 2)}%`}
                />
              </div>
              <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                <BreakdownRow
                  label="4-Point Scale Equivalent"
                  value={`${formatINRNumber(cgpaResult.fourPointPercentage, 2)}%`}
                />
                <BreakdownRow label="Grade Equivalent" value={cgpaResult.grade} />
              </div>
            </div>
          )}

          {percentageResult && (
            <div className="mx-auto mt-10 max-w-xl space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultCard
                  label="VTU / Anna CGPA"
                  value={formatINRNumber(percentageResult.vtuCgpa, 2)}
                  highlight
                />
                <ResultCard
                  label="CBSE CGPA"
                  value={formatINRNumber(percentageResult.cbseCgpa, 2)}
                />
              </div>
              <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                <BreakdownRow
                  label="4-Point Scale CGPA"
                  value={formatINRNumber(percentageResult.fourPointCgpa, 2)}
                />
                <BreakdownRow label="Grade Equivalent" value={percentageResult.grade} />
              </div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: GraduationCap, title: "Choose Scale", description: "Select 10-point or 4-point scale" },
                { step: "02", icon: Percent, title: "Enter Value", description: "Add CGPA or percentage" },
                { step: "03", icon: RefreshCw, title: "Compare Formulas", description: "See VTU, CBSE, and grade results" },
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

          <RelatedTools currentSlug="cgpa-to-percentage" />
          <ToolFeedback toolName="CGPA to Percentage Converter" />
          <ToolSeoContent slug="cgpa-to-percentage" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
