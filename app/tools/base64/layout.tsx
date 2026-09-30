import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Base64 Encoder Decoder — Free Online | WorkUtilities",
  },
  description:
    "Encode and decode Base64 text or files free online. Fast, private, browser-only Base64 converter.",
  openGraph: buildOpenGraph({
    title: "Base64 Encoder Decoder — Free Online",
    description: "Encode and decode Base64 text or files instantly.",
    url: "https://workutilities.com/tools/base64",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/base64" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
