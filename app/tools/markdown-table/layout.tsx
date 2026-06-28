import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Markdown Table Generator Online Free — CSV to Markdown",
  },
  description:
    "Generate Markdown tables with a visual editor or paste CSV data. Align columns, add rows, copy markdown or HTML. Free, no signup, runs in browser.",
  keywords:
    "markdown table generator, CSV to markdown table, markdown table syntax generator",
  openGraph: {
    title: "Markdown Table Generator Online Free — CSV to Markdown",
    description:
      "Visual Markdown table editor with CSV import, column alignment, and HTML export.",
    url: "https://workutilities.com/tools/markdown-table",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/markdown-table",
  },
};

export default function MarkdownTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
