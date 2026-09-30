import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Self-Employment Tax Calculator 2026 — SE Tax + Quarterly",
  },
  description:
    "Calculate your 1099 self-employment tax for 2026. See SE tax, income tax, total tax burden, and quarterly payment amounts with due dates. Free, no signup.",
  openGraph: buildOpenGraph({
    title: "Self-Employment Tax Calculator 2026 — SE Tax + Quarterly",
    description:
      "Calculate SE tax, federal income tax, and quarterly estimated payment amounts with 2026 IRS due dates.",
    url: "https://workutilities.com/tools/self-employment-tax",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/self-employment-tax",
  },
};

export default function SelfEmploymentTaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
