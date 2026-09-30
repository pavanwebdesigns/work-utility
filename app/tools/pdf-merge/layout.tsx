import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "PDF Merge — Combine PDF Files Free Online | WorkUtilities",
  },
  description:
    "Merge multiple PDF files into one online free. No signup, no upload to server. Combine PDFs instantly in your browser.",
  openGraph: buildOpenGraph({
    title: "PDF Merge — Combine PDF Files Free Online",
    description:
      "Merge multiple PDFs into one file instantly. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-merge",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-merge",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
