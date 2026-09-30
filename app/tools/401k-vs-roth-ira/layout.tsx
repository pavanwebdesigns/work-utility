import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "401k vs Roth IRA Calculator 2026 — Which Is Better?",
  },
  description:
    "Compare Traditional 401k, Roth 401k, and Roth IRA for your retirement. See which saves more based on your tax brackets. 2026 limits, no-RMD Roth benefit. Free.",
  openGraph: buildOpenGraph({
    title: "401k vs Roth IRA Calculator 2026 — Which Is Better?",
    description:
      "Compare Traditional 401k, Roth 401k, and Roth IRA side by side with tax bracket verdict.",
    url: "https://workutilities.com/tools/401k-vs-roth-ira",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/401k-vs-roth-ira",
  },
};

export default function FourOhOneKVsRothIraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
