import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Signature Maker Free — Create Digital Signature Online",
  },
  description:
    "Create a digital signature by drawing, typing your name, or uploading an image. Download PNG or JPG or copy to clipboard. Free signature maker for documents.",
  openGraph: buildOpenGraph({
    title: "Signature Maker Free — Create Digital Signature Online",
    description:
      "Draw, type, or upload your signature and download it instantly.",
    url: "https://workutilities.com/tools/signature-maker",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/signature-maker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
