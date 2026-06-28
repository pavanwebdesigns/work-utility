import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "SSY Calculator — Sukanya Samriddhi Yojana Returns Free",
  },
  description:
    "Calculate Sukanya Samriddhi Yojana maturity amount and interest at 8.2% rate. SSY year-by-year growth, partial withdrawal at 18, EEE tax benefits. No signup.",
  keywords:
    "SSY calculator, Sukanya Samriddhi Yojana calculator, SSY maturity calculator 2026",
  openGraph: {
    title: "SSY Calculator — Sukanya Samriddhi Yojana Returns Free",
    description:
      "Calculate SSY maturity, interest earned, and partial withdrawal at 18 with year-by-year table.",
    url: "https://workutilities.com/tools/ssy-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/ssy-calculator",
  },
};

export default function SsyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
