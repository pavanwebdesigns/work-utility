"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle, FileCheck, Lightbulb, Scale } from "lucide-react";
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
} from "@/components/calculator/CalculatorUi";
import {
  GST_DISCLAIMER,
  checkGstThreshold,
  type StateCategory,
  type SupplyType,
} from "@/lib/gst-threshold-checker";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

const SUPPLY_OPTIONS = [
  { value: "services", label: "Services" },
  { value: "goods", label: "Goods" },
  { value: "both", label: "Both" },
];

const STATE_OPTIONS = [
  { value: "regular", label: "Regular state (Delhi, Maharashtra, Karnataka, etc.)" },
  { value: "special", label: "Special Category State (J&K, NE states, HP, Uttarakhand)" },
];

function YesNoToggle({
  value,
  onChange,
  label,
  htmlFor,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
  htmlFor: string;
}) {
  return (
    <CalculatorField label={label} htmlFor={htmlFor}>
      <div className="flex gap-2" id={htmlFor}>
        {[
          { v: false, text: "No" },
          { v: true, text: "Yes" },
        ].map((opt) => (
          <button
            key={opt.text}
            type="button"
            onClick={() => onChange(opt.v)}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
              value === opt.v
                ? "border-brand-blue bg-brand-blue/10 text-content-primary"
                : "border-surface-border text-content-secondary"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </CalculatorField>
  );
}

export default function GstThresholdCheckerPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [turnover, setTurnover] = useState("1500000");
  const [supplyType, setSupplyType] = useState<SupplyType>("services");
  const [stateCategory, setStateCategory] = useState<StateCategory>("regular");
  const [interState, setInterState] = useState(false);
  const [exportServices, setExportServices] = useState(false);
  const [digitalOverseas, setDigitalOverseas] = useState(false);

  const result = useMemo(
    () =>
      checkGstThreshold({
        annualTurnover: parseNumberInput(turnover),
        supplyType,
        stateCategory,
        interStateSupply: interState,
        exportServices,
        digitalOverseas,
      }),
    [digitalOverseas, exportServices, interState, stateCategory, supplyType, turnover],
  );

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-convert/10">
              <FileCheck className="h-6 w-6 text-tool-convert" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              GST Registration Checker for Freelancers
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Do you need GST registration? Check ₹20 lakh threshold, special states, inter-state, and export rules.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="gst-threshold-checker" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="gst-threshold-checker" />

          <div className="mx-auto mt-8 max-w-xl space-y-5">
            <CalculatorField label="Annual Aggregate Turnover (₹)" htmlFor="turnover">
              <CalculatorInput id="turnover" value={turnover} onChange={setTurnover} placeholder="15,00,000" />
              <p className="mt-1 text-xs text-content-muted">
                Total income from all services/goods this financial year — domestic + exports
              </p>
            </CalculatorField>
            <CalculatorField label="Supply Type" htmlFor="supply">
              <CalculatorSelect
                id="supply"
                value={supplyType}
                onChange={(v) => setSupplyType(v as SupplyType)}
                options={SUPPLY_OPTIONS}
              />
            </CalculatorField>
            <CalculatorField label="State of Business" htmlFor="state">
              <CalculatorSelect
                id="state"
                value={stateCategory}
                onChange={(v) => setStateCategory(v as StateCategory)}
                options={STATE_OPTIONS}
              />
            </CalculatorField>
            <YesNoToggle
              htmlFor="inter-state"
              value={interState}
              onChange={setInterState}
              label="Do you supply to other states (inter-state)?"
            />
            <YesNoToggle
              htmlFor="export-services"
              value={exportServices}
              onChange={setExportServices}
              label="Do you export services/goods outside India?"
            />
            <YesNoToggle
              htmlFor="digital-overseas"
              value={digitalOverseas}
              onChange={setDigitalOverseas}
              label="Are you a digital/IT service provider to overseas clients?"
            />
          </div>

          {result && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div
                className={`rounded-xl border px-4 py-4 text-center ${
                  result.verdict === "mandatory"
                    ? "border-amber-500/30 bg-amber-500/5"
                    : "border-tool-convert/30 bg-tool-convert/5"
                }`}
              >
                <p className="text-lg font-semibold text-content-primary">
                  {result.verdict === "mandatory" ? "⚠️" : "✅"} {result.headline}
                </p>
                <p className="mt-2 text-sm text-content-secondary">{result.detail}</p>
                <CopyValueButton value={result.headline} label="Copy verdict" className="mt-3" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center">
                  <p className="text-xs text-content-muted">Threshold</p>
                  <p className="mt-1 text-lg font-semibold text-content-primary">{fmt(result.threshold)}</p>
                </div>
                <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center">
                  <p className="text-xs text-content-muted">Your Turnover</p>
                  <p className="mt-1 text-lg font-semibold text-content-primary">{fmt(result.annualTurnover)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
            <Lightbulb className="mb-1 inline h-4 w-4" /> Voluntary registration benefit: Even if not mandatory, many IT freelancers register to claim input tax credit, issue GST invoices to B2B clients, and simplify future compliance.
            {digitalOverseas && (
              <p className="mt-2">
                Special consideration for IT exporters: B2B exports are zero-rated — no GST charged, but registration may be needed for LUT (Letter of Undertaking).
              </p>
            )}
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">{GST_DISCLAIMER}</p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Scale, title: "₹20L threshold", desc: "Services in regular states" },
              { icon: CheckCircle, title: "Inter-state", desc: "Mandatory regardless of turnover" },
              { icon: FileCheck, title: "Export rules", desc: "Zero-rated with LUT" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                <item.icon className="h-5 w-5 text-tool-convert" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="gst-threshold-checker" />
          <ToolFeedback toolName="GST Threshold Checker" />
          <ToolSeoContent slug="gst-threshold-checker" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
