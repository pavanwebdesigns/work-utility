import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "PDF Merge — Combine PDF Files Free Online | WorkUtilities",
  },
  description:
    "Merge multiple PDF files into one online free. No signup, no upload to server. Combine PDFs instantly in your browser.",
  keywords:
    "merge pdf files online free, combine pdf, join pdf files india",
  openGraph: {
    title: "PDF Merge — Combine PDF Files Free Online",
    description:
      "Merge multiple PDFs into one file instantly. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-merge",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-merge",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
