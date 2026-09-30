import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Keyword Density Checker — Free SEO Tool | WorkUtilities" },
  description:
    "Check keyword density and frequency in your content free online. Optimize your text for SEO instantly.",
  alternates: { canonical: "https://workutilities.com/tools/keyword-density" },
  openGraph: buildOpenGraph({
    title: "Keyword Density Checker — Free SEO Tool | WorkUtilities",
    description:
      "Check keyword density and frequency in your content free online. Optimize your text for SEO instantly.",
    url: "https://workutilities.com/tools/keyword-density",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
