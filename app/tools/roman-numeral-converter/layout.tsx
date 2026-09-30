import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Roman Numeral Converter — Number to Roman & Back" },
  description:
    "Convert numbers to Roman numerals or Roman numerals to numbers free online. Instant, accurate conversion both directions. No signup needed.",
  openGraph: buildOpenGraph({
    title: "Roman Numeral Converter — Number to Roman & Back",
    description:
      "Convert numbers to Roman numerals or Roman numerals to numbers free online. Instant, accurate conversion both directions.",
    url: "https://workutilities.com/tools/roman-numeral-converter",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/roman-numeral-converter" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
