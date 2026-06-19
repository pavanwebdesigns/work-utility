import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "CSS Gradient Generator Online Free — Copy Ready CSS",
  },
  description:
    "Create CSS gradients visually and copy the code instantly. Linear, radial, and conic gradients with live preview and one-click copy. No signup needed.",
  keywords:
    "CSS gradient generator, linear gradient generator, radial gradient CSS, conic gradient online",
  openGraph: {
    title: "CSS Gradient Generator Online Free — Copy Ready CSS",
    description:
      "Build linear, radial, and conic CSS gradients with live preview and copy-ready code.",
    url: "https://workutilities.com/tools/css-gradient",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/css-gradient" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
