import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "RD Calculator India — Recurring Deposit Returns Free",
  },
  description:
    "Calculate recurring deposit maturity, interest earned, and TDS impact. Free RD calculator for Indian banks. Compare RD vs FD returns. No signup.",
  openGraph: buildOpenGraph({
    title: "RD Calculator India — Recurring Deposit Returns Free",
    description:
      "Calculate RD maturity and interest with quarterly compounding. Compare RD vs FD returns.",
    url: "https://workutilities.com/tools/rd-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/rd-calculator",
  },
};

export default function RdCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
