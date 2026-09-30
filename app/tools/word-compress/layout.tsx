import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

const title = "Compress Word Document Online Free — Reduce DOCX Size";
const description =
  "Reduce Word (.docx) file size by compressing images. Free, no signup, runs in your browser — your file is never uploaded.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: buildOpenGraph({
    title,
    description,
    url: "https://workutilities.com/tools/word-compress",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/word-compress",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
