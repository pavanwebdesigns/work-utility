import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "SQL Formatter Online Free — Beautify & Format Queries" },
  description:
    "Format and beautify SQL queries online free. Auto-indent, capitalize keywords, and make long queries readable. No signup, runs in your browser.",
  keywords: "sql formatter online, beautify sql, format sql query free, sql pretty print",
  openGraph: {
    title: "SQL Formatter Online Free — Beautify & Format Queries",
    description: "Format and beautify SQL queries with keyword capitalization and indentation. Free, browser-only.",
    url: "https://workutilities.com/tools/sql-formatter",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/sql-formatter" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
