import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Age Calculator Free — Exact Age from Date of Birth",
  },
  description:
    "Calculate your exact age in years, months, and days from your date of birth. Free age calculator for government forms, exams, and eligibility checks in India.",
  keywords:
    "age calculator online free, calculate age from dob, exact age in years months days india",
  openGraph: {
    title: "Age Calculator Free — Exact Age from Date of Birth",
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
