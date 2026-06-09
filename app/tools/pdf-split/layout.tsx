import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "PDF Split — Extract Pages from PDF Free | WorkUtilities",
  },
  description:
    "Split PDF files online free. Extract specific pages or split into individual pages. Browser-only, no server upload.",
  keywords:
    "split pdf online free, extract pages from pdf, pdf page extractor india",
  openGraph: {
    title: "PDF Split — Extract Pages from PDF Free",
    description:
      "Split PDF pages online. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-split",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-split",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
