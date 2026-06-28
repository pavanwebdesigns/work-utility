import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "New Labour Code 2026 Salary Calculator — Take-Home Impact India",
  },
  description:
    "Calculate how India's New Labour Code 2026 affects your take-home salary, PF, and gratuity. Compare current vs new 50% basic rule free online.",
  keywords:
    "new labour code salary calculator, labour code 2026 India, 50 percent basic salary rule, take home salary impact",
  openGraph: {
    title: "New Labour Code 2026 Salary Calculator — Take-Home Impact",
    description:
      "See how the 50% basic salary rule affects your monthly take-home, PF, and gratuity under India's New Labour Code.",
    url: "https://workutilities.com/tools/labour-code-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/labour-code-calculator",
  },
};

export default function LabourCodeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
