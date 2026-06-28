import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "401k Calculator 2026 — Retirement Savings Projector",
  },
  description:
    "Project your 401k balance at retirement. Enter contributions, employer match, and return rate. 2026 IRS limits auto-applied. Free, no signup, runs in browser.",
  keywords:
    "401k calculator 2026, retirement savings calculator, 401k contribution limit 2026, employer match calculator",
  openGraph: {
    title: "401k Calculator 2026 — Retirement Savings Projector",
    description:
      "Project 401k balance at retirement with 2026 IRS limits and employer match impact.",
    url: "https://workutilities.com/tools/401k-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/401k-calculator",
  },
};

export default function FourOhOneKCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
