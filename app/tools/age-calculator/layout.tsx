import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Age Calculator — Exact Age in Years, Months & Days",
  },
  description:
    "Calculate exact age from date of birth instantly. Get age in years, months, days, hours, and check govt exam cutoff eligibility. Free, no signup.",
  keywords:
    "age calculator online free, calculate age from dob, exact age in years months days india, government exam age cutoff",
  openGraph: {
    title: "Age Calculator — Exact Age in Years, Months & Days",
    description:
      "Calculate exact age from date of birth instantly. Get age in years, months, days, hours, and check govt exam cutoff eligibility. Free, no signup.",
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
