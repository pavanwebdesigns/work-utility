import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Income Tax Calculator India FY 2025-26 Free",
  },
  description:
    "Compare income tax under old and new regime for FY 2025-26. Free calculator with slab breakdown, rebates, and estimated take-home pay for salaried employees.",
  openGraph: buildOpenGraph({
    title: "Income Tax Calculator India FY 2025-26 Free",
    description:
      "Calculate and compare tax under old and new regime with detailed slab breakdown.",
    url: "https://workutilities.com/tools/income-tax-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/income-tax-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
