import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "JSON to CSV Converter Online Free — No Signup",
  },
  description:
    "Convert JSON arrays to CSV online free. Paste JSON data and download a spreadsheet-ready CSV file instantly. No signup, runs in your browser.",
  keywords:
    "JSON to CSV converter, convert JSON to CSV online, JSON array to spreadsheet, export JSON to Excel",
  openGraph: {
    title: "JSON to CSV Converter Online Free — No Signup",
    description:
      "Paste a JSON array and download spreadsheet-ready CSV instantly in your browser.",
    url: "https://workutilities.com/tools/json-to-csv",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/json-to-csv" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
