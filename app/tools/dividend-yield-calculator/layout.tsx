import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Dividend Yield Calculator India — Stocks & Portfolio",
  },
  description:
    "Calculate dividend yield, yield on cost, and annual income from Indian stocks. Portfolio view, TDS calculation, FD comparison. Free, no signup.",
  keywords:
    "dividend yield calculator India, yield on cost calculator, dividend income TDS",
  openGraph: {
    title: "Dividend Yield Calculator India — Stocks & Portfolio",
    description:
      "Calculate dividend yield, yield on cost, TDS, and compare with FD returns.",
    url: "https://workutilities.com/tools/dividend-yield-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/dividend-yield-calculator",
  },
};

export default function DividendYieldCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
