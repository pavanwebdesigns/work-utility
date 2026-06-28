import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Glassmorphism CSS Generator Free — Copy CSS & Tailwind",
  },
  description:
    "Generate glassmorphism CSS with live preview. Copy pure CSS, Tailwind classes, or CSS variables. Firefox fallback included. Blur, transparency, border controls.",
  keywords:
    "glassmorphism CSS generator, frosted glass CSS, backdrop-filter generator, Tailwind glassmorphism",
  openGraph: {
    title: "Glassmorphism CSS Generator Free — Copy CSS & Tailwind",
    description:
      "Create frosted glass UI effects with CSS, Tailwind, or CSS variables output.",
    url: "https://workutilities.com/tools/glassmorphism-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/glassmorphism-generator",
  },
};

export default function GlassmorphismGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
