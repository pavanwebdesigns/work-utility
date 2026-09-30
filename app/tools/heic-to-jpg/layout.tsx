import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "HEIC to JPG Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert iPhone HEIC photos to JPG free online. No signup, no server upload. Fast HEIC to JPG conversion in your browser.",
  openGraph: buildOpenGraph({
    title: "HEIC to JPG Converter — Free Online",
    description:
      "Convert iPhone HEIC photos to JPG instantly. Free and browser-only.",
    url: "https://workutilities.com/tools/heic-to-jpg",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/heic-to-jpg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
