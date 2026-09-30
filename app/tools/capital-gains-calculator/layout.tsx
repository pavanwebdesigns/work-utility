import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Capital Gains Tax Calculator India 2026 — STCG & LTCG",
  },
  description:
    "Calculate STCG and LTCG tax on shares, mutual funds, and property in India. Auto-classifies based on holding period. Updated Budget 2024 rates. Free, no signup.",
  openGraph: buildOpenGraph({
    title: "Capital Gains Tax Calculator India 2026 — STCG & LTCG",
    description:
      "Calculate capital gains tax on equity, property, gold, and debt funds with Budget 2024 rates.",
    url: "https://workutilities.com/tools/capital-gains-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/capital-gains-calculator",
  },
};

export default function CapitalGainsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
