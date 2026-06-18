import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Unit Converter Free — Length, Weight, Temperature",
  },
  description:
    "Convert length, weight, temperature, area, volume, speed, and data units instantly. Free online unit converter with real-time results for metric and imperial.",
  keywords:
    "unit converter online free, length converter, weight converter, temperature converter india",
  openGraph: {
    title: "Unit Converter Free — Length, Weight, Temperature",
    description:
      "Convert any unit instantly with real-time results and all-unit view.",
    url: "https://workutilities.com/tools/unit-converter",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/unit-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
