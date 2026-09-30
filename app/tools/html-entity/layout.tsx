import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "HTML Entity Encoder Decoder — Free Online | WorkUtilities",
  },
  description:
    "Encode and decode HTML entities free online. Convert special characters to HTML-safe entities instantly.",
  openGraph: buildOpenGraph({
    title: "HTML Entity Encoder Decoder — Free Online",
    description:
      "Encode and decode HTML entities free online. Convert special characters to HTML-safe entities instantly.",
    url: "https://workutilities.com/tools/html-entity",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/html-entity",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
