import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Color Contrast Checker — WCAG Free Online | WorkUtilities",
  },
  description:
    "Check color contrast ratios for WCAG accessibility compliance free online. Test foreground and background colors.",
  openGraph: buildOpenGraph({
    title: "Color Contrast Checker — WCAG Free Online",
    description:
      "Check color contrast ratios for WCAG accessibility compliance free online. Test foreground and background colors.",
    url: "https://workutilities.com/tools/color-contrast",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/color-contrast",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
