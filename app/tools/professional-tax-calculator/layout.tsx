import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Professional Tax Calculator India — All States 2026",
  },
  description:
    "Calculate professional tax for all 18 Indian states free online. State-wise slabs, Maharashtra women's exemption, February quirk explained. No signup.",
  keywords:
    "professional tax calculator India, PT calculator state wise, Maharashtra professional tax 2026",
  openGraph: {
    title: "Professional Tax Calculator India — All States 2026",
    description:
      "Calculate professional tax for all 18 Indian states. Maharashtra February quirk and women's exemption included.",
    url: "https://workutilities.com/tools/professional-tax-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/professional-tax-calculator",
  },
};

export default function ProfessionalTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
