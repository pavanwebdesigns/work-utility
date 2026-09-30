import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "CGPA to Percentage Calculator Free — VTU, CBSE",
  },
  description:
    "Convert CGPA to percentage using VTU, CBSE, Anna University, and 4-point scale formulas. Reverse percentage-to-CGPA converter included. Free for students.",
  openGraph: buildOpenGraph({
    title: "CGPA to Percentage Calculator Free — VTU, CBSE",
    description:
      "Convert CGPA to percentage and back with university-specific formulas.",
    url: "https://workutilities.com/tools/cgpa-to-percentage",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/cgpa-to-percentage",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
