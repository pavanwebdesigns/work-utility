import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Rent Receipt Generator Free — PDF for HRA Claims",
  },
  description:
    "Generate professional rent receipt PDFs for HRA tax claims in India. Create single or multi-month receipts with landlord and tenant details. Free download.",
  keywords:
    "rent receipt generator free, rent receipt pdf download, hra rent receipt format india",
  openGraph: {
    title: "Rent Receipt Generator Free — PDF for HRA Claims",
    description:
      "Create and download professional rent receipt PDFs for multiple months.",
    url: "https://workutilities.com/tools/rent-receipt-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/rent-receipt-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
