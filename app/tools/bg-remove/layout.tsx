import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Remove Background from Image Free Online | WorkUtilities",
  },
  description:
    "Remove image backgrounds free online. AI-powered, 100% in-browser — no uploads, no server, no account needed.",
  keywords:
    "remove background from image free, background remover online india, remove bg free",
  openGraph: {
    title: "Remove Background from Image Free Online",
    description:
      "AI background removal in your browser. Free, unlimited, private — nothing uploaded.",
    url: "https://workutilities.com/tools/bg-remove",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/bg-remove",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
