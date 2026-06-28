import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Section 44ADA Tax Calculator India — Freelancer Presumptive Tax",
  },
  description:
    "Calculate Section 44ADA presumptive tax for Indian freelancers. ₹75L limit, 50% rule, ITR-4 eligibility, and comparison with regular books. Free, no signup.",
  keywords:
    "section 44ADA tax calculator, freelancer tax India, presumptive taxation, ITR-4 calculator",
  openGraph: {
    title: "Section 44ADA Tax Calculator for Freelancers India",
    description:
      "Free Section 44ADA tax calculator for Indian freelancers — presumptive income, advance tax, and 44ADA vs regular books comparison.",
    url: "https://workutilities.com/tools/freelancer-tax-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/freelancer-tax-calculator",
  },
};

export default function FreelancerTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
