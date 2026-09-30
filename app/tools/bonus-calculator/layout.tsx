import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Bonus Calculator India — Payment of Bonus Act 2026",
  },
  description:
    "Calculate statutory bonus under Payment of Bonus Act 1965. Check eligibility (₹21,000 limit), wage ceiling (₹7,000), minimum 8.33% and maximum 20% bonus. Free.",
  openGraph: buildOpenGraph({
    title: "Bonus Calculator India — Payment of Bonus Act 2026",
    description:
      "Calculate statutory bonus with ₹7,000 wage ceiling and eligibility check.",
    url: "https://workutilities.com/tools/bonus-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/bonus-calculator",
  },
};

export default function BonusCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
