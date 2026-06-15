import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Discount Calculator — Find Sale Price Free | WorkUtilities",
  },
  description:
    "Calculate discount amount and final price free online. Find percentage off and savings instantly.",
  keywords:
    "discount calculator free, sale price calculator, percentage off calculator, final price calculator",
  openGraph: {
    title: "Discount Calculator — Find Sale Price Free",
    description:
      "Calculate discount amount and final price free online.",
    url: "https://workutilities.com/tools/discount-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/discount-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
