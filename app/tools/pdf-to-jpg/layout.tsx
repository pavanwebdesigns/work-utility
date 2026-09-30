import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "PDF to JPG — Convert PDF Pages to Images Free | WorkUtilities",
  },
  description:
    "Convert PDF pages to JPG images free online. Extract each page as a high-quality image. Processed on our secure server over HTTPS and deleted immediately. No signup.",
  openGraph: buildOpenGraph({
    title: "PDF to JPG — Convert PDF Pages to Images Free",
    description:
      "Convert each PDF page to JPG. Processed securely and deleted after conversion.",
    url: "https://workutilities.com/tools/pdf-to-jpg",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-to-jpg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
