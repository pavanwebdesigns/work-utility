import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "EMI Calculator — Home, Car & Personal Loan India",
  },
  description:
    "Free EMI calculator for home loan, car loan, and personal loan in India. Enter loan amount, rate, and tenure — get instant EMI, total interest, and payment schedule.",
  openGraph: buildOpenGraph({
    title: "EMI Calculator — Home, Car & Personal Loan India",
    description:
      "Free EMI calculator for home loan, car loan, and personal loan in India. Enter loan amount, rate, and tenure — get instant EMI, total interest, and payment schedule.",
    url: "https://workutilities.com/tools/emi-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/emi-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
