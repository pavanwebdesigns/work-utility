import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Image Converter Online Free — JPG, PNG, WebP Converter",
  },
  description:
    "Convert images between JPG, PNG, and WebP free online. Adjust quality, see file size reduction, and download instantly. No signup, nothing uploaded.",
  openGraph: buildOpenGraph({
    title: "Image Converter Online Free — JPG, PNG, WebP Converter",
    description:
      "Convert images between JPG, PNG, and WebP free online. Adjust quality, see file size reduction, and download instantly. No signup, nothing uploaded.",
    url: "https://workutilities.com/tools/image-converter",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/image-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
