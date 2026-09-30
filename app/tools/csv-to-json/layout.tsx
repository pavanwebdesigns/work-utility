import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "CSV to JSON Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert CSV data to JSON format free online. Paste CSV or upload a file. Instant conversion with preview.",
  openGraph: buildOpenGraph({
    title: "CSV to JSON Converter — Free Online",
    description: "Paste CSV or upload a file for instant JSON conversion.",
    url: "https://workutilities.com/tools/csv-to-json",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/csv-to-json" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
