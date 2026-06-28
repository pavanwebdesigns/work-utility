import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "PPF Calculator India 2026 — Maturity, Interest & Returns Free",
  },
  description:
    "Calculate PPF maturity amount at 7.1% with year-by-year breakdown. Partial withdrawal, loan eligibility, and 80C benefits. Free PPF calculator India.",
  keywords:
    "PPF calculator India 2026, public provident fund calculator, PPF maturity calculator, PPF interest rate",
  openGraph: {
    title: "PPF Calculator India — Returns, Interest & Maturity",
    description:
      "Free PPF calculator with year-by-year table, withdrawal rules, and EEE tax status explained.",
    url: "https://workutilities.com/tools/ppf-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/ppf-calculator",
  },
};

export default function PpfCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
