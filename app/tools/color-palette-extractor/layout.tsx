import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Color Palette Extractor Online Free — From Any Image" },
  description:
    "Extract a color palette from any image free online. Get HEX and RGB codes for dominant colors. Great for design, branding, and CSS. No signup.",
  keywords: "extract color palette from image, color palette extractor, dominant colors from image",
  openGraph: {
    title: "Color Palette Extractor Online Free — From Any Image",
    description: "Extract dominant colors with HEX and RGB codes from any image. Free, browser-only.",
    url: "https://workutilities.com/tools/color-palette-extractor",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/color-palette-extractor" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
