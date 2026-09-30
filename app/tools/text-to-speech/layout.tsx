import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Text to Speech Online Free — Convert Text to Audio" },
  description:
    "Free text to speech converter. Type or paste text and listen instantly with natural voices. No signup, works directly in your browser.",
  openGraph: buildOpenGraph({
    title: "Text to Speech Online Free — Convert Text to Audio",
    description: "Listen to your text with your browser's built-in voices. Free, no signup.",
    url: "https://workutilities.com/tools/text-to-speech",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/text-to-speech" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
