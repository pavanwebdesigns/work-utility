"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
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
  LEAVE_ENCASHMENT_DISCLAIMER,
  calculateLeaveEncashment,
  type LeaveBasis,
  type LeaveEncashmentType,
} from "@/lib/leave-encashment-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

const SLAB_OPTIONS = [
  { value: "5", label: "5%" },
  { value: "10", label: "10%" },
  { value: "15", label: "15%" },
  { value: "20", label: "20%" },
  { value: "30", label: "30%" },
];

export default function LeaveEncashmentCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [monthlyBasic, setMonthlyBasic] = useState("50000");
  const [leaveDays, setLeaveDays] = useState(30);
  const [encashmentType, setEncashmentType] =
    useState<LeaveEncashmentType>("retirement");
  const [basis, setBasis] = useState<LeaveBasis>("private");
  const [slabRate, setSlabRate] = useState("30");

  const result = useMemo(
    () =>
      calculateLeaveEncashment(
        parseNumberInput(monthlyBasic),
        leaveDays,
        encashmentType,
        basis,
        parseNumberInput(slabRate),
      ),
    [basis, encashmentType, leaveDays, monthlyBasic, slabRate],
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
              <CalendarDays className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Leave Encashment Calculator India
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate leave encashment amount and tax exemption. Budget 2023
              raised retirement exemption to ₹25 lakhs.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="leave-encashment-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="leave-encashment-calculator" />

          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-tool-convert/30 bg-tool-convert/5 px-4 py-3 text-center text-sm text-content-secondary">
            💡 Budget 2023 Update: Leave encashment tax exemption at retirement
            was raised from ₹3 lakhs to <strong>₹25 lakhs</strong>.
          </div>

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label="Monthly Basic Salary (₹)" htmlFor="basic">
              <CalculatorInput id="basic" value={monthlyBasic} onChange={setMonthlyBasic} placeholder="50000" />
            </CalculatorField>

            <CalculatorField label={`Leave Balance — ${leaveDays} days`} htmlFor="days">
              <input
                id="days"
                type="range"
                min={1}
                max={300}
                value={leaveDays}
                onChange={(e) => setLeaveDays(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </CalculatorField>

            <CalculatorField label="Encashment Type" htmlFor="type">
              <ToggleButtonGroup
                value={encashmentType}
                onChange={setEncashmentType}
                ariaLabel="Encashment type"
                options={[
                  { value: "during-service" as const, label: "During service (taxable)" },
                  { value: "retirement" as const, label: "Retirement / resignation" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="Calculation Basis" htmlFor="basis">
              <ToggleButtonGroup
                value={basis}
                onChange={setBasis}
                ariaLabel="Calculation basis"
                options={[
                  { value: "private" as const, label: "Private (÷26 days)" },
                  { value: "government" as const, label: "Government (÷300)" },
                ]}
              />
            </CalculatorField>

            <CalculatorField label="Income Tax Slab Rate (%)" htmlFor="slab">
              <CalculatorSelect
                id="slab"
                value={slabRate}
                onChange={setSlabRate}
                options={SLAB_OPTIONS}
              />
            </CalculatorField>
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label="Leave Encashment Amount" value={fmt(result.encashmentAmount)} highlight />
                <ResultCard
                  label="Tax Exemption"
                  value={result.taxExemption > 0 ? fmt(result.taxExemption) : "₹0"}
                />
                <ResultCard label="Taxable Leave Encashment" value={fmt(result.taxableAmount)} />
                <ResultCard label="Tax Payable" value={fmt(result.taxPayable)} />
                <ResultCard label="Net Amount After Tax" value={fmt(result.netAfterTax)} highlight />
              </div>
              <p className="text-center text-sm text-content-muted">
                <CopyValueButton value={fmt(result.netAfterTax)} label="Copy net amount" />
              </p>

              {encashmentType === "retirement" && (
                <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-sm text-content-secondary">
                  <p className="font-medium text-content-primary">Exemption breakdown (minimum of):</p>
                  <ul className="mt-2 space-y-1">
                    <li>Actual received: {fmt(result.exemptionBreakdown.actual)}</li>
                    <li>10 months&apos; salary: {fmt(result.exemptionBreakdown.tenMonthsSalary)}</li>
                    <li>Statutory limit: {fmt(result.exemptionBreakdown.statutoryLimit)}</li>
                    <li>Exempt amount applied: <strong>{fmt(result.exemptionBreakdown.exemptAmount)}</strong></li>
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-surface-border bg-surface-base p-4 text-xs text-content-muted">
                <p>Private sector formula: (Basic ÷ 26) × {leaveDays} days = {fmt(result.privateSectorAmount)}</p>
                <p className="mt-1">Government formula: (Basic × 12 ÷ 300) × {leaveDays} days = {fmt(result.governmentAmount)}</p>
              </div>
            </div>
          )}

          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-content-muted">
            {LEAVE_ENCASHMENT_DISCLAIMER}
          </p>

          <div className="mt-10">
            <RelatedTools currentSlug="leave-encashment-calculator" />
            <ToolSeoContent slug="leave-encashment-calculator" />
            <ToolFeedback toolName="Leave Encashment Calculator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
