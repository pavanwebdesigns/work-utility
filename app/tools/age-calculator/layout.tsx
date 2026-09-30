import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Age Calculator — Exact Age in Years, Months & Days",
  },
  description:
    "Calculate exact age from date of birth instantly. Get age in years, months, days, hours, and check govt exam cutoff eligibility. Free, no signup.",
  openGraph: buildOpenGraph({
    title: "Age Calculator — Exact Age in Years, Months & Days",
    description:
      "Calculate exact age from date of birth instantly. Get age in years, months, days, hours, and check govt exam cutoff eligibility. Free, no signup.",
    url: "https://workutilities.com/tools/age-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/age-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
