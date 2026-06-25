import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Image Converter Online Free — JPG, PNG, WebP Converter",
  },
  description:
    "Convert images between JPG, PNG, and WebP free online. Adjust quality, see file size reduction, and download instantly. No signup, nothing uploaded.",
  keywords:
    "image converter online free, jpg to png, png to jpg, webp converter, convert image format browser",
  openGraph: {
    title: "Image Converter Online Free — JPG, PNG, WebP Converter",
    description:
      "Convert images between JPG, PNG, and WebP free online. Adjust quality, see file size reduction, and download instantly. No signup, nothing uploaded.",
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
