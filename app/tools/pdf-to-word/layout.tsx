import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "PDF to Word Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert PDF to editable Word document online free. Fast, accurate PDF to DOCX conversion. No signup, runs in browser.",
  keywords:
    "pdf to word converter free, pdf to docx online, convert pdf to word india",
  openGraph: {
    title: "PDF to Word Converter — Free Online",
    description:
      "Convert PDF to editable Word documents. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-to-word",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-to-word",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
