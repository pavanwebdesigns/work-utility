import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "UUID Generator Online Free — v4 UUIDs Instantly" },
  description:
    "Generate random UUID v4 identifiers online free. Create one or hundreds at once, with or without hyphens. No signup, runs in your browser.",
  keywords:
    "uuid generator online free, generate uuid v4, random uuid generator, bulk uuid generator",
  openGraph: {
    title: "UUID Generator Online Free — v4 UUIDs Instantly",
    description:
      "Generate random UUID v4 identifiers online free. Create one or hundreds at once, with or without hyphens.",
    url: "https://workutilities.com/tools/uuid-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/uuid-generator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
