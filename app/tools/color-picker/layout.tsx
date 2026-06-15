import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Color Picker — HEX RGB HSL Free Online | WorkUtilities",
  },
  description:
    "Pick colors and get HEX, RGB, HSL values free online. Color palette generator and converter tool.",
  keywords:
    "color picker online free, hex to rgb converter, color code picker, rgb to hex",
  openGraph: {
    title: "Color Picker — HEX RGB HSL Free Online",
    description: "Pick colors and convert between HEX, RGB, and HSL.",
    url: "https://workutilities.com/tools/color-picker",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/color-picker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
