import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Box Shadow CSS Generator Online Free — Multi-Layer",
  },
  description:
    "Generate CSS box-shadow with multiple layers. Visual controls, copy CSS or Tailwind classes, preset styles (Apple, Google, Soft). Free, no signup.",
  keywords:
    "box shadow CSS generator, CSS box-shadow tool, multi-layer shadow generator, Tailwind shadow",
  openGraph: {
    title: "Box Shadow CSS Generator Online Free — Multi-Layer",
    description:
      "Create multi-layer CSS box shadows with live preview. Copy CSS or Tailwind classes.",
    url: "https://workutilities.com/tools/box-shadow-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/box-shadow-generator",
  },
};

export default function BoxShadowGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
