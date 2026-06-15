import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Aspect Ratio Calculator — Free Online | WorkUtilities",
  },
  description:
    "Calculate image aspect ratios and resize dimensions free online. Find width or height for any aspect ratio instantly.",
  keywords:
    "aspect ratio calculator free, image aspect ratio, 16x9 calculator, resize dimensions calculator",
  openGraph: {
    title: "Aspect Ratio Calculator — Free Online",
    description: "Calculate aspect ratios and dimensions instantly.",
    url: "https://workutilities.com/tools/aspect-ratio",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/aspect-ratio" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
