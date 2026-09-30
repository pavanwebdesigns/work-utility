import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "PPT to PDF Converter — Free Online | WorkUtilities" },
  description:
    "Convert PowerPoint presentations to PDF free online. No signup, browser-only PPT to PDF conversion.",
  openGraph: buildOpenGraph({
    title: "PPT to PDF Converter — Free Online",
    description: "Convert PowerPoint presentations to PDF instantly.",
    url: "https://workutilities.com/tools/ppt-to-pdf",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/ppt-to-pdf" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
