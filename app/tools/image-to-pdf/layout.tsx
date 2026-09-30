import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Image to PDF — Combine Images into PDF Free | WorkUtilities",
  },
  description:
    "Convert and combine JPG, PNG images into a single PDF online free. No signup, instant download, browser-only.",
  openGraph: buildOpenGraph({
    title: "Image to PDF — Combine Images into PDF Free",
    description:
      "Combine images into a single PDF. Free, private, browser-only.",
    url: "https://workutilities.com/tools/image-to-pdf",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/image-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
