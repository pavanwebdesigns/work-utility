"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, IndianRupee, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { LastUpdatedBadge } from "@/components/LastUpdatedBadge";
import { CopyValueButton } from "@/components/CopyValueButton";
import {
  CalculatorField,
  CalculatorInput,
  CalculatorSelect,
  ResultCard,
  ToggleButtonGroup,
} from "@/components/calculator/CalculatorUi";
import {
  NO_PT_STATES,
  PT_DISCLAIMER,
  PT_STATE_OPTIONS,
} from "@/lib/professional-tax-data";
import {
  calculateProfessionalTax,
  type PTGender,
} from "@/lib/professional-tax-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

const STATE_OPTIONS = [
  ...PT_STATE_OPTIONS,
  {
    value: "no_pt",
    label: "My state doesn't levy PT (Delhi, UP, Haryana…)",
  },
];

export default function ProfessionalTaxCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [stateKey, setStateKey] = useState("maharashtra");
  const [monthlySalary, setMonthlySalary] = useState("50000");
  const [gender, setGender] = useState<PTGender>("male");

  const result = useMemo(
    () =>
      calculateProfessionalTax({
        stateKey,
        monthlySalary: parseNumberInput(monthlySalary),
        gender,
      }),
    [gender, monthlySalary, stateKey],
  );

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary"
          >
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <Building2 className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Professional Tax Calculator India — All States 2026
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate state-wise professional tax for all 18 PT-levying states.
              Maharashtra women&apos;s exemption and February quirk included.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="professional-tax-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="professional-tax-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label="State" htmlFor="state">
              <CalculatorSelect
                id="state"
                value={stateKey}
                onChange={setStateKey}
                options={STATE_OPTIONS}
              />
            </CalculatorField>

            <CalculatorField label="Monthly Gross Salary (₹)" htmlFor="salary">
              <CalculatorInput
                id="salary"
                value={monthlySalary}
                onChange={setMonthlySalary}
                placeholder="50,000"
              />
            </CalculatorField>

            {stateKey === "maharashtra" && (
              <CalculatorField label="Gender" htmlFor="gender">
                <ToggleButtonGroup
                  value={gender}
                  onChange={setGender}
                  ariaLabel="Gender for Maharashtra exemption"
                  options={[
                    { value: "male" as const, label: "Male" },
                    { value: "female" as const, label: "Female" },
                  ]}
                />
              </CalculatorField>
            )}
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              {result.noPtState && (
                <p className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-content-secondary">
                  ✅ Your state does not levy Professional Tax — no PT deduction
                  applies to you. States without PT include{" "}
                  {NO_PT_STATES.join(", ")}.
                </p>
              )}

              {result.exempt && !result.noPtState && (
                <p className="rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-content-secondary">
                  ✅ Exempt! {result.exemptReason}
                </p>
              )}

              {!result.noPtState && !result.exempt && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ResultCard label="Monthly PT" value={fmt(result.monthlyPT)} highlight />
                  {result.februaryPT !== null && (
                    <ResultCard label="February PT" value={fmt(result.februaryPT)} />
                  )}
                  <ResultCard label="Annual PT" value={fmt(result.annualPT)} />
                  <ResultCard
                    label="Income Tax Saving (16(iii))"
                    value={fmt(result.incomeTaxSaving)}
                  />
                </div>
              )}

              {result.februaryNote && (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-content-secondary">
                  ⚠️ {result.februaryNote}
                </p>
              )}

              {result.halfYearlyNote && (
                <p className="text-center text-sm text-content-muted">
                  {result.halfYearlyNote}
                </p>
              )}

              {result.stateNotes && !result.exempt && (
                <p className="text-center text-sm text-content-secondary">
                  {result.stateNotes}
                </p>
              )}

              {result.annualPT > 0 && (
                <p className="text-center text-xs text-content-muted">
                  Section 16(iii) saving estimated at 31.2% (30% bracket + 4% cess).
                  <CopyValueButton
                    value={fmt(result.annualPT)}
                    label="Copy annual PT"
                    className="ml-2"
                  />
                </p>
              )}
            </div>
          )}

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            {PT_DISCLAIMER}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: MapPin, title: "18 states", desc: "All PT-levying state slabs" },
              { icon: IndianRupee, title: "Section 16(iii)", desc: "Income tax saving estimate" },
              { icon: Building2, title: "Maharashtra", desc: "Women exempt + Feb ₹300 quirk" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-tool-photo" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="professional-tax-calculator" />
          <ToolFeedback toolName="Professional Tax Calculator" />
          <ToolSeoContent slug="professional-tax-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
