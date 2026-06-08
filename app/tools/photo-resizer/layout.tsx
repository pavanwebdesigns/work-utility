import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Photo Resizer — Aadhaar, PAN, Passport Size | WorkUtilities",
  },
  description:
    "Resize photos to exact Aadhaar card, PAN card, and passport size online free. Perfect dimensions for Indian government documents.",
  keywords:
    "photo resize aadhaar size, pan card photo size, passport size photo online, photo resizer india",
  openGraph: {
    title: "Photo Resizer — Aadhaar, PAN, Passport Size",
    description:
      "Resize photos for Indian government documents. Free and browser-only.",
    url: "https://workutilities.com/tools/photo-resizer",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/photo-resizer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
