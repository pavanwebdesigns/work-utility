import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Keyword Density Checker — Free SEO Tool | WorkUtilities" },
  description:
    "Check keyword density and frequency in your content free online. Optimize your text for SEO instantly.",
  keywords:
    "keyword density checker free, keyword frequency counter, seo keyword analyzer",
  alternates: { canonical: "https://workutilities.com/tools/keyword-density" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
