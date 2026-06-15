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
