import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Mortgage Calculator 2026 — Free Payment & Amortization" },
  description:
    "Free mortgage calculator with full amortization schedule. See monthly payment, PMI, taxes, insurance, and how extra payments save you money. No signup.",
  keywords:
    "mortgage calculator, mortgage payment calculator, amortization schedule, PMI calculator",
  openGraph: {
    title: "Mortgage Calculator 2026 — Free Payment & Amortization",
    description:
      "Free mortgage calculator with full amortization schedule. See monthly payment, PMI, taxes, insurance, and how extra payments save you money.",
    url: "https://workutilities.com/tools/mortgage-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/mortgage-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
