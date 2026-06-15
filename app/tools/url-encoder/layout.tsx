import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "URL Encoder Decoder — Free Online | WorkUtilities" },
  description:
    "Encode and decode URLs free online. Convert special characters in URLs instantly. Fast, private, browser-only.",
  keywords:
    "url encoder decoder online free, encode url, decode url online, percent encoding",
  openGraph: {
    title: "URL Encoder Decoder — Free Online",
    description: "Encode and decode URLs instantly in your browser.",
    url: "https://workutilities.com/tools/url-encoder",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/url-encoder" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
