import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Income Tax Calculator India FY 2025-26 — Old vs New Regime | WorkUtilities",
  },
  description:
    "Compare income tax under old and new regime for FY 2024-25 and FY 2025-26. Free calculator with slab-wise breakdown and take-home estimate.",
  keywords:
    "income tax calculator india, old vs new tax regime calculator, fy 2025-26 tax calculator",
  openGraph: {
    title: "Income Tax Calculator India FY 2025-26 — Old vs New Regime",
    description:
      "Calculate and compare tax under old and new regime with detailed slab breakdown.",
    url: "https://workutilities.com/tools/income-tax-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/income-tax-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
