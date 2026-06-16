import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Morse Code Converter — Free Online Translator | WorkUtilities" },
  description:
    "Convert text to Morse code and back free online. Learn Morse code with instant translation.",
  keywords:
    "morse code converter free, text to morse code, morse code translator online",
  alternates: { canonical: "https://workutilities.com/tools/morse-code" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
