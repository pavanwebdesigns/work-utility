import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "XML Formatter & Validator — Free Online | WorkUtilities" },
  description:
    "Format, beautify and validate XML data free online. Fix XML errors and view structured data instantly.",
  keywords: "xml formatter online free, xml validator, beautify xml online",
  alternates: { canonical: "https://workutilities.com/tools/xml-formatter" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
