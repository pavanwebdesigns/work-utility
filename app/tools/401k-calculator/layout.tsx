import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "401k Calculator 2026 — Retirement Savings Projector",
  },
  description:
    "Project your 401k balance at retirement. Enter contributions, employer match, and return rate. 2026 IRS limits auto-applied. Free, no signup, runs in browser.",
  openGraph: buildOpenGraph({
    title: "401k Calculator 2026 — Retirement Savings Projector",
    description:
      "Project 401k balance at retirement with 2026 IRS limits and employer match impact.",
    url: "https://workutilities.com/tools/401k-calculator",
    type: "website",
  }),
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
