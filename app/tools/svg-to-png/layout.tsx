import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "SVG to PNG Converter Online Free — Any Resolution" },
  description:
    "Convert SVG to PNG online free at any resolution. Choose transparent or solid background. No signup, conversion happens in your browser.",
  openGraph: buildOpenGraph({
    title: "SVG to PNG Converter Online Free — Any Resolution",
    description: "Convert SVG to PNG at any scale with transparent or solid background. Free, browser-only.",
    url: "https://workutilities.com/tools/svg-to-png",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/svg-to-png" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
