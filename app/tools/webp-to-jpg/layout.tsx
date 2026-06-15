import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "WebP to JPG Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert WebP images to JPG or PNG free online. Fast, private, browser-only WebP converter. No signup needed.",
  keywords:
    "webp to jpg converter free, convert webp to jpeg, webp to png online free",
  openGraph: {
    title: "WebP to JPG Converter — Free Online",
    description:
      "Convert WebP images to JPG or PNG instantly. Free and browser-only.",
    url: "https://workutilities.com/tools/webp-to-jpg",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/webp-to-jpg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
