import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "EMI Calculator — Home, Car & Personal Loan India",
  },
  description:
    "Free EMI calculator for home loan, car loan, and personal loan in India. Enter loan amount, rate, and tenure — get instant EMI, total interest, and payment schedule.",
  keywords:
    "emi calculator online free, home loan emi calculator, car loan emi india, personal loan emi",
  openGraph: {
    title: "EMI Calculator — Home, Car & Personal Loan India",
    description:
      "Free EMI calculator for home loan, car loan, and personal loan in India. Enter loan amount, rate, and tenure — get instant EMI, total interest, and payment schedule.",
    url: "https://workutilities.com/tools/emi-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/emi-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
