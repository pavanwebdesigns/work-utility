import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Inflation Calculator — Free Online Value Calculator | WorkUtilities" },
  description:
    "Calculate the value of money over time adjusted for inflation free online. See purchasing power changes instantly.",
  alternates: { canonical: "https://workutilities.com/tools/inflation-calculator" },
  openGraph: buildOpenGraph({
    title: "Inflation Calculator — Free Online Value Calculator | WorkUtilities",
    description:
      "Calculate the value of money over time adjusted for inflation free online. See purchasing power changes instantly.",
    url: "https://workutilities.com/tools/inflation-calculator",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
