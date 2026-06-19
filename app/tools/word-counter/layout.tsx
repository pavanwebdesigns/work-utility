import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Word Counter Online Free — Count Words Instantly",
  },
  description:
    "Free online word counter. Count words, characters, sentences, reading time, and keyword density instantly. Perfect for essays, social media, and SEO. No signup.",
  keywords:
    "word counter online free, character counter, count words in essay, reading time calculator, keyword density",
  openGraph: {
    title: "Word Counter Online Free — Count Words Instantly",
    description:
      "Count words, characters, sentences, reading time, keyword density, and platform limits instantly. Free and private.",
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
