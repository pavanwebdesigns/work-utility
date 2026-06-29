import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "HSA Calculator 2026 — Health Savings Account Tax Savings",
  },
  description:
    "Calculate HSA contribution limits, tax savings, and retirement balance. 2026 IRS limits: $4,300 individual / $8,550 family. Triple tax advantage explained. Free.",
  keywords:
    "HSA calculator 2026, health savings account calculator, HSA contribution limits",
  openGraph: {
    title: "HSA Calculator 2026 — Health Savings Account Tax Savings",
    description:
      "Calculate HSA limits, tax savings, and projected retirement balance.",
    url: "https://workutilities.com/tools/hsa-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/hsa-calculator",
  },
};

export default function HsaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
