import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "EMI Calculator Online Free — Home Loan, Car Loan, Personal Loan | WorkUtilities",
  },
  description:
    "Calculate loan EMI instantly for home, car, and personal loans. Free EMI calculator with interest breakdown. No signup required.",
  keywords:
    "emi calculator online free, home loan emi calculator, car loan emi india, personal loan emi",
  openGraph: {
    title: "EMI Calculator Online Free — Home Loan, Car Loan, Personal Loan",
    description:
      "Calculate monthly EMI, total interest, and total payable amount instantly.",
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
