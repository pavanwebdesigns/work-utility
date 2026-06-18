import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "GPA Calculator Free — Calculate Your 4.0 Scale GPA" },
  description:
    "Free GPA calculator for US students. Add courses, grades, and credit hours to calculate your weighted GPA on a 4.0 scale instantly. No signup.",
  keywords:
    "gpa calculator free, 4.0 scale gpa calculator, weighted gpa calculator, college gpa calculator",
  openGraph: {
    title: "GPA Calculator Free — Calculate Your 4.0 Scale GPA",
    description:
      "Add courses, grades, and credit hours to calculate your weighted GPA on a 4.0 scale instantly.",
    url: "https://workutilities.com/tools/gpa-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/gpa-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
