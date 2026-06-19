import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "SVG Code Previewer Online Free — Live Preview & Editor",
  },
  description:
    "Preview SVG code live in your browser. Split-pane editor with sanitize, prettify, copy, download, and checker, white, or dark backgrounds.",
  keywords:
    "svg previewer online, svg code editor, live svg preview, svg viewer free",
  openGraph: {
    title: "SVG Code Previewer Online Free — Live Preview & Editor",
    description:
      "Live SVG preview with code editor, prettify, copy, and download.",
    url: "https://workutilities.com/tools/svg-previewer",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/svg-previewer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
