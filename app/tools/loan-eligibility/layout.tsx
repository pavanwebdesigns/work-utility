import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Loan Eligibility Calculator India — Check Bank Limit",
  },
  description:
    "Check your home, personal or car loan eligibility free online. Based on Indian FOIR guidelines — see max eligible amount and EMI. No signup required.",
  keywords:
    "loan eligibility calculator India, FOIR calculator, home loan eligibility, personal loan eligibility India",
  openGraph: {
    title: "Loan Eligibility Calculator India — Check Bank Limit",
    description:
      "Check max loan eligibility using Indian FOIR guidelines. See EMI and comfortable loan amount instantly.",
    url: "https://workutilities.com/tools/loan-eligibility",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/loan-eligibility",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
