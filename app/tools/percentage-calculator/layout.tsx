import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Percentage Calculator Online Free — Calculate % of Number | WorkUtilities",
  },
  description:
    "Free percentage calculator for finding % of a number, percentage change, and add/subtract percentage instantly.",
  keywords:
    "percentage calculator online free, calculate percentage of number, percent change calculator",
  openGraph: {
    title: "Percentage Calculator Online Free — Calculate % of Number",
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
