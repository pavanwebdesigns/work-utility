import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Text Diff Checker — Compare Text Online Free | WorkUtilities",
  },
  description:
    "Compare two texts and find differences online free. Highlight added, removed, and changed lines instantly.",
  openGraph: buildOpenGraph({
    title: "Text Diff Checker — Compare Text Online Free",
    description: "Highlight added, removed, and unchanged lines instantly.",
    url: "https://workutilities.com/tools/text-diff",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/text-diff" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
