import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "CGPA to Percentage Calculator Free — VTU, CBSE",
  },
  description:
    "Convert CGPA to percentage using VTU, CBSE, Anna University, and 4-point scale formulas. Reverse percentage-to-CGPA converter included. Free for students.",
  keywords:
    "cgpa to percentage calculator, vtu cgpa to percentage, cbse cgpa to percentage, percentage to cgpa",
  openGraph: {
    title: "CGPA to Percentage Calculator Free — VTU, CBSE",
    description:
      "Convert CGPA to percentage and back with university-specific formulas.",
    url: "https://workutilities.com/tools/cgpa-to-percentage",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/cgpa-to-percentage",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
