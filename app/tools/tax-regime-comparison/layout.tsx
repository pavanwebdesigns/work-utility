import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Old vs New Tax Regime Comparison 2026 — Side by Side India",
  },
  description:
    "Compare old vs new tax regime for FY 2026-27 side by side. HRA, 80C, 80D, and standard deduction included. Find which regime saves more. Free tool.",
  openGraph: buildOpenGraph({
    title: "Old vs New Tax Regime Comparison India 2026",
    description:
      "Enter your salary once and compare old vs new tax regime instantly with HRA and 80C deductions.",
    url: "https://workutilities.com/tools/tax-regime-comparison",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/tax-regime-comparison",
  },
};

export default function TaxRegimeComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
