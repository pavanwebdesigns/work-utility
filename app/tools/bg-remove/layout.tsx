import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Remove Background from Image Free Online | WorkUtilities",
  },
  description:
    "Remove image background online free. AI-powered cutout with transparent PNG download. Max 10MB, JPG/PNG/WebP supported.",
  keywords:
    "remove background from image free, background remover online india, remove bg free",
  openGraph: {
    title: "Remove Background from Image Free Online",
    description:
      "AI background removal with transparent PNG download. Free, up to 10MB.",
    url: "https://workutilities.com/tools/bg-remove",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/bg-remove",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
