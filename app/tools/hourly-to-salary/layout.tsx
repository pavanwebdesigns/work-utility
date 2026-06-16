import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Hourly to Salary Calculator — Free Online | WorkUtilities" },
  description:
    "Convert hourly wage to annual, monthly, or weekly salary free online. Calculate your yearly income instantly.",
  keywords:
    "hourly to salary calculator free, hourly wage to annual salary, paycheck calculator",
  alternates: { canonical: "https://workutilities.com/tools/hourly-to-salary" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
