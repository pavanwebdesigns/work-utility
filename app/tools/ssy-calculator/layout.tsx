import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "SSY Calculator — Sukanya Samriddhi Yojana Returns Free",
  },
  description:
    "Calculate Sukanya Samriddhi Yojana maturity amount and interest at 8.2% rate. SSY year-by-year growth, partial withdrawal at 18, EEE tax benefits. No signup.",
  openGraph: buildOpenGraph({
    title: "SSY Calculator — Sukanya Samriddhi Yojana Returns Free",
    description:
      "Calculate SSY maturity, interest earned, and partial withdrawal at 18 with year-by-year table.",
    url: "https://workutilities.com/tools/ssy-calculator",
    type: "website",
  }),
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
