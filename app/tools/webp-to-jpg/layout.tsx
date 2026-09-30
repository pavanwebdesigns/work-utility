import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "WebP to JPG Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert WebP images to JPG or PNG free online. Fast, private, browser-only WebP converter. No signup needed.",
  openGraph: buildOpenGraph({
    title: "WebP to JPG Converter — Free Online",
    description:
      "Convert WebP images to JPG or PNG instantly. Free and browser-only.",
    url: "https://workutilities.com/tools/webp-to-jpg",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/webp-to-jpg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
