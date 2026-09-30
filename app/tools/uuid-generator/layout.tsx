import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "UUID Generator Online Free — v4 UUIDs Instantly" },
  description:
    "Generate random UUID v4 identifiers online free. Create one or hundreds at once, with or without hyphens. No signup, runs in your browser.",
  openGraph: buildOpenGraph({
    title: "UUID Generator Online Free — v4 UUIDs Instantly",
    description:
      "Generate random UUID v4 identifiers online free. Create one or hundreds at once, with or without hyphens.",
    url: "https://workutilities.com/tools/uuid-generator",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/uuid-generator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
