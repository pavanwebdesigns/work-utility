import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "W-2 vs 1099 Tax Calculator 2026 — Find Your Break-Even Rate",
  },
  description:
    "See how much you need to earn as a 1099 contractor to match your W-2 take-home pay. Compare self-employment taxes, benefits, and net income. Free, no signup.",
  keywords:
    "w2 vs 1099 tax calculator, 1099 break even rate, contractor equivalent salary, self employment tax vs w2",
  openGraph: {
    title: "W-2 vs 1099 Tax Calculator 2026 — Find Your Break-Even Rate",
    description:
      "Calculate the minimum 1099 rate needed to match W-2 take-home pay after SE tax, benefits, and business expenses.",
    url: "https://workutilities.com/tools/w2-vs-1099-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/w2-vs-1099-calculator",
  },
};

export default function W2Vs1099CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
