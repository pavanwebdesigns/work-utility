import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Color Palette Generator — Tailwind Scale from Any Hex",
  },
  description:
    "Generate a Tailwind 50-950 color palette from any hex color. Copy tailwind.config.js or CSS variables. WCAG contrast check included. Free, no signup.",
  openGraph: buildOpenGraph({
    title: "Color Palette Generator — Tailwind Scale from Any Hex",
    description:
      "Generate a complete Tailwind 50-950 color palette from your brand hex. CSS variables and WCAG contrast included.",
    url: "https://workutilities.com/tools/color-palette-generator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/color-palette-generator",
  },
};

export default function ColorPaletteGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
