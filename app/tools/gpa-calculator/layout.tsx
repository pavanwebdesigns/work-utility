import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "GPA Calculator Free — Calculate Your 4.0 Scale GPA" },
  description:
    "Free GPA calculator for US students. Add courses, grades, and credit hours to calculate your weighted GPA on a 4.0 scale instantly. No signup.",
  openGraph: buildOpenGraph({
    title: "GPA Calculator Free — Calculate Your 4.0 Scale GPA",
    description:
      "Add courses, grades, and credit hours to calculate your weighted GPA on a 4.0 scale instantly.",
    url: "https://workutilities.com/tools/gpa-calculator",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/gpa-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
