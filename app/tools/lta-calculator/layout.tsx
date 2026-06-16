import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "LTA Calculator — Leave Travel Allowance Free | WorkUtilities" },
  description:
    "Calculate LTA tax exemption free online. Find exempt and taxable Leave Travel Allowance amount.",
  keywords:
    "lta calculator online free, leave travel allowance exemption, lta tax exemption india",
  alternates: { canonical: "https://workutilities.com/tools/lta-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
