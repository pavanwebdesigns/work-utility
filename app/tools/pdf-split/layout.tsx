import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "PDF Split — Extract Pages from PDF Free | WorkUtilities",
  },
  description:
    "Split PDF files online free. Extract specific pages or split into individual pages. Browser-only, no server upload.",
  openGraph: buildOpenGraph({
    title: "PDF Split — Extract Pages from PDF Free",
    description:
      "Split PDF pages online. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-split",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-split",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
