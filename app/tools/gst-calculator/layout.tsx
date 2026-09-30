import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "GST Calculator India Free — Add or Remove GST",
  },
  description:
    "Calculate GST with CGST and SGST split for any amount in India. Add or remove 5%, 12%, 18%, or 28% GST instantly. Free online GST calculator for India.",
  openGraph: buildOpenGraph({
    title: "GST Calculator India Free — Add or Remove GST",
    description:
      "Add or remove GST from any amount with CGST and SGST breakdown.",
    url: "https://workutilities.com/tools/gst-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/gst-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
