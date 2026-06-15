import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Excel to PDF Converter — Free Online | WorkUtilities",
  },
  description:
    "Convert Excel spreadsheets to PDF free online. No signup, browser-only Excel to PDF conversion. Fast and private.",
  keywords:
    "excel to pdf converter free, xlsx to pdf online, convert excel to pdf free india",
  openGraph: {
    title: "Excel to PDF Converter — Free Online",
    description:
      "Convert Excel spreadsheets to PDF instantly. Free and browser-only.",
    url: "https://workutilities.com/tools/excel-to-pdf",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/excel-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
