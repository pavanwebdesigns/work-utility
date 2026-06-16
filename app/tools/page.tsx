import type { Metadata } from "next";
import { ToolsPageClient } from "./ToolsPageClient";
import { ALL_TOOLS } from "@/lib/tools-data";

export const metadata: Metadata = {
  title: "All Free Online Tools — PDF, Image, Finance & More",
  description: `Browse ${ALL_TOOLS.length} free online tools for PDF, images, documents, finance, students, and everyday utilities. No signup required.`,
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}
