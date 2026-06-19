import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Word to JPG Converter Online Free — DOCX to Image",
  },
  description:
    "Convert Word documents to JPG images online free. Upload a DOCX file and download as an image. Share docs without editing access. No signup needed.",
  keywords:
    "convert Word to JPG online, DOCX to JPG, Word document to image, docx to jpeg converter",
  openGraph: {
    title: "Word to JPG Converter Online Free — DOCX to Image",
    description:
      "Upload a DOCX file and download it as a JPG image in your browser. No signup required.",
    url: "https://workutilities.com/tools/word-to-jpg",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/word-to-jpg" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
