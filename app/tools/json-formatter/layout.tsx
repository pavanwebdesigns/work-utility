import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "JSON Formatter & Validator — Free Online | WorkUtilities",
  },
  description:
    "Format, beautify and validate JSON online free. Minify JSON, fix errors, and view structured data instantly.",
  openGraph: buildOpenGraph({
    title: "JSON Formatter & Validator — Free Online",
    description: "Format, validate, and minify JSON instantly.",
    url: "https://workutilities.com/tools/json-formatter",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/json-formatter" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
