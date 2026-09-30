import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "SVG Code Previewer Online Free — Live Preview & Editor",
  },
  description:
    "Preview SVG code live in your browser. Split-pane editor with sanitize, prettify, copy, download, and checker, white, or dark backgrounds.",
  openGraph: buildOpenGraph({
    title: "SVG Code Previewer Online Free — Live Preview & Editor",
    description:
      "Live SVG preview with code editor, prettify, copy, and download.",
    url: "https://workutilities.com/tools/svg-previewer",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/svg-previewer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
