import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Remove Background from Image Free Online | WorkUtilities",
  },
  description:
    "Remove image backgrounds free online. AI-powered, 100% in-browser — no uploads, no server, no account needed.",
  openGraph: buildOpenGraph({
    title: "Remove Background from Image Free Online",
    description:
      "AI background removal in your browser. Free, unlimited, private — nothing uploaded.",
    url: "https://workutilities.com/tools/bg-remove",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/bg-remove",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
