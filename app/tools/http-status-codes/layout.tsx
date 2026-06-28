import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "HTTP Status Codes Reference — Quick Developer Guide",
  },
  description:
    "Complete HTTP status code reference with practical context. 1xx-5xx codes explained with causes, examples, and what to do. Searchable developer reference.",
  keywords:
    "HTTP status codes, 401 vs 403, 404 not found, 429 rate limit, 502 bad gateway reference",
  openGraph: {
    title: "HTTP Status Codes Reference — Quick Developer Guide",
    description:
      "Searchable HTTP status code reference with practical developer context for 1xx through 5xx.",
    url: "https://workutilities.com/tools/http-status-codes",
    siteName: "WorkUtilities",
    type: "website",
  },
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
