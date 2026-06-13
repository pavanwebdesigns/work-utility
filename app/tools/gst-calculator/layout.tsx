import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "GST Calculator Online Free — Add or Remove GST Instantly | WorkUtilities",
  },
  description:
    "Calculate GST amount with CGST and SGST split. Add or remove GST from any amount instantly. Free online GST calculator for India.",
  keywords:
    "gst calculator online free, add gst calculator, remove gst calculator india, cgst sgst calculator",
  openGraph: {
    title: "GST Calculator Online Free — Add or Remove GST Instantly",
    description:
      "Add or remove GST from any amount with CGST and SGST breakdown.",
    url: "https://workutilities.com/tools/gst-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/gst-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
