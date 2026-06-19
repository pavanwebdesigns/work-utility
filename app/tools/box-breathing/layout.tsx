import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Box Breathing Timer Online — 4-4-4-4 Guided Exercise",
  },
  description:
    "Use this free box breathing timer online for a guided 4-4-4-4 exercise. Animated square, adjustable 3–8 second phases, 4-7-8 preset, and rounds counter.",
  keywords:
    "box breathing timer, 4-4-4-4 breathing, guided breathing exercise, 4-7-8 breathing online",
  openGraph: {
    title: "Box Breathing Timer Online — 4-4-4-4 Guided Exercise",
    description:
      "Free guided box breathing with animated square, adjustable phases, and 4-7-8 preset.",
    url: "https://workutilities.com/tools/box-breathing",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/box-breathing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
