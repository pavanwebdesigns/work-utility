import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Unix Timestamp Converter — Epoch to Date Online Free",
  },
  description:
    "Convert Unix timestamps to readable dates and back. See current epoch time live. Auto-detects seconds vs milliseconds instantly. No signup needed.",
  openGraph: buildOpenGraph({
    title: "Unix Timestamp Converter — Epoch to Date Online Free",
    description:
      "Live current Unix timestamp plus bidirectional epoch-to-date conversion in your browser.",
    url: "https://workutilities.com/tools/timestamp-converter",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/timestamp-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
