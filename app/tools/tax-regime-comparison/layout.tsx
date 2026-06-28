import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Old vs New Tax Regime Comparison 2026 — Side by Side India",
  },
  description:
    "Compare old vs new tax regime for FY 2026-27 side by side. HRA, 80C, 80D, and standard deduction included. Find which regime saves more. Free tool.",
  keywords:
    "old vs new tax regime comparison 2026, tax regime calculator India, which tax regime is better",
  openGraph: {
    title: "Old vs New Tax Regime Comparison India 2026",
    description:
      "Enter your salary once and compare old vs new tax regime instantly with HRA and 80C deductions.",
    url: "https://workutilities.com/tools/tax-regime-comparison",
    siteName: "WorkUtilities",
    type: "website",
  },
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
