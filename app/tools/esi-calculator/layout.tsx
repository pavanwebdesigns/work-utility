import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "ESI Calculator India — Employee State Insurance 2026",
  },
  description:
    "Calculate ESI contribution — employee 0.75% and employer 3.25% of gross wages. Check ₹21,000 eligibility. Understand ESI benefits. Free, no signup.",
  keywords:
    "ESI calculator India, ESIC contribution calculator 2026, employee state insurance",
  openGraph: {
    title: "ESI Calculator India — Employee State Insurance 2026",
    description:
      "Calculate ESI employee and employer contributions with eligibility check.",
    url: "https://workutilities.com/tools/esi-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/esi-calculator",
  },
};

export default function EsiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
