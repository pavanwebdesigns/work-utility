"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, DollarSign, Timer } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CalculatorField, CalculatorInput, ToggleButtonGroup } from "@/components/calculator/CalculatorUi";
import { hourlyToSalary, salaryToHourly } from "@/lib/hourly-to-salary";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useCurrency } from "@/lib/currency-context";

const howItWorksSteps = [
  { step: "01", icon: DollarSign, title: "Enter Rate", description: "Enter hourly rate or annual salary" },
  { step: "02", icon: Timer, title: "Set Hours", description: "Set hours per week and weeks per year" },
  { step: "03", icon: Clock, title: "See All Periods", description: "View hourly, daily, weekly, monthly, annual" },
];

export default function HourlyToSalaryPage() {
  const { symbol, currency } = useCurrency();
  const fmt = (v: number, d = 0) => formatCurrency(v, currency, d);

  const [mode, setMode] = useState<"hourly" | "salary">("hourly");
  const [hourlyRate, setHourlyRate] = useState("25");
  const [annualSalary, setAnnualSalary] = useState("52000");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const result = useMemo(() => {
    const hpw = parseNumberInput(hoursPerWeek) || 40;
    const wpy = parseNumberInput(weeksPerYear) || 52;
    const rate = mode === "hourly"
      ? parseNumberInput(hourlyRate)
      : salaryToHourly(parseNumberInput(annualSalary), hpw, wpy);
    return hourlyToSalary(rate, hpw, wpy);
  }, [mode, hourlyRate, annualSalary, hoursPerWeek, weeksPerYear]);

  const cards = [
    { label: "Hourly", value: result.hourly },
    { label: "Daily", value: result.daily },
    { label: "Weekly", value: result.weekly },
    { label: "Bi-weekly", value: result.biweekly },
    { label: "Monthly", value: result.monthly },
    { label: "Annual", value: result.annual },
  ];

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10"><Link href="/" className="text-sm text-content-secondary hover:text-content-primary">← All Tools</Link></div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10"><Clock className="h-6 w-6 text-brand-blue" /></div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">Hourly to Salary Calculator</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Convert hourly wage to annual, monthly, or weekly salary instantly.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="hourly-to-salary" /></div>
          </div>
          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <ToggleButtonGroup value={mode} onChange={setMode} ariaLabel="Conversion mode" options={[{ value: "hourly", label: "Hourly → Salary" }, { value: "salary", label: "Salary → Hourly" }]} />
            {mode === "hourly" ? (
              <CalculatorField label={`Hourly Rate (${symbol})`} htmlFor="hts-hourly"><CalculatorInput id="hts-hourly" value={hourlyRate} onChange={setHourlyRate} /></CalculatorField>
            ) : (
              <CalculatorField label={`Annual Salary (${symbol})`} htmlFor="hts-annual"><CalculatorInput id="hts-annual" value={annualSalary} onChange={setAnnualSalary} /></CalculatorField>
            )}
            <CalculatorField label="Hours per Week" htmlFor="hts-hpw"><CalculatorInput id="hts-hpw" value={hoursPerWeek} onChange={setHoursPerWeek} placeholder="40" /></CalculatorField>
            <CalculatorField label="Weeks per Year" htmlFor="hts-wpy"><CalculatorInput id="hts-wpy" value={weeksPerYear} onChange={setWeeksPerYear} placeholder="52" /></CalculatorField>
          </div>
          <div className="mx-auto mt-8 max-w-xl grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cards.map((c) => (
              <div key={c.label} className="rounded-xl border border-surface-border bg-surface-card p-4 text-center">
                <p className="text-xs text-content-secondary">{c.label}</p>
                <p className="mt-1 text-lg font-bold text-brand-blue">{fmt(c.value, c.label === "Hourly" ? 2 : 0)}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{howItWorksSteps.map((s) => (<div key={s.title} className="rounded-xl border border-surface-border bg-surface-card p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10"><s.icon className="h-5 w-5 text-brand-blue" /></div><p className="text-xs font-semibold text-brand-blue">{s.step}</p><p className="mt-1 font-semibold">{s.title}</p><p className="mt-1 text-sm text-content-secondary">{s.description}</p></div>))}</div>
          </div>
          <RelatedTools currentSlug="hourly-to-salary" /><ToolFeedback toolName="Hourly to Salary Calculator" /><ToolSeoContent slug="hourly-to-salary" /><DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
