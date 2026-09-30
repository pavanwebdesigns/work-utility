import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Rent Receipt Generator Free — PDF for HRA Claims",
  },
  description:
    "Generate professional rent receipt PDFs for HRA tax claims in India. Create single or multi-month receipts with landlord and tenant details. Free download.",
  openGraph: buildOpenGraph({
    title: "Rent Receipt Generator Free — PDF for HRA Claims",
    description:
      "Create and download professional rent receipt PDFs for multiple months.",
    url: "https://workutilities.com/tools/rent-receipt-generator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/rent-receipt-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
