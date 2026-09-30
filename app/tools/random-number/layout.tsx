import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Random Number Generator — Free Online | WorkUtilities",
  },
  description:
    "Generate random numbers, lists, and unique IDs free online. Customizable range and count. Instant results.",
  openGraph: buildOpenGraph({
    title: "Random Number Generator — Free Online",
    description: "Generate random numbers, lists, UUIDs, and dice rolls.",
    url: "https://workutilities.com/tools/random-number",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/random-number" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
