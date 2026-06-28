import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "RD Calculator India — Recurring Deposit Returns Free",
  },
  description:
    "Calculate recurring deposit maturity, interest earned, and TDS impact. Free RD calculator for Indian banks. Compare RD vs FD returns. No signup.",
  keywords:
    "RD calculator India, recurring deposit calculator, RD maturity calculator, RD vs FD",
  openGraph: {
    title: "RD Calculator India — Recurring Deposit Returns Free",
    description:
      "Calculate RD maturity and interest with quarterly compounding. Compare RD vs FD returns.",
    url: "https://workutilities.com/tools/rd-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
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
