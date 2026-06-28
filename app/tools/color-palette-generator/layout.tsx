import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Color Palette Generator — Tailwind Scale from Any Hex",
  },
  description:
    "Generate a Tailwind 50-950 color palette from any hex color. Copy tailwind.config.js or CSS variables. WCAG contrast check included. Free, no signup.",
  keywords:
    "color palette generator Tailwind, Tailwind color scale generator, hex to Tailwind palette, CSS variables generator",
  openGraph: {
    title: "Color Palette Generator — Tailwind Scale from Any Hex",
    description:
      "Generate a complete Tailwind 50-950 color palette from your brand hex. CSS variables and WCAG contrast included.",
    url: "https://workutilities.com/tools/color-palette-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
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
