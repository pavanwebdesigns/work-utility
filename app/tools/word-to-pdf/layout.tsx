import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Word to PDF Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert Word documents to PDF online free. Fast DOCX to PDF conversion. No signup needed, browser-only processing.",
  openGraph: buildOpenGraph({
    title: "Word to PDF Converter — Free Online",
    description:
      "Convert Word documents to PDF instantly. Free and browser-only.",
    url: "https://workutilities.com/tools/word-to-pdf",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/word-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
