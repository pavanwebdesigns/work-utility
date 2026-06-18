import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Income Tax Calculator India FY 2025-26 Free",
  },
  description:
    "Compare income tax under old and new regime for FY 2025-26. Free calculator with slab breakdown, rebates, and estimated take-home pay for salaried employees.",
  keywords:
    "income tax calculator india, old vs new tax regime calculator, fy 2025-26 tax calculator",
  openGraph: {
    title: "Income Tax Calculator India FY 2025-26 Free",
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
