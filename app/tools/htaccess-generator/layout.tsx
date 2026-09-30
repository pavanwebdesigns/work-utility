import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: ".htaccess Generator Online Free — Build & Download",
  },
  description:
    "Generate .htaccess rules for HTTPS redirects, caching, GZIP, error pages, and IP blocking. Copy or download your .htaccess file instantly. No signup.",
  openGraph: buildOpenGraph({
    title: ".htaccess Generator Online Free — Build & Download",
    description:
      "Build Apache .htaccess rules with live preview — HTTPS, caching, GZIP, security.",
    url: "https://workutilities.com/tools/htaccess-generator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/htaccess-generator",
  },
};

export default function HtaccessGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
