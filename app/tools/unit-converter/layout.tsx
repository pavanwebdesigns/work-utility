import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Unit Converter Online Free — Length, Weight, Temp",
  },
  description:
    "Convert units instantly — length, weight, temperature, area, speed, volume and more. Free online unit converter with 50+ unit types. No signup, instant results.",
  keywords:
    "unit converter online free, length converter, weight converter, temperature converter india",
  openGraph: {
    title: "Unit Converter Online Free — Length, Weight, Temp",
    description:
      "Convert units instantly — length, weight, temperature, area, speed, volume and more. Free online unit converter with 50+ unit types. No signup, instant results.",
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
