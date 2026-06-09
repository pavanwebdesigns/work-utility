import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Remove Background from Image Free Online | WorkUtilities",
  },
  description:
    "Remove image background online free. No signup, no server upload. AI-powered background removal runs in your browser.",
  keywords:
    "remove background from image free, background remover online india, remove bg free",
  openGraph: {
    title: "Remove Background from Image Free Online",
    description:
      "AI-powered background removal in your browser. Free and private.",
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
