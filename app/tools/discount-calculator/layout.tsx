import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Discount Calculator — Find Sale Price Free | WorkUtilities",
  },
  description:
    "Calculate discount amount and final price free online. Find percentage off and savings instantly.",
  openGraph: buildOpenGraph({
    title: "Discount Calculator — Find Sale Price Free",
    description:
      "Calculate discount amount and final price free online.",
    url: "https://workutilities.com/tools/discount-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/discount-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
