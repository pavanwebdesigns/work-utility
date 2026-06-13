import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Unit Converter Online Free — Length, Weight, Temperature & More | WorkUtilities",
  },
  description:
    "Convert length, weight, temperature, area, volume, speed, and data units instantly. Free online unit converter.",
  keywords:
    "unit converter online free, length converter, weight converter, temperature converter india",
  openGraph: {
    title: "Unit Converter Online Free — Length, Weight, Temperature & More",
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
