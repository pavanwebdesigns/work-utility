import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Age Calculator Online Free — Calculate Exact Age from Date of Birth | WorkUtilities",
  },
  description:
    "Calculate your exact age in years, months and days instantly. Free online age calculator for government forms. No signup required.",
  keywords:
    "age calculator online free, calculate age from dob, exact age in years months days india",
  openGraph: {
    title: "Age Calculator Online Free — Calculate Exact Age from Date of Birth",
    description:
      "Calculate exact age in years, months, and days instantly. Free and private.",
    url: "https://workutilities.com/tools/age-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/age-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
