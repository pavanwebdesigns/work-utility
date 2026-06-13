import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Rent Receipt Generator Free — Download PDF Rent Receipt India | WorkUtilities",
  },
  description:
    "Generate professional rent receipts for HRA claims. Create single or multiple month PDF rent receipts instantly.",
  keywords:
    "rent receipt generator free, rent receipt pdf download, hra rent receipt format india",
  openGraph: {
    title: "Rent Receipt Generator Free — Download PDF Rent Receipt India",
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
