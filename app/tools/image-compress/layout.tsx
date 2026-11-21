import type { Metadata } from "next";
import { buildOpenGraph, withRobots } from "@/lib/seo";

export const metadata: Metadata = withRobots("https://workutilities.com/tools/image-compress", {
  title: {
    absolute:
      "Image Compressor Free — Reduce Size, Keep Quality",
  },
  description:
    "Compress JPG, PNG, and WebP images online free. Reduce file size up to 80% without visible quality loss. No signup, nothing uploaded to a server.",
  openGraph: buildOpenGraph({
    title: "Image Compressor Free — Reduce Size, Keep Quality",
    description:
      "Compress JPG, PNG, and WebP images online free. Reduce file size up to 80% without visible quality loss. No signup, nothing uploaded to a server.",
    url: "https://workutilities.com/tools/image-compress",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/image-compress",
  },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
