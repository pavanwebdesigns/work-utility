import type { Currency } from "@/lib/currency-context";

export function formatINR(value: number, decimals = 0): string {
  return formatCurrency(value, "INR", decimals);
}

export function formatCurrency(
  value: number,
  currency: Currency,
  decimals = 0,
): string {
  const locale = currency === "INR" ? "en-IN" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatINRNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function parseNumberInput(value: string): number {
  const cleaned = value.replace(/[₹$,\s]/g, "");
  if (!cleaned) return 0;
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export function parsePercentInput(value: string): number {
  const cleaned = value.replace(/[%\s]/g, "");
  if (!cleaned) return 0;
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

/** Indian compact notation for values ≥ ₹1 lakh (e.g. ₹12.5 lakh, ₹1.2 crore). */
export function formatIndianCompact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "−" : "";

  if (abs >= 10_000_000) {
    const crore = abs / 10_000_000;
    const formatted =
      crore >= 100
        ? crore.toFixed(0)
        : crore >= 10
          ? crore.toFixed(1)
          : crore.toFixed(2);
    return `${sign}₹${formatted.replace(/\.0+$/, "")} crore`;
  }

  if (abs >= 100_000) {
    const lakh = abs / 100_000;
    const formatted =
      lakh >= 100
        ? lakh.toFixed(0)
        : lakh >= 10
          ? lakh.toFixed(1)
          : lakh.toFixed(2);
    return `${sign}₹${formatted.replace(/\.0+$/, "")} lakh`;
  }

  return `${sign}${formatINR(abs)}`;
}
