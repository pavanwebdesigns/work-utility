import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Paycheck Calculator 2026 — Free Take-Home Pay Estimate" },
  description:
    "Free 2026 paycheck calculator. Estimate your take-home pay after federal tax, FICA, and deductions. Based on current IRS tax brackets. No signup.",
  openGraph: buildOpenGraph({
    title: "Paycheck Calculator 2026 — Free Take-Home Pay Estimate",
    description:
      "Free 2026 paycheck calculator. Estimate your take-home pay after federal tax, FICA, and deductions. Based on current IRS tax brackets.",
    url: "https://workutilities.com/tools/paycheck-calculator",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/paycheck-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
