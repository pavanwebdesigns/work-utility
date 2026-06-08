import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "PDF Compress — Reduce PDF File Size Free | WorkUtilities",
  },
  description:
    "Compress PDF files online for free. Reduce PDF size without losing quality. No upload, no signup — runs entirely in your browser.",
  keywords:
    "compress pdf online free, reduce pdf size, pdf compressor, pdf optimizer india",
  openGraph: {
    title: "PDF Compress — Free Online PDF Compressor",
    description:
      "Reduce PDF file size instantly. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-compress",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-compress",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
