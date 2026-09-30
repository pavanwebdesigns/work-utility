import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "URL Encoder Decoder — Free Online | WorkUtilities" },
  description:
    "Encode and decode URLs free online. Convert special characters in URLs instantly. Fast, private, browser-only.",
  openGraph: buildOpenGraph({
    title: "URL Encoder Decoder — Free Online",
    description: "Encode and decode URLs instantly in your browser.",
    url: "https://workutilities.com/tools/url-encoder",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/url-encoder" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
