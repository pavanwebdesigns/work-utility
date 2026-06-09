import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "PDF to JPG — Convert PDF Pages to Images Free | WorkUtilities",
  },
  description:
    "Convert PDF pages to JPG images free online. Extract each page as a high-quality image. No signup, browser-only.",
  keywords:
    "pdf to jpg converter free, pdf to image online, convert pdf pages to images india",
  openGraph: {
    title: "PDF to JPG — Convert PDF Pages to Images Free",
    description:
      "Convert each PDF page to JPG. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-to-jpg",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-to-jpg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
