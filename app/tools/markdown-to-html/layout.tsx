import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Markdown to HTML Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert Markdown to HTML free online. Live preview, syntax highlighting, copy HTML instantly.",
  keywords:
    "markdown to html converter free, md to html online, markdown preview",
  openGraph: {
    title: "Markdown to HTML Converter — Free Online",
    description: "Convert Markdown to HTML with live preview.",
    url: "https://workutilities.com/tools/markdown-to-html",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/markdown-to-html",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
