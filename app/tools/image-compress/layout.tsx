import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Image Compressor Online Free — Reduce File Size, Keep Quality",
  },
  description:
    "Compress JPG, PNG, and WebP images online free. Reduce file size up to 80% without visible quality loss. No signup, nothing uploaded to a server.",
  keywords:
    "image compressor online free, compress jpg png webp, reduce image file size, image compress without quality loss",
  openGraph: {
    title: "Image Compressor Online Free — Reduce File Size, Keep Quality",
    description:
      "Compress JPG, PNG, and WebP images online free. Reduce file size up to 80% without visible quality loss. No signup, nothing uploaded to a server.",
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
