import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "HRA Calculator — Tax Exemption Free Online | WorkUtilities",
  },
  description:
    "Calculate HRA exemption for income tax free online. Find exempt and taxable HRA as per Indian tax rules.",
  openGraph: buildOpenGraph({
    title: "HRA Calculator — Tax Exemption Free Online",
    description: "Calculate exempt and taxable HRA as per Indian tax rules.",
    url: "https://workutilities.com/tools/hra-calculator",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/hra-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
