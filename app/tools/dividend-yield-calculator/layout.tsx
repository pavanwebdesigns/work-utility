import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Dividend Yield Calculator India — Stocks & Portfolio",
  },
  description:
    "Calculate dividend yield, yield on cost, and annual income from Indian stocks. Portfolio view, TDS calculation, FD comparison. Free, no signup.",
  openGraph: buildOpenGraph({
    title: "Dividend Yield Calculator India — Stocks & Portfolio",
    description:
      "Calculate dividend yield, yield on cost, TDS, and compare with FD returns.",
    url: "https://workutilities.com/tools/dividend-yield-calculator",
    type: "website",
  }),
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
