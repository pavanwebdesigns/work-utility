import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Loan Eligibility Calculator India — Check Bank Limit",
  },
  description:
    "Check your home, personal or car loan eligibility free online. Based on Indian FOIR guidelines — see max eligible amount and EMI. No signup required.",
  openGraph: buildOpenGraph({
    title: "Loan Eligibility Calculator India — Check Bank Limit",
    description:
      "Check max loan eligibility using Indian FOIR guidelines. See EMI and comfortable loan amount instantly.",
    url: "https://workutilities.com/tools/loan-eligibility",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/loan-eligibility",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
