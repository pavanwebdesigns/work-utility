import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";
import { ToolsPageClient } from "./ToolsPageClient";
import { ALL_TOOLS } from "@/lib/tools-data";

const TOOLS_TITLE = "All Free Online Tools — PDF, Image, Finance & More";
const TOOLS_DESCRIPTION = `Browse ${ALL_TOOLS.length} free online tools for PDF, images, documents, finance, students, and everyday utilities. No signup required.`;

export const metadata: Metadata = {
  title: TOOLS_TITLE,
  description: TOOLS_DESCRIPTION,
  alternates: { canonical: "https://workutilities.com/tools" },
  openGraph: buildOpenGraph({
    title: TOOLS_TITLE,
    description: TOOLS_DESCRIPTION,
    url: "https://workutilities.com/tools",
    type: "website",
  }),
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}
