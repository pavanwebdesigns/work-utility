import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "EMI Calculator Free — Home & Car Loan EMI Online",
  },
  description:
    "Free EMI calculator for home, car, and personal loans in India. Calculate monthly EMI, total interest, and full repayment instantly. No signup required.",
  keywords:
    "emi calculator online free, home loan emi calculator, car loan emi india, personal loan emi",
  openGraph: {
    title: "EMI Calculator Free — Home & Car Loan EMI Online",
    description:
      "Calculate monthly EMI, total interest, and repayment for home, car, and personal loans.",
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
