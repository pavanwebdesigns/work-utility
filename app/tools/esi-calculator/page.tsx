"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, Shield, Stethoscope } from "lucide-react";
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
  ResultCard,
} from "@/components/calculator/CalculatorUi";
import {
  ESI_DISCLAIMER,
  calculateEsi,
} from "@/lib/esi-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function EsiCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [monthlyGross, setMonthlyGross] = useState("18000");
  const [isDisabled, setIsDisabled] = useState(false);

  const result = useMemo(
    () => calculateEsi(parseNumberInput(monthlyGross), isDisabled),
    [isDisabled, monthlyGross],
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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <Shield className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              ESI Calculator India — Employee State Insurance
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate ESI contributions — employee 0.75% and employer 3.25%.
              Check ₹21,000 eligibility and understand ESI benefits.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="esi-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="esi-calculator" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label="Monthly Gross Wages (₹)" htmlFor="gross">
              <CalculatorInput
                id="gross"
                value={monthlyGross}
                onChange={setMonthlyGross}
                placeholder="18,000"
              />
            </CalculatorField>

            <CalculatorField label="Disabled employee?" htmlFor="disabled">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsDisabled(false)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                    !isDisabled
                      ? "border-brand-blue bg-brand-blue/10 text-content-primary"
                      : "border-surface-border text-content-secondary"
                  }`}
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={() => setIsDisabled(true)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                    isDisabled
                      ? "border-brand-blue bg-brand-blue/10 text-content-primary"
                      : "border-surface-border text-content-secondary"
                  }`}
                >
                  Yes (₹25,000 limit)
                </button>
              </div>
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <p
                className={`rounded-xl border px-4 py-3 text-center text-sm ${
                  result.eligibility === "applicable"
                    ? "border-tool-convert/30 bg-tool-convert/5 text-content-secondary"
                    : "border-red-500/30 bg-red-500/5 text-content-secondary"
                }`}
              >
                {result.eligibilityMessage}
              </p>

              {result.eligibility === "applicable" && (
                <>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <ResultCard
                      label="Your contribution (0.75%)"
                      value={fmt(result.employeeMonthly)}
                    />
                    <ResultCard
                      label="Employer (3.25%)"
                      value={fmt(result.employerMonthly)}
                    />
                    <ResultCard
                      label="Total ESI (4%)"
                      value={fmt(result.totalMonthly)}
                      highlight
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <ResultCard
                      label="Your annual"
                      value={fmt(result.employeeAnnual)}
                    />
                    <ResultCard
                      label="Employer annual"
                      value={fmt(result.employerAnnual)}
                    />
                    <ResultCard
                      label="Total annual"
                      value={fmt(result.totalAnnual)}
                    />
                  </div>

                  <div className="rounded-xl border border-surface-border bg-surface-card p-4">
                    <p className="mb-3 text-sm font-semibold text-content-primary">
                      Net Salary Impact (estimated)
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-content-secondary">Gross Wages</span>
                        <span>{fmt(result.monthlyGrossWages)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-content-secondary">
                          Less: Employee ESI
                        </span>
                        <span>-{fmt(result.employeeMonthly)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-content-secondary">
                          Less: Professional Tax (est.)
                        </span>
                        <span>-{fmt(result.estimatedProfessionalTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-content-secondary">
                          Less: EPF Employee (est.)
                        </span>
                        <span>
                          -{fmt(result.estimatedEpfEmployee)}{" "}
                          <Link
                            href="/tools/epf-calculator"
                            className="text-brand-blue hover:underline"
                          >
                            →
                          </Link>
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-surface-border pt-2 font-semibold">
                        <span>Net Take-Home (est.)</span>
                        <span>
                          {fmt(result.estimatedNetTakeHome)}
                          <CopyValueButton
                            value={fmt(result.estimatedNetTakeHome)}
                            label="Copy"
                            className="ml-2"
                          />
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-content-muted">
                      Professional Tax varies by state. EPF applies if basic ≤
                      ₹15,000.
                    </p>
                  </div>
                </>
              )}

              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                <p className="font-medium text-content-primary">
                  🏥 What ESI covers for you:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>
                    Medical treatment for you and family (ESIC & empanelled
                    hospitals)
                  </li>
                  <li>
                    Sickness benefit: 70% of daily wages for up to 91 days
                  </li>
                  <li>Maternity benefit: 100% wages for 26 weeks</li>
                  <li>Disability benefit: permanent or temporary</li>
                  <li>
                    Dependent benefit: to family on death due to injury
                  </li>
                  <li>Funeral expenses: lump sum payment</li>
                </ul>
              </div>

              <p className="text-xs text-content-muted">
                Note: New/small establishments (less than 10 employees in
                manufacturing / 20 in others) may be exempt from ESI registration.
              </p>
            </div>
          )}

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            {ESI_DISCLAIMER}
          </p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Shield, title: "0.75% + 3.25%", desc: "Employee & employer rates" },
              { icon: Stethoscope, title: "₹21,000 ceiling", desc: "Wage eligibility limit" },
              { icon: Heart, title: "ESI benefits", desc: "Medical, maternity, disability" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-5"
              >
                <item.icon className="h-5 w-5 text-tool-convert" />
                <p className="mt-2 font-semibold text-content-primary">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-content-secondary">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="esi-calculator" />
          <ToolFeedback toolName="ESI Calculator" />
          <ToolSeoContent slug="esi-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
