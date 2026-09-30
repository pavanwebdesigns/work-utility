"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import {
  CURRENCY_LABELS,
  fetchCurrencyRates,
  SUPPORTED_CURRENCIES,
  type SupportedCurrency,
} from "@/lib/railway-api";

export default function CurrencyConverterPage() {
  const [base, setBase] = useState<SupportedCurrency>("USD");
  const [swapTarget, setSwapTarget] = useState<SupportedCurrency>("EUR");
  const [amount, setAmount] = useState("1");
  const [ratesDate, setRatesDate] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRates = useCallback(async (baseCurrency: SupportedCurrency) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrencyRates(baseCurrency);
      setRates(data.rates);
      setRatesDate(data.date);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load rates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRates(base);
  }, [base, loadRates]);

  const numericAmount = parseFloat(amount.replace(/,/g, "")) || 0;

  const conversions = useMemo(() => {
    return SUPPORTED_CURRENCIES.filter((code) => code !== base).map((code) => {
      const rate = rates[code];
      const converted =
        rate !== undefined ? numericAmount * rate : null;
      return { code, label: CURRENCY_LABELS[code], rate, converted };
    });
  }, [base, numericAmount, rates]);

  const handleSwap = () => {
    const newBase = swapTarget;
    setSwapTarget(base);
    setBase(newBase);
  };

  return (
    <>
<div className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="base-currency" className="mb-2 block text-sm font-medium text-content-primary">
                  Base currency
                </label>
                <select
                  id="base-currency"
                  value={base}
                  onChange={(e) => setBase(e.target.value as SupportedCurrency)}
                  className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none focus:border-brand-blue"
                >
                  {SUPPORTED_CURRENCIES.map((code) => (
                    <option key={code} value={code}>
                      {code} — {CURRENCY_LABELS[code]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="mb-2 block text-sm font-medium text-content-primary">
                  Amount
                </label>
                <input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-[140px] flex-1">
                <label htmlFor="swap-target" className="mb-2 block text-sm font-medium text-content-primary">
                  Swap with
                </label>
                <select
                  id="swap-target"
                  value={swapTarget}
                  onChange={(e) => setSwapTarget(e.target.value as SupportedCurrency)}
                  className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-primary outline-none focus:border-brand-blue"
                >
                  {SUPPORTED_CURRENCIES.filter((c) => c !== base).map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleSwap}
                className="inline-flex items-center gap-2 rounded-xl border border-surface-border px-4 py-3 text-sm font-medium text-content-primary hover:border-brand-blue"
              >
                <ArrowLeftRight className="h-4 w-4" /> Swap
              </button>
              <button
                type="button"
                onClick={() => void loadRates(base)}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-brand-blue/90 disabled:opacity-70"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {ratesDate && (
              <p className="text-sm text-content-secondary">
                Rates last updated: <strong className="text-content-primary">{ratesDate}</strong>
                {" "}(ECB reference rates, cached up to 1 hour)
              </p>
            )}

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
            )}

            {!error && (
              <div className="overflow-hidden rounded-xl border border-surface-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface-card text-left text-content-secondary">
                    <tr>
                      <th className="px-4 py-3 font-medium">Currency</th>
                      <th className="px-4 py-3 font-medium">Rate</th>
                      <th className="px-4 py-3 font-medium">Converted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversions.map((row) => (
                      <tr key={row.code} className="border-t border-surface-border">
                        <td className="px-4 py-3 text-content-primary">
                          <span className="font-semibold">{row.code}</span>
                          <span className="ml-2 text-content-muted">{row.label}</span>
                        </td>
                        <td className="px-4 py-3 font-mono text-content-secondary">
                          {row.rate !== undefined ? row.rate.toFixed(row.rate < 1 ? 6 : 4) : "—"}
                        </td>
                        <td className="px-4 py-3 font-semibold text-content-primary">
                          {row.converted !== null
                            ? row.converted.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Rates shown are mid-market ECB reference rates for planning only — not exact quotes for bank or transfer transactions, which include spreads and fees.
          </p>
    </>
  );
}

