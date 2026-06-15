import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "CSV to JSON Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert CSV data to JSON format free online. Paste CSV or upload a file. Instant conversion with preview.",
  keywords:
    "csv to json converter free, csv to json online, convert csv to json, csv parser online",
  openGraph: {
    title: "CSV to JSON Converter — Free Online",
    description: "Paste CSV or upload a file for instant JSON conversion.",
    url: "https://workutilities.com/tools/csv-to-json",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/csv-to-json" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
