"use client";

import { Info } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";

export function IndiaTaxNotice() {
  const { currency } = useCurrency();

  if (currency === "INR") return null;

  return (
    <div className="mx-auto mt-4 flex max-w-xl gap-2 rounded-xl border border-surface-border bg-surface-card p-3 text-sm text-content-secondary">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
      <p>
        This tool is designed for Indian tax calculations. Switch to ₹ INR for
        accurate results.
      </p>
    </div>
  );
}
