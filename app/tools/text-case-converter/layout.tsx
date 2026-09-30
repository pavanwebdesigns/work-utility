import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Text Case Converter — Free Online | WorkUtilities" },
  description:
    "Convert text to uppercase, lowercase, title case, camelCase, snake_case and more. Free online text case tool.",
  openGraph: buildOpenGraph({
    title: "Text Case Converter — Free Online",
    description: "Convert text between 11 case formats instantly.",
    url: "https://workutilities.com/tools/text-case-converter",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/text-case-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
