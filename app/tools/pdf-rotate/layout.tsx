import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Rotate PDF Pages Online Free — Fix Sideways Scans",
  },
  description:
    "Rotate PDF pages online free — fix sideways or upside-down scanned pages. Rotate individual pages or the whole document. No signup, no uploads.",
  keywords:
    "rotate pdf online, rotate pdf pages free, fix sideways pdf scan, rotate pdf 90 degrees",
  openGraph: {
    title: "Rotate PDF Pages Online Free — Fix Sideways Scans",
    description:
      "Rotate individual PDF pages or the whole document by 90°, 180°, or 270°. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-rotate",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-rotate",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
