"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LineChart, RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RelatedTools } from "@/components/RelatedTools";
import { ToolFeedback } from "@/components/ToolFeedback";
import { ToolSeoContent } from "@/components/ToolSeoContent";
import { DinoGame } from "@/components/DinoGame";
import { FavoriteButton } from "@/components/FavoriteButton";
import {
  CRYPTO_COINS,
  fetchCryptoPrices,
  formatCompactUsd,
  formatInr,
  formatUsd,
  type CryptoCoin,
} from "@/lib/railway-api";

function minutesAgo(timestamp: number): number {
  return Math.max(0, Math.floor((Date.now() - timestamp * 1000) / 60000));
}

export default function CryptoTrackerPage() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [convertCoinId, setConvertCoinId] = useState("bitcoin");
  const [convertAmount, setConvertAmount] = useState("1");

  const loadPrices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoPrices();
      setCoins(data.coins);
      setUpdatedAt(data.updated_at);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load prices");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPrices();
  }, [loadPrices]);

  const selectedCoin = useMemo(
    () => coins.find((c) => c.id === convertCoinId),
    [coins, convertCoinId]
  );

  const convertAmountNum = parseFloat(convertAmount.replace(/,/g, "")) || 0;
  const usdValue =
    selectedCoin?.price_usd !== null && selectedCoin?.price_usd !== undefined
      ? convertAmountNum * selectedCoin.price_usd
      : null;
  const inrValue =
    selectedCoin?.price_inr !== null && selectedCoin?.price_inr !== undefined
      ? convertAmountNum * selectedCoin.price_inr
      : null;

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <Header />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-hidden">
        <div className="px-6 py-6 sm:px-10">
          <Link href="/" className="text-sm text-content-secondary hover:text-content-primary">
            ← All Tools
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
          <div className="pt-4 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
              <LineChart className="h-6 w-6 text-brand-blue" strokeWidth={1.75} />
            </div>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              Crypto Price Tracker Online Free
            </h1>
            <p className="mx-auto mt-3 max-w-md text-content-secondary">
              Live cryptocurrency prices with 24h change, market cap, and volume.
            </p>
            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="crypto-tracker" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-content-secondary">
              {updatedAt !== null
                ? `Last updated: ${minutesAgo(updatedAt)} minute${minutesAgo(updatedAt) === 1 ? "" : "s"} ago`
                : "Loading prices..."}
            </p>
            <button
              type="button"
              onClick={() => void loadPrices()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90 disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
          )}

          {!error && (
            <div className="mt-6 overflow-x-auto rounded-xl border border-surface-border">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-surface-card text-left text-content-secondary">
                  <tr>
                    <th className="px-4 py-3 font-medium">Coin</th>
                    <th className="px-4 py-3 font-medium">Price (USD)</th>
                    <th className="px-4 py-3 font-medium">24h %</th>
                    <th className="px-4 py-3 font-medium">Market Cap</th>
                    <th className="px-4 py-3 font-medium">24h Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {coins.map((coin) => {
                    const change = coin.change_24h ?? 0;
                    const positive = change >= 0;
                    return (
                      <tr key={coin.id} className="border-t border-surface-border">
                        <td className="px-4 py-3 font-medium text-content-primary">{coin.name}</td>
                        <td className="px-4 py-3 text-content-primary">{formatUsd(coin.price_usd)}</td>
                        <td className={`px-4 py-3 font-medium ${positive ? "text-emerald-600" : "text-red-600"}`}>
                          <span className="inline-flex items-center gap-1">
                            {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                            {change.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-content-secondary">{formatCompactUsd(coin.market_cap_usd)}</td>
                        <td className="px-4 py-3 text-content-secondary">{formatCompactUsd(coin.volume_24h_usd)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 rounded-xl border border-surface-border bg-surface-card p-5">
            <h2 className="text-lg font-semibold text-content-primary">Crypto to USD / INR</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="convert-coin" className="mb-2 block text-sm font-medium text-content-primary">
                  Cryptocurrency
                </label>
                <select
                  id="convert-coin"
                  value={convertCoinId}
                  onChange={(e) => setConvertCoinId(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-base px-4 py-3 text-sm outline-none focus:border-brand-blue"
                >
                  {CRYPTO_COINS.map((coin) => (
                    <option key={coin.id} value={coin.id}>
                      {coin.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="convert-amount" className="mb-2 block text-sm font-medium text-content-primary">
                  Amount
                </label>
                <input
                  id="convert-amount"
                  type="text"
                  inputMode="decimal"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-base px-4 py-3 text-sm outline-none focus:border-brand-blue"
                />
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-surface-base p-3">
                <p className="text-xs text-content-muted">USD value</p>
                <p className="text-lg font-semibold text-content-primary">
                  {usdValue !== null ? formatUsd(usdValue) : "—"}
                </p>
              </div>
              <div className="rounded-lg bg-surface-base p-3">
                <p className="text-xs text-content-muted">INR value</p>
                <p className="text-lg font-semibold text-content-primary">
                  {inrValue !== null ? formatInr(inrValue) : "—"}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Prices are for reference only, not financial advice. Cryptocurrency markets are highly volatile.
          </p>

          <RelatedTools currentSlug="crypto-tracker" />
          <ToolFeedback toolName="Crypto Price Tracker" />
          <ToolSeoContent slug="crypto-tracker" />
          <DinoGame />
        </div>
      </main>
      <Footer />
    </div>
  );
}
