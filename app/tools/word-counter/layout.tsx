import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Word Counter Online Free — Count Words & Characters",
  },
  description:
    "Free word counter for essays and documents. Count words, characters, sentences, and reading time instantly. Built for students, writers, and professionals.",
  keywords:
    "word counter online free, character counter, count words in essay, reading time calculator india",
  openGraph: {
    title: "Word Counter Online Free — Count Words & Characters",
    description:
      "Count words, characters, sentences, and reading time instantly. Free and private.",
    url: "https://workutilities.com/tools/word-counter",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/word-counter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
