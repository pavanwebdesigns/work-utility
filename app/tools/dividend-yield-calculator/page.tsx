"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, Lightbulb, PieChart, TrendingUp } from "lucide-react";
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
  DIVIDEND_DISCLAIMER,
  calculatePortfolioDividend,
  calculateSingleStockDividend,
  type DividendFrequency,
  type PortfolioStock,
} from "@/lib/dividend-yield-calculator";
import { formatCurrency, parseNumberInput } from "@/lib/format-inr";
import { useIndiaRulesCurrency } from "@/lib/use-india-rules-currency";

function formatPct(v: number) {
  return `${v.toFixed(2)}%`;
}

const FREQ_OPTIONS = [
  { value: "annual", label: "Annual" },
  { value: "semi-annual", label: "Semi-Annual" },
  { value: "quarterly", label: "Quarterly" },
];

function newPortfolioRow(): PortfolioStock {
  return {
    id: crypto.randomUUID(),
    name: "",
    annualDps: 0,
    cmp: 0,
    shares: 0,
  };
}

export default function DividendYieldCalculatorPage() {
  const { currency } = useIndiaRulesCurrency();
  const fmt = (v: number) => formatCurrency(v, currency, 0);

  const [mode, setMode] = useState<"single" | "portfolio">("single");
  const [annualDps, setAnnualDps] = useState("25");
  const [cmp, setCmp] = useState("400");
  const [purchasePrice, setPurchasePrice] = useState("300");
  const [shares, setShares] = useState("100");
  const [frequency, setFrequency] = useState<DividendFrequency>("annual");
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>([
    {
      id: "1",
      name: "Stock 1",
      annualDps: 25,
      cmp: 400,
      shares: 100,
    },
  ]);

  const singleResult = useMemo(
    () =>
      mode === "single"
        ? calculateSingleStockDividend({
            annualDps: parseNumberInput(annualDps),
            cmp: parseNumberInput(cmp),
            purchasePrice: parseNumberInput(purchasePrice),
            shares: parseNumberInput(shares),
            frequency,
          })
        : null,
    [annualDps, cmp, frequency, mode, purchasePrice, shares],
  );

  const portfolioResult = useMemo(
    () =>
      mode === "portfolio"
        ? calculatePortfolioDividend(
            portfolio.map((s) => ({
              ...s,
              annualDps: parseNumberInput(String(s.annualDps)),
              cmp: parseNumberInput(String(s.cmp)),
              shares: parseNumberInput(String(s.shares)),
            })),
          )
        : null,
    [mode, portfolio],
  );

  const result = mode === "single" ? singleResult : portfolioResult;

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
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tool-photo/10">
              <TrendingUp className="h-6 w-6 text-tool-photo" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Dividend Yield Calculator India
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-content-secondary">
              Calculate current yield, yield on cost, annual dividend income, TDS impact, and compare with FD returns.
            </p>
            <LastUpdatedBadge />
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="dividend-yield-calculator" />
            </div>
          </div>

          <IndiaRulesBadge toolSlug="dividend-yield-calculator" />

          <div className="mx-auto mt-8 max-w-xl">
            <ToggleButtonGroup
              value={mode}
              onChange={setMode}
              ariaLabel="Calculator mode"
              options={[
                { value: "single", label: "Single Stock" },
                { value: "portfolio", label: "Portfolio" },
              ]}
            />
          </div>

          {mode === "single" ? (
            <div className="mx-auto mt-6 max-w-xl space-y-5">
              <CalculatorField label="Annual Dividend Per Share (₹)" htmlFor="dps">
                <CalculatorInput id="dps" value={annualDps} onChange={setAnnualDps} placeholder="25" />
              </CalculatorField>
              <CalculatorField label="Current Market Price (₹)" htmlFor="cmp">
                <CalculatorInput id="cmp" value={cmp} onChange={setCmp} placeholder="400" />
              </CalculatorField>
              <CalculatorField label="Your Purchase Price (₹)" htmlFor="purchase">
                <CalculatorInput id="purchase" value={purchasePrice} onChange={setPurchasePrice} placeholder="300" />
              </CalculatorField>
              <CalculatorField label="Number of Shares Held" htmlFor="shares">
                <CalculatorInput id="shares" value={shares} onChange={setShares} placeholder="100" />
              </CalculatorField>
              <CalculatorField label="Dividend Frequency" htmlFor="freq">
                <CalculatorSelect
                  id="freq"
                  value={frequency}
                  onChange={(v) => setFrequency(v as DividendFrequency)}
                  options={FREQ_OPTIONS}
                />
              </CalculatorField>
            </div>
          ) : (
            <div className="mx-auto mt-6 max-w-3xl space-y-4">
              {portfolio.map((stock, index) => (
                <div key={stock.id} className="rounded-xl border border-surface-border bg-surface-card p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-content-primary">Stock {index + 1}</span>
                    {portfolio.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setPortfolio((p) => p.filter((s) => s.id !== stock.id))}
                        className="text-xs text-content-muted hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <CalculatorInput
                      id={`stock-name-${stock.id}`}
                      value={stock.name}
                      onChange={(v) =>
                        setPortfolio((p) =>
                          p.map((s) => (s.id === stock.id ? { ...s, name: v } : s)),
                        )
                      }
                      placeholder="Stock name"
                    />
                    <CalculatorInput
                      id={`stock-dps-${stock.id}`}
                      value={String(stock.annualDps || "")}
                      onChange={(v) =>
                        setPortfolio((p) =>
                          p.map((s) => (s.id === stock.id ? { ...s, annualDps: parseNumberInput(v) } : s)),
                        )
                      }
                      placeholder="Annual DPS (₹)"
                    />
                    <CalculatorInput
                      id={`stock-cmp-${stock.id}`}
                      value={String(stock.cmp || "")}
                      onChange={(v) =>
                        setPortfolio((p) =>
                          p.map((s) => (s.id === stock.id ? { ...s, cmp: parseNumberInput(v) } : s)),
                        )
                      }
                      placeholder="CMP (₹)"
                    />
                    <CalculatorInput
                      id={`stock-shares-${stock.id}`}
                      value={String(stock.shares || "")}
                      onChange={(v) =>
                        setPortfolio((p) =>
                          p.map((s) => (s.id === stock.id ? { ...s, shares: parseNumberInput(v) } : s)),
                        )
                      }
                      placeholder="Shares"
                    />
                  </div>
                </div>
              ))}
              {portfolio.length < 5 && (
                <button
                  type="button"
                  onClick={() => setPortfolio((p) => [...p, newPortfolioRow()])}
                  className="w-full rounded-xl border border-dashed border-surface-border py-3 text-sm text-content-secondary hover:border-brand-blue hover:text-brand-blue"
                >
                  + Add stock
                </button>
              )}
            </div>
          )}

          {result && mode === "single" && singleResult && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label="Current Dividend Yield" value={formatPct(singleResult.currentYield)} highlight />
                <ResultCard
                  label="Yield on Cost"
                  value={formatPct(singleResult.yieldOnCost)}
                />
                <ResultCard label="Annual Dividend Income" value={fmt(singleResult.annualIncome)} />
                <ResultCard label="Monthly Income (approx)" value={fmt(singleResult.monthlyIncome)} />
              </div>
              <p className="text-center text-sm text-content-muted">
                Yield on cost based on purchase price of {fmt(singleResult.purchasePrice)}
                <CopyValueButton value={formatPct(singleResult.currentYield)} label="Copy yield" className="ml-2" />
              </p>
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  singleResult.tdsApplicable
                    ? "border-amber-500/30 bg-amber-500/5 text-content-secondary"
                    : "border-tool-convert/30 bg-tool-convert/5 text-content-secondary"
                }`}
              >
                {singleResult.tdsApplicable
                  ? `⚠️ TDS applicable — Company will deduct 10% TDS (${fmt(singleResult.tdsAmount)}) as your dividend income exceeds ₹5,000. Net income: ${fmt(singleResult.netAnnualIncome)}.`
                  : `✅ No TDS — Annual dividend income ≤ ₹5,000. Full ${fmt(singleResult.annualIncome)} received.`}
              </div>
              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                <Lightbulb className="mb-1 inline h-4 w-4" /> vs FD: A bank FD at 7% on {fmt(singleResult.investedAmount)} investment gives {fmt(singleResult.fdAnnualIncome)}/year. Your dividend yield is {singleResult.yieldVsFd} at {formatPct(singleResult.currentYield)}.
              </div>
            </div>
          )}

          {result && mode === "portfolio" && portfolioResult && (
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard label="Portfolio Yield (weighted)" value={formatPct(portfolioResult.weightedCurrentYield)} highlight />
                <ResultCard label="Total Annual Income" value={fmt(portfolioResult.totalAnnualIncome)} />
                <ResultCard label="Monthly Income (approx)" value={fmt(portfolioResult.totalMonthlyIncome)} />
                <ResultCard label="Net After TDS" value={fmt(portfolioResult.netAnnualIncome)} />
              </div>
              <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/5 px-4 py-3 text-sm text-content-secondary">
                vs FD: 7% on {fmt(portfolioResult.totalInvested)} = {fmt(portfolioResult.fdAnnualIncome)}/year
              </div>
            </div>
          )}

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-content-muted">
            Dividends are NOT guaranteed — unlike FD interest. They depend on company profits and board decisions. High dividend yield may sometimes signal a falling stock price.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-center text-xs text-content-muted">{DIVIDEND_DISCLAIMER}</p>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: TrendingUp, title: "Dual yield", desc: "Current yield + yield on cost" },
              { icon: PieChart, title: "Portfolio", desc: "Up to 5 stocks" },
              { icon: BarChart3, title: "TDS + FD", desc: "₹5,000 threshold check" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-surface-border bg-surface-card p-5">
                <item.icon className="h-5 w-5 text-tool-photo" />
                <p className="mt-2 font-semibold text-content-primary">{item.title}</p>
                <p className="mt-1 text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>

          <RelatedTools currentSlug="dividend-yield-calculator" />
          <ToolFeedback toolName="Dividend Yield Calculator" />
          <ToolSeoContent slug="dividend-yield-calculator" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
