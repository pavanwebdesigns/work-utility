import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "CAGR Calculator India — Compound Annual Growth Rate",
  },
  description:
    "Calculate CAGR, future investment value, or required growth rate free online. Compare returns across mutual funds, stocks, FD and gold. No signup.",
  keywords:
    "CAGR calculator India, compound annual growth rate calculator, investment CAGR, mutual fund CAGR calculator",
  openGraph: {
    title: "CAGR Calculator India — Compound Annual Growth Rate",
    description:
      "Calculate CAGR, future value, or required growth rate. Rule of 72, real CAGR, and benchmark comparison included.",
    url: "https://workutilities.com/tools/cagr-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/cagr-calculator",
  },
};

export default function CagrCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
