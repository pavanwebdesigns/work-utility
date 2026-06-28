import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Advance Tax Calculator India FY 2026-27 — Due Dates",
  },
  description:
    "Calculate advance tax liability and installment schedule for FY 2026-27. Check eligibility, due dates (June/Sep/Dec/March), and penalty rules. Free, no signup.",
  keywords:
    "advance tax calculator India 2026, advance tax due dates FY 2026-27, Section 234B 234C penalty",
  openGraph: {
    title: "Advance Tax Calculator India FY 2026-27 — Due Dates",
    description:
      "Calculate advance tax installments for FY 2026-27. June, September, December, March due dates with 44ADA single-payment rule.",
    url: "https://workutilities.com/tools/advance-tax-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/advance-tax-calculator",
  },
};

export default function AdvanceTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
