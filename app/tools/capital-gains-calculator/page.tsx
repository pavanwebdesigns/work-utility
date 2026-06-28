"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
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
  ASSET_TYPE_OPTIONS,
  CAPITAL_GAINS_DISCLAIMER,
  SLAB_RATE_OPTIONS,
  calculateCapitalGains,
  type AssetType,
} from "@/lib/capital-gains-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

export default function CapitalGainsCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [assetType, setAssetType] = useState<AssetType>("listed-equity");
  const [purchaseDate, setPurchaseDate] = useState("2023-06-01");
  const [saleDate, setSaleDate] = useState("2025-06-01");
  const [purchasePrice, setPurchasePrice] = useState("100000");
  const [salePrice, setSalePrice] = useState("150000");
  const [purchaseExpenses, setPurchaseExpenses] = useState("0");
  const [saleExpenses, setSaleExpenses] = useState("0");
  const [slabRate, setSlabRate] = useState("30");
  const [propertyBeforeJuly2024, setPropertyBeforeJuly2024] = useState<
    "yes" | "no"
  >("yes");

  const result = useMemo(
    () =>
      calculateCapitalGains({
        assetType,
        purchaseDate,
        saleDate,
        purchasePrice: parseNumberInput(purchasePrice),
        salePrice: parseNumberInput(salePrice),
        purchaseExpenses: parseNumberInput(purchaseExpenses),
        saleExpenses: parseNumberInput(saleExpenses),
        slabRatePercent: parseNumberInput(slabRate),
        propertyAcquiredBeforeJuly2024: propertyBeforeJuly2024 === "yes",
      }),
    [
      assetType,
      propertyBeforeJuly2024,
      purchaseDate,
      purchaseExpenses,
      purchasePrice,
      saleDate,
      saleExpenses,
      salePrice,
      slabRate,
    ],
  );

  const badgeColor =
    result?.gainTerm === "ltcg"
      ? "border-tool-convert/40 bg-tool-convert/10 text-tool-convert"
      : "border-tool-photo/40 bg-tool-photo/10 text-tool-photo";

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <TrendingUp className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Capital Gains Tax Calculator India
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate STCG and LTCG on equity, property, gold, and debt funds — auto-classified by holding period.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="capital-gains-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="capital-gains-calculator" />

          <div className="mt-10 space-y-5 rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
            <CalculatorField label="Asset Type" htmlFor="asset-type">
              <CalculatorSelect
                id="asset-type"
                value={assetType}
                onChange={(v) => setAssetType(v as AssetType)}
                options={ASSET_TYPE_OPTIONS.map((o) => ({
                  value: o.value,
                  label: o.label,
                }))}
              />
            </CalculatorField>

            <div className="grid gap-5 sm:grid-cols-2">
              <CalculatorField label="Purchase Date" htmlFor="purchase-date">
                <input
                  id="purchase-date"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm"
                />
              </CalculatorField>
              <CalculatorField label="Sale Date" htmlFor="sale-date">
                <input
                  id="sale-date"
                  type="date"
                  value={saleDate}
                  onChange={(e) => setSaleDate(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm"
                />
              </CalculatorField>
            </div>

            {result && (
              <div className={`rounded-xl border px-4 py-3 text-sm font-medium ${badgeColor}`}>
                ⏱️ Holding Period: {result.holdingLabel} ({result.gainTermLabel})
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <CalculatorField label="Purchase Price (₹)" htmlFor="purchase-price">
                <CalculatorInput id="purchase-price" value={purchasePrice} onChange={setPurchasePrice} />
              </CalculatorField>
              <CalculatorField label="Sale Price (₹)" htmlFor="sale-price">
                <CalculatorInput id="sale-price" value={salePrice} onChange={setSalePrice} />
              </CalculatorField>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <CalculatorField label="Purchase Expenses (₹)" htmlFor="purchase-exp">
                <CalculatorInput id="purchase-exp" value={purchaseExpenses} onChange={setPurchaseExpenses} />
              </CalculatorField>
              <CalculatorField label="Sale Expenses (₹)" htmlFor="sale-exp">
                <CalculatorInput id="sale-exp" value={saleExpenses} onChange={setSaleExpenses} />
              </CalculatorField>
            </div>

            <CalculatorField label="Income Tax Slab Rate (%)" htmlFor="slab-rate">
              <CalculatorSelect
                id="slab-rate"
                value={slabRate}
                onChange={setSlabRate}
                options={SLAB_RATE_OPTIONS.map((r) => ({
                  value: String(r),
                  label: `${r}%`,
                }))}
              />
            </CalculatorField>

            {assetType === "property" && (
              <CalculatorField label="Acquired before July 23, 2024?" htmlFor="property-cutoff">
                <ToggleButtonGroup
                  value={propertyBeforeJuly2024}
                  onChange={setPropertyBeforeJuly2024}
                  ariaLabel="Property acquisition date"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </CalculatorField>
            )}
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResultCard label="Capital Gain" value={fmt(result.capitalGain)} />
                <ResultCard label="Total Tax Payable" value={fmt(result.totalTax)} highlight />
                <ResultCard label="Net Profit After Tax" value={fmt(result.netProfitAfterTax)} />
              </div>

              <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-content-primary">Tax Summary</h2>
                  <CopyValueButton value={String(Math.round(result.totalTax))} />
                </div>
                <dl className="space-y-2 text-sm">
                  {[
                    ["Asset Type", result.assetLabel],
                    ["Holding Period", `${result.holdingLabel} → ${result.gainTermLabel}`],
                    ["Capital Gain", fmt(result.capitalGain)],
                    ["Exemption Applied", fmt(result.exemptionApplied)],
                    ["Taxable Gain", fmt(result.taxableGain)],
                    ["Tax Rate", `${result.taxRate}%`],
                    ["Capital Gains Tax", fmt(result.capitalGainsTax)],
                    ["Health & Education Cess (4%)", fmt(result.cess)],
                    ["Total Tax Payable", fmt(result.totalTax)],
                    ["Effective Tax Rate on Gain", `${result.effectiveRate.toFixed(2)}%`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-content-secondary">{label}</dt>
                      <dd className="font-medium text-content-primary">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-content-secondary">{result.taxRateNote}</p>
              </div>

              {result.propertyOptions && (
                <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
                  <h2 className="mb-4 text-lg font-semibold text-content-primary">Property Tax Options</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {result.propertyOptions.map((opt) => (
                      <div key={opt.label} className="rounded-xl border border-surface-border p-4">
                        <p className="font-medium text-content-primary">{opt.label}</p>
                        <p className="mt-2 text-sm text-content-secondary">
                          Taxable gain: {fmt(opt.taxableGain)}
                        </p>
                        <p className="text-sm font-semibold text-content-primary">
                          Total tax: {fmt(opt.totalTax)}
                        </p>
                      </div>
                    ))}
                  </div>
                  {result.propertyRecommendation && (
                    <p className="mt-4 text-sm text-content-primary">{result.propertyRecommendation}</p>
                  )}
                </div>
              )}
            </div>
          )}

          <p className="mt-8 text-center text-xs text-content-secondary">{CAPITAL_GAINS_DISCLAIMER}</p>

          <div className="mt-10">
            <RelatedTools currentSlug="capital-gains-calculator" />
            <ToolSeoContent slug="capital-gains-calculator" />
            <ToolFeedback toolName="Capital Gains Tax Calculator" />
            <DinoGame />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
