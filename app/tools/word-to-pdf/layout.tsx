import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Word to PDF Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert Word documents to PDF online free. Fast DOCX to PDF conversion. No signup needed, browser-only processing.",
  keywords:
    "word to pdf converter free, docx to pdf online, convert word to pdf",
  openGraph: {
    title: "Word to PDF Converter — Free Online",
    description:
      "Convert Word documents to PDF instantly. Free and browser-only.",
    url: "https://workutilities.com/tools/word-to-pdf",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/word-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
