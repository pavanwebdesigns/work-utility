import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Hash Generator — MD5 SHA-256 Free Online | WorkUtilities",
  },
  description:
    "Generate MD5, SHA-1, SHA-256, SHA-512 hashes free online. Fast, private, browser-only hash generator.",
  openGraph: buildOpenGraph({
    title: "Hash Generator — MD5 SHA-256 Free Online",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-512 hashes free online.",
    url: "https://workutilities.com/tools/hash-generator",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/hash-generator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
