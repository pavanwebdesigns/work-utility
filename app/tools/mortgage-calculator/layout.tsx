import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Mortgage Calculator 2026 — Free Payment & Amortization" },
  description:
    "Free mortgage calculator with full amortization schedule. See monthly payment, PMI, taxes, insurance, and how extra payments save you money. No signup.",
  openGraph: buildOpenGraph({
    title: "Mortgage Calculator 2026 — Free Payment & Amortization",
    description:
      "Free mortgage calculator with full amortization schedule. See monthly payment, PMI, taxes, insurance, and how extra payments save you money.",
    url: "https://workutilities.com/tools/mortgage-calculator",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/mortgage-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
