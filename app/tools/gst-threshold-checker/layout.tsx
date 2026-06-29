import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "GST Registration Checker for Freelancers India 2026",
  },
  description:
    "Do you need GST registration? Check the ₹20 lakh threshold for Indian freelancers and IT contractors. Special state rules, inter-state, and export explained. Free tool.",
  keywords:
    "GST registration threshold freelancer India, GST checker 20 lakh",
  openGraph: {
    title: "GST Registration Checker for Freelancers India 2026",
    description:
      "Check if GST registration is mandatory for your freelance income.",
    url: "https://workutilities.com/tools/gst-threshold-checker",
    siteName: "WorkUtilities",
    type: "website",
  },
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
