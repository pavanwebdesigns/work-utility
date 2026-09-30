import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Number to Words Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert numbers to words in English free online. Supports Indian and International number systems.",
  openGraph: buildOpenGraph({
    title: "Number to Words Converter — Free Online",
    description:
      "Convert numbers to words in English with Indian and International systems.",
    url: "https://workutilities.com/tools/number-to-words",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/number-to-words" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
