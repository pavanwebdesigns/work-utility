import type { Metadata } from "next";
import { ToolsPageClient } from "./ToolsPageClient";

export const metadata: Metadata = {
  title: "All Free Online Tools — PDF, Image, Finance & More",
  description:
    "Browse 29 free online tools for PDF, images, documents, finance, students, and everyday utilities. No signup required.",
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}
