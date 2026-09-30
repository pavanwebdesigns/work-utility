import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Hourly to Salary Calculator — Free Online | WorkUtilities" },
  description:
    "Convert hourly wage to annual, monthly, or weekly salary free online. Calculate your yearly income instantly.",
  alternates: { canonical: "https://workutilities.com/tools/hourly-to-salary" },
  openGraph: buildOpenGraph({
    title: "Hourly to Salary Calculator — Free Online | WorkUtilities",
    description:
      "Convert hourly wage to annual, monthly, or weekly salary free online. Calculate your yearly income instantly.",
    url: "https://workutilities.com/tools/hourly-to-salary",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
