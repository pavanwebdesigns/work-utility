import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "JSON Formatter & Validator — Free Online | WorkUtilities",
  },
  description:
    "Format, beautify and validate JSON online free. Minify JSON, fix errors, and view structured data instantly.",
  keywords:
    "json formatter online, json validator free, beautify json, json minifier",
  openGraph: {
    title: "JSON Formatter & Validator — Free Online",
    description: "Format, validate, and minify JSON instantly.",
    url: "https://workutilities.com/tools/json-formatter",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/json-formatter" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
