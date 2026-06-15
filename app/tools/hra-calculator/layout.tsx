import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "HRA Calculator — Tax Exemption Free Online | WorkUtilities",
  },
  description:
    "Calculate HRA exemption for income tax free online. Find exempt and taxable HRA as per Indian tax rules.",
  keywords:
    "hra calculator online free, hra exemption calculator, house rent allowance tax exemption india",
  openGraph: {
    title: "HRA Calculator — Tax Exemption Free Online",
    description: "Calculate exempt and taxable HRA as per Indian tax rules.",
    url: "https://workutilities.com/tools/hra-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/hra-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
