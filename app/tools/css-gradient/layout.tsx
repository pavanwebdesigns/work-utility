import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "CSS Gradient Generator Online Free — Copy Ready CSS",
  },
  description:
    "Create CSS gradients visually and copy the code instantly. Linear, radial, and conic gradients with live preview and one-click copy. No signup needed.",
  openGraph: buildOpenGraph({
    title: "CSS Gradient Generator Online Free — Copy Ready CSS",
    description:
      "Build linear, radial, and conic CSS gradients with live preview and copy-ready code.",
    url: "https://workutilities.com/tools/css-gradient",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/css-gradient" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
