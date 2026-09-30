import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Character Counter — Free Online Tool | WorkUtilities",
  },
  description:
    "Count characters, words, sentences and paragraphs free online. Real-time counting with no signup required.",
  openGraph: buildOpenGraph({
    title: "Character Counter — Free Online Tool",
    description:
      "Count characters, words, sentences and paragraphs free online. Real-time counting with no signup required.",
    url: "https://workutilities.com/tools/character-counter",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/character-counter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
