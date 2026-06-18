import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Signature Maker Free — Create Digital Signature Online",
  },
  description:
    "Create a digital signature by drawing, typing your name, or uploading an image. Download PNG or JPG or copy to clipboard. Free signature maker for documents.",
  keywords:
    "signature maker online free, digital signature creator, online signature generator india",
  openGraph: {
    title: "Signature Maker Free — Create Digital Signature Online",
    description:
      "Draw, type, or upload your signature and download it instantly.",
    url: "https://workutilities.com/tools/signature-maker",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/signature-maker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
