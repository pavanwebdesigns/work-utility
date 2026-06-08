import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Image Compress — Reduce Image Size Free | WorkUtilities",
  },
  description:
    "Compress JPG, PNG images online free. Reduce image file size without quality loss. Browser-only, no upload needed.",
  keywords:
    "compress image online free, reduce image size, jpg compressor, png optimizer",
  openGraph: {
    title: "Image Compress — Free Online Image Compressor",
    description:
      "Compress images instantly. Free, private, browser-only.",
    url: "https://workutilities.com/tools/image-compress",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/image-compress",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
