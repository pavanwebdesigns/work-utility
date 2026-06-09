import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Image Converter — JPG PNG WebP Free Online | WorkUtilities",
  },
  description:
    "Convert images between JPG, PNG, and WebP formats free online. Fast, private, browser-only image format converter.",
  keywords:
    "image converter online free, jpg to png, png to jpg, webp converter india",
  openGraph: {
    title: "Image Converter — JPG PNG WebP Free Online",
    description:
      "Convert images between formats instantly. Free, private, browser-only.",
    url: "https://workutilities.com/tools/image-converter",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/image-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
