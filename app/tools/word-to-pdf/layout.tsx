import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Word to PDF Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert Word documents to PDF online free. Fast DOCX to PDF conversion. Processed on our secure server over HTTPS and deleted immediately. No signup.",
  openGraph: buildOpenGraph({
    title: "Word to PDF Converter — Free Online",
    description:
      "Convert Word documents to PDF instantly. Processed securely and deleted after conversion.",
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
