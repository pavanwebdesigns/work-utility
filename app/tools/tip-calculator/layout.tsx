import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Tip Calculator — Split Bills Free Online | WorkUtilities",
  },
  description:
    "Calculate tip amount and split bills between friends free online. Works with USD and INR.",
  openGraph: buildOpenGraph({
    title: "Tip Calculator — Split Bills Free Online",
    description:
      "Calculate tip amount and split bills between friends free online.",
    url: "https://workutilities.com/tools/tip-calculator",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/tip-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
