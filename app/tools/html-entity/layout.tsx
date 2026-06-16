import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "HTML Entity Encoder Decoder — Free Online | WorkUtilities",
  },
  description:
    "Encode and decode HTML entities free online. Convert special characters to HTML-safe entities instantly.",
  keywords:
    "html entity encoder decoder free, html special characters converter, html escape online",
  openGraph: {
    title: "HTML Entity Encoder Decoder — Free Online",
    description:
      "Encode and decode HTML entities free online. Convert special characters to HTML-safe entities instantly.",
    url: "https://workutilities.com/tools/html-entity",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/html-entity",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
