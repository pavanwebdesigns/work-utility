import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "LTA Calculator — Leave Travel Allowance Free | WorkUtilities" },
  description:
    "Calculate LTA tax exemption free online. Find exempt and taxable Leave Travel Allowance amount.",
  alternates: { canonical: "https://workutilities.com/tools/lta-calculator" },
  openGraph: buildOpenGraph({
    title: "LTA Calculator — Leave Travel Allowance Free | WorkUtilities",
    description:
      "Calculate LTA tax exemption free online. Find exempt and taxable Leave Travel Allowance amount.",
    url: "https://workutilities.com/tools/lta-calculator",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
