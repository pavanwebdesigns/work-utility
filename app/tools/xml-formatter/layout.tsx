import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "XML Formatter & Validator — Free Online | WorkUtilities" },
  description:
    "Format, beautify and validate XML data free online. Fix XML errors and view structured data instantly.",
  alternates: { canonical: "https://workutilities.com/tools/xml-formatter" },
  openGraph: buildOpenGraph({
    title: "XML Formatter & Validator — Free Online | WorkUtilities",
    description:
      "Format, beautify and validate XML data free online. Fix XML errors and view structured data instantly.",
    url: "https://workutilities.com/tools/xml-formatter",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
