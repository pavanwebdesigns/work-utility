import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Text Diff Checker — Compare Text Online Free | WorkUtilities",
  },
  description:
    "Compare two texts and find differences online free. Highlight added, removed, and changed lines instantly.",
  keywords:
    "text diff checker online free, compare two texts, find text differences, diff tool online",
  openGraph: {
    title: "Text Diff Checker — Compare Text Online Free",
    description: "Highlight added, removed, and unchanged lines instantly.",
    url: "https://workutilities.com/tools/text-diff",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/text-diff" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
