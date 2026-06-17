"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Home } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { IndiaRulesBadge } from "@/components/IndiaRulesBadge";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  CalculatorField,
  CalculatorInput,
  BreakdownRow,
} from "@/components/calculator/CalculatorUi";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { annualHRA, calculateHRA } from "@/lib/hra-calculator";

export default function HraCalculatorPage() {
  const { symbol, currency } = useIndiaRulesCurrency();
  const fmt = (value: number, decimals = 0) =>
    formatCurrency(value, currency, decimals);

  const [basicSalary, setBasicSalary] = useState("50000");
  const [da, setDa] = useState("0");
  const [hraReceived, setHraReceived] = useState("20000");
  const [rentPaid, setRentPaid] = useState("18000");
  const [isMetroCity, setIsMetroCity] = useState(false);

  const result = useMemo(() => {
    const basic = parseNumberInput(basicSalary);
    const dearness = parseNumberInput(da);
    const hra = parseNumberInput(hraReceived);
    const rent = parseNumberInput(rentPaid);
    if (basic <= 0) return null;
    return calculateHRA({
      basicSalary: basic,
      dearnessAllowance: dearness,
      hraReceived: hra,
      rentPaid: rent,
      isMetroCity,
    });
  }, [basicSalary, da, hraReceived, rentPaid, isMetroCity]);

  const metroPercent = isMetroCity ? "50%" : "40%";

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <Home className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              HRA Calculator — Tax Exemption Free Online
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Calculate exempt and taxable HRA as per Indian income tax rules.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="hra-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="hra-calculator" />

          <div className="mt-10 space-y-5">
            <CalculatorField
              label={`Basic Salary (monthly) (${symbol})`}
              htmlFor="basic-salary"
            >
              <CalculatorInput
                id="basic-salary"
                value={basicSalary}
                onChange={setBasicSalary}
                placeholder="Enter basic salary"
              />
            </CalculatorField>

            <CalculatorField
              label={`Dearness Allowance (monthly) (${symbol})`}
              htmlFor="da"
            >
              <CalculatorInput
                id="da"
                value={da}
                onChange={setDa}
                placeholder="Enter 0 if not applicable"
              />
              <p className="mt-1 text-xs text-content-muted">
                Enter 0 if not applicable
              </p>
            </CalculatorField>

            <CalculatorField
              label={`HRA Received (monthly) (${symbol})`}
              htmlFor="hra-received"
            >
              <CalculatorInput
                id="hra-received"
                value={hraReceived}
                onChange={setHraReceived}
                placeholder="Enter HRA from salary slip"
              />
              <p className="mt-1 text-xs text-content-muted">
                Check your salary slip
              </p>
            </CalculatorField>

            <CalculatorField
              label={`Rent Paid (monthly) (${symbol})`}
              htmlFor="rent-paid"
            >
              <CalculatorInput
                id="rent-paid"
                value={rentPaid}
                onChange={setRentPaid}
                placeholder="Enter monthly rent"
              />
            </CalculatorField>

            <div>
              <p className="mb-2 text-sm font-medium text-content-primary">
                City Type
              </p>
              <div className="inline-flex w-full rounded-xl border border-surface-border bg-surface-card p-1">
                <button
                  type="button"
                  onClick={() => setIsMetroCity(true)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isMetroCity
                      ? "bg-tool-photo text-white"
                      : "text-content-secondary hover:text-content-primary"
                  }`}
                >
                  Metro City
                </button>
                <button
                  type="button"
                  onClick={() => setIsMetroCity(false)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    !isMetroCity
                      ? "bg-tool-photo text-white"
                      : "text-content-secondary hover:text-content-primary"
                  }`}
                >
                  Non-Metro City
                </button>
              </div>
              <p className="mt-1 text-xs text-content-muted">
                Metro: Mumbai, Delhi, Kolkata, Chennai
              </p>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-tool-convert/30 bg-tool-convert/10 p-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-content-secondary">
                      HRA Exempt / month
                    </p>
                    <p className="mt-2 text-2xl font-bold text-tool-convert">
                      {fmt(result.exemptHRA)}
                    </p>
                    <p className="mt-1 text-xs text-content-muted">Tax saved</p>
                  </div>
                  <div className="rounded-xl border border-tool-pdf/30 bg-tool-pdf/10 p-4 text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-content-secondary">
                      HRA Taxable / month
                    </p>
                    <p className="mt-2 text-2xl font-bold text-tool-pdf">
                      {fmt(result.taxableHRA)}
                    </p>
                    <p className="mt-1 text-xs text-content-muted">
                      You pay tax on this
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                  <p className="py-3 font-semibold text-content-primary">
                    Breakdown
                  </p>
                  <BreakdownRow
                    label="Actual HRA received"
                    value={fmt(result.calculation.actualHRA)}
                  />
                  <BreakdownRow
                    label={`${metroPercent} of Basic + DA`}
                    value={fmt(result.calculation.percentOfBasic)}
                  />
                  <BreakdownRow
                    label="Rent paid − 10% of Basic + DA"
                    value={fmt(result.calculation.rentMinusBasic10)}
                  />
                  <BreakdownRow
                    label="Exempt (minimum of above)"
                    value={fmt(result.exemptHRA)}
                  />
                </div>

                <div className="rounded-xl border border-surface-border bg-surface-card px-5">
                  <p className="py-3 font-semibold text-content-primary">
                    Annual Amounts
                  </p>
                  <BreakdownRow
                    label="Annual Exempt HRA"
                    value={fmt(annualHRA(result.exemptHRA))}
                  />
                  <BreakdownRow
                    label="Annual Taxable HRA"
                    value={fmt(annualHRA(result.taxableHRA))}
                  />
                </div>

                <p className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-xs text-content-secondary">
                  HRA exemption is the minimum of the 3 conditions above, as per
                  Section 10(13A) of the Income Tax Act.
                </p>
              </div>
            )}
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-center text-lg font-semibold text-content-primary">
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "01", icon: Home, title: "Enter Salary", description: "Add basic salary and HRA details" },
                { step: "02", icon: Calculator, title: "Enter Rent", description: "Add monthly rent and city type" },
                { step: "03", icon: Calculator, title: "Calculate", description: "See exempt and taxable HRA instantly" },
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

          <RelatedTools currentSlug="hra-calculator" />
          <ToolFeedback toolName="HRA Calculator" />
          <ToolSeoContent slug="hra-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
