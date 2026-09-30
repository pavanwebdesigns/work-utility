import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "NPS Calculator India 2026 — Pension & Corpus Estimate",
  },
  description:
    "Calculate your NPS retirement corpus, monthly pension, and tax savings free online. National Pension System calculator with year-by-year growth. No signup.",
  openGraph: buildOpenGraph({
    title: "NPS Calculator India 2026 — Pension & Corpus Estimate",
    description:
      "Calculate NPS retirement corpus, monthly pension, and 80CCD tax savings with year-by-year growth.",
    url: "https://workutilities.com/tools/nps-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/nps-calculator",
  },
};

export default function NpsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
