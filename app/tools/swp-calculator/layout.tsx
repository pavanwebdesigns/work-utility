import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "SWP Calculator — Systematic Withdrawal Plan Returns India",
  },
  description:
    "Calculate how long your investment corpus will last with monthly SWP withdrawals, or how much corpus you need for a target monthly income. Free SWP calculator.",
  keywords:
    "SWP calculator India, systematic withdrawal plan calculator, retirement corpus calculator",
  openGraph: {
    title: "SWP Calculator — Systematic Withdrawal Plan Returns India",
    description:
      "Calculate SWP corpus duration or corpus needed for monthly retirement income.",
    url: "https://workutilities.com/tools/swp-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/swp-calculator",
  },
};

export default function SwpCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
