import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "CTC to In-Hand Salary Calculator India Free",
  },
  description:
    "Calculate monthly in-hand salary from annual CTC with PF, professional tax, and income tax estimates. Free take-home pay calculator for Indian employees.",
  keywords:
    "ctc to in hand salary calculator, take home salary calculator india, ctc calculator 2026",
  openGraph: {
    title: "CTC to In-Hand Salary Calculator India Free",
    description:
      "Estimate your monthly take-home pay from annual CTC with deduction breakdown.",
    url: "https://workutilities.com/tools/ctc-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/ctc-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
