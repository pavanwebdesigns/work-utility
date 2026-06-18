import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Percentage Calculator Free — % of Number Online",
  },
  description:
    "Calculate percentage of a number, percentage change between values, and add or subtract a percentage instantly. Free online percentage calculator for students.",
  keywords:
    "percentage calculator online free, calculate percentage of number, percent change calculator",
  openGraph: {
    title: "Percentage Calculator Free — % of Number Online",
    description:
      "Calculate percentages, percentage change, and add or subtract % instantly.",
    url: "https://workutilities.com/tools/percentage-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/percentage-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
