import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "HEIC to JPG Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert iPhone HEIC photos to JPG free online. No signup, no server upload. Fast HEIC to JPG conversion in your browser.",
  keywords:
    "heic to jpg converter free, convert heic to jpg online, iphone heic photo converter, heic to jpeg free",
  openGraph: {
    title: "HEIC to JPG Converter — Free Online",
    description:
      "Convert iPhone HEIC photos to JPG instantly. Free and browser-only.",
    url: "https://workutilities.com/tools/heic-to-jpg",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/heic-to-jpg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
