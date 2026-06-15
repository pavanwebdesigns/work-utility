import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Lorem Ipsum Generator — Free Online | WorkUtilities" },
  description:
    "Generate lorem ipsum placeholder text free online. Choose paragraphs, sentences, or words. Copy instantly.",
  keywords:
    "lorem ipsum generator free, placeholder text generator, dummy text generator online",
  openGraph: {
    title: "Lorem Ipsum Generator — Free Online",
    description: "Generate lorem ipsum placeholder text instantly.",
    url: "https://workutilities.com/tools/lorem-ipsum",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/lorem-ipsum" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
