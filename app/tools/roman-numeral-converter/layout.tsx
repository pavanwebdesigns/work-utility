import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Roman Numeral Converter — Number to Roman & Back" },
  description:
    "Convert numbers to Roman numerals or Roman numerals to numbers free online. Instant, accurate conversion both directions. No signup needed.",
  keywords:
    "roman numeral converter, number to roman numeral, roman numerals to number, roman numeral calculator",
  openGraph: {
    title: "Roman Numeral Converter — Number to Roman & Back",
    description:
      "Convert numbers to Roman numerals or Roman numerals to numbers free online. Instant, accurate conversion both directions.",
    url: "https://workutilities.com/tools/roman-numeral-converter",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/roman-numeral-converter" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
