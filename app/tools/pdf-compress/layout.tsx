import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "PDF Compress — Reduce PDF File Size Free | WorkUtilities",
  },
  description:
    "Compress PDF files online for free. Reduce PDF size without losing quality. Processed on our secure server over HTTPS and deleted immediately. No signup.",
  openGraph: buildOpenGraph({
    title: "PDF Compress — Free Online PDF Compressor",
    description:
      "Reduce PDF file size instantly. Processed securely and deleted after conversion.",
    url: "https://workutilities.com/tools/pdf-compress",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-compress",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
