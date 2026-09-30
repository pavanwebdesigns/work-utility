import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Markdown to HTML Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert Markdown to HTML free online. Live preview, syntax highlighting, copy HTML instantly.",
  openGraph: buildOpenGraph({
    title: "Markdown to HTML Converter — Free Online",
    description: "Convert Markdown to HTML with live preview.",
    url: "https://workutilities.com/tools/markdown-to-html",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/markdown-to-html",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
