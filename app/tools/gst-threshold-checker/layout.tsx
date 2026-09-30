import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "GST Registration Checker for Freelancers India 2026",
  },
  description:
    "Do you need GST registration? Check the ₹20 lakh threshold for Indian freelancers and IT contractors. Special state rules, inter-state, and export explained. Free tool.",
  openGraph: buildOpenGraph({
    title: "GST Registration Checker for Freelancers India 2026",
    description:
      "Check if GST registration is mandatory for your freelance income.",
    url: "https://workutilities.com/tools/gst-threshold-checker",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/gst-threshold-checker",
  },
};

export default function GstThresholdCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
