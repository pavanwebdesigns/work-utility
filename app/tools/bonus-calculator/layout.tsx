import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Bonus Calculator India — Payment of Bonus Act 2026",
  },
  description:
    "Calculate statutory bonus under Payment of Bonus Act 1965. Check eligibility (₹21,000 limit), wage ceiling (₹7,000), minimum 8.33% and maximum 20% bonus. Free.",
  keywords:
    "bonus calculator India, Payment of Bonus Act calculator, statutory bonus 8.33%",
  openGraph: {
    title: "Bonus Calculator India — Payment of Bonus Act 2026",
    description:
      "Calculate statutory bonus with ₹7,000 wage ceiling and eligibility check.",
    url: "https://workutilities.com/tools/bonus-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
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
