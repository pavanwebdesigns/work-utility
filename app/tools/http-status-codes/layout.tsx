import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "HTTP Status Codes Reference — Quick Developer Guide",
  },
  description:
    "Complete HTTP status code reference with practical context. 1xx-5xx codes explained with causes, examples, and what to do. Searchable developer reference.",
  openGraph: buildOpenGraph({
    title: "HTTP Status Codes Reference — Quick Developer Guide",
    description:
      "Searchable HTTP status code reference with practical developer context for 1xx through 5xx.",
    url: "https://workutilities.com/tools/http-status-codes",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/http-status-codes",
  },
};

export default function HttpStatusCodesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
