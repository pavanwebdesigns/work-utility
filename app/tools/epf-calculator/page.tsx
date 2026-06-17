"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, LineChart, PiggyBank } from "lucide-react";
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
} from "@/components/calculator/CalculatorUi";
import { calculateEPF, DEFAULT_EPF_INTEREST_RATE } from "@/lib/epf-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";

const howItWorksSteps = [
  { step: "01", icon: PiggyBank, title: "Enter Details", description: "Enter salary, age, and EPF balance" },
  { step: "02", icon: Calculator, title: "Calculate", description: "See projected EPF maturity" },
  { step: "03", icon: LineChart, title: "See Maturity", description: "Review year-by-year growth" },
];

export default function EpfCalculatorPage() {
  const { symbol, currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency);

  const [basicSalary, setBasicSalary] = useState("30000");
  const [currentAge, setCurrentAge] = useState("25");
  const [retirementAge, setRetirementAge] = useState("58");
  const [currentBalance, setCurrentBalance] = useState("50000");
  const [annualIncrement, setAnnualIncrement] = useState("5");
  const [interestRate, setInterestRate] = useState(String(DEFAULT_EPF_INTEREST_RATE));
  const [result, setResult] = useState<ReturnType<typeof calculateEPF> | null>(null);

  const handleCalculate = () => {
    setResult(
      calculateEPF({
        basicSalary: parseNumberInput(basicSalary),
        employeeContribution: 12,
        employerContribution: 12,
        currentAge: parseNumberInput(currentAge),
        retirementAge: parseNumberInput(retirementAge),
        currentEPFBalance: parseNumberInput(currentBalance),
        annualIncrement: parseNumberInput(annualIncrement),
        interestRate: parseNumberInput(interestRate),
      }),
    );
  };

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary">← All Tools</Link>
        </div>
        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <PiggyBank className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">EPF Calculator — Provident Fund Maturity</h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">Estimate your Employee Provident Fund maturity with employer and employee contributions.</p>
            <div className="mt-4 flex justify-center"><FavoriteButton slug="epf-calculator" /></div>
          </div>

          <IndiaRulesBadge toolSlug="epf-calculator" />

          <div className="mx-auto mt-10 max-w-xl space-y-5">
            <CalculatorField label={`Basic Salary (${symbol}/month)`} htmlFor="epf-salary"><CalculatorInput id="epf-salary" value={basicSalary} onChange={setBasicSalary} placeholder="30,000" /></CalculatorField>
            <CalculatorField label="Current Age" htmlFor="epf-age"><CalculatorInput id="epf-age" value={currentAge} onChange={setCurrentAge} placeholder="25" /></CalculatorField>
            <CalculatorField label="Retirement Age" htmlFor="epf-retire"><CalculatorInput id="epf-retire" value={retirementAge} onChange={setRetirementAge} placeholder="58" /></CalculatorField>
            <CalculatorField label={`Current EPF Balance (${symbol})`} htmlFor="epf-balance"><CalculatorInput id="epf-balance" value={currentBalance} onChange={setCurrentBalance} placeholder="50,000" /></CalculatorField>
            <CalculatorField label="Annual Salary Increment (%)" htmlFor="epf-inc"><CalculatorInput id="epf-inc" value={annualIncrement} onChange={setAnnualIncrement} placeholder="5" /></CalculatorField>
            <CalculatorField label="Interest Rate (% p.a.)" htmlFor="epf-rate"><CalculatorInput id="epf-rate" value={interestRate} onChange={setInterestRate} placeholder={String(DEFAULT_EPF_INTEREST_RATE)} /></CalculatorField>
            <button type="button" onClick={handleCalculate} className="w-full rounded-xl bg-tool-convert py-3 text-sm font-semibold text-white hover:bg-tool-convert/90">Calculate</button>
          </div>
          {result && (
            <div className="mx-auto mt-8 max-w-xl space-y-5">
              <ResultCard label="Maturity Amount" value={fmt(result.maturityAmount)} highlight />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-surface-border bg-surface-card p-4"><p className="text-xs text-content-secondary">Employee</p><p className="mt-1 font-bold text-content-primary">{fmt(result.totalEmployeeContribution)}</p></div>
                <div className="rounded-xl border border-surface-border bg-surface-card p-4"><p className="text-xs text-content-secondary">Employer (EPF)</p><p className="mt-1 font-bold text-content-primary">{fmt(result.totalEmployerContribution)}</p></div>
                <div className="rounded-xl border border-surface-border bg-surface-card p-4"><p className="text-xs text-content-secondary">Interest</p><p className="mt-1 font-bold text-tool-convert">{fmt(result.totalInterestEarned)}</p></div>
              </div>
              <div className="rounded-xl border border-surface-border bg-surface-card p-5">
                <p className="mb-3 text-sm font-medium text-content-primary">Year-by-Year Balance</p>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm"><thead><tr className="border-b border-surface-border text-left text-content-secondary"><th className="pb-2">Year</th><th className="pb-2">Balance</th></tr></thead>
                    <tbody>{result.yearlyBreakdown.map((r) => (<tr key={r.year} className="border-b border-surface-border/50"><td className="py-2">{r.year}</td><td className="py-2 text-tool-convert">{fmt(r.balance)}</td></tr>))}</tbody>
                  </table>
                </div>
              </div>
              <p className="text-center text-xs text-content-muted">Employer contribution split — 3.67% to EPF, 8.33% to EPS (Employee Pension Scheme), as per current rules.</p>
            </div>
          )}
          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">How It Works</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{howItWorksSteps.map((s) => (<div key={s.title} className="rounded-xl border border-surface-border bg-surface-card p-5"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-tool-convert/10"><s.icon className="h-5 w-5 text-tool-convert" /></div><p className="text-xs font-semibold text-tool-convert">{s.step}</p><p className="mt-1 font-semibold text-content-primary">{s.title}</p><p className="mt-1 text-sm text-content-secondary">{s.description}</p></div>))}</div>
          </div>
          <RelatedTools currentSlug="epf-calculator" /><ToolFeedback toolName="EPF Calculator" /><ToolSeoContent slug="epf-calculator" /><DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
