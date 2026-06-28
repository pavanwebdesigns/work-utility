import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "robots.txt Generator Online Free — Build & Download",
  },
  description:
    "Generate a valid robots.txt file for your website. Add user-agents, allow/disallow rules, and sitemap URL. Download or copy instantly. No signup.",
  keywords:
    "robots.txt generator, robots txt builder, create robots.txt, block GPTBot robots.txt",
  openGraph: {
    title: "robots.txt Generator Online Free — Build & Download",
    description:
      "Build robots.txt with user-agent rules, allow/disallow paths, and sitemap. Copy or download instantly.",
    url: "https://workutilities.com/tools/robots-txt-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/robots-txt-generator",
  },
};

export default function RobotsTxtGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
