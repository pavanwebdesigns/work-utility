import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Lorem Ipsum Generator — Free Online | WorkUtilities" },
  description:
    "Generate lorem ipsum placeholder text free online. Choose paragraphs, sentences, or words. Copy instantly.",
  openGraph: buildOpenGraph({
    title: "Lorem Ipsum Generator — Free Online",
    description: "Generate lorem ipsum placeholder text instantly.",
    url: "https://workutilities.com/tools/lorem-ipsum",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/lorem-ipsum" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
