import type { Metadata } from "next";
import { PhotoSizeGuidePage } from "@/components/PhotoSizeGuidePage";
import { getPhotoSizeGuide } from "@/lib/photo-size-guides";

const guide = getPhotoSizeGuide("aadhaar")!;

export const metadata: Metadata = {
  title: {
    absolute:
      "Aadhaar Photo Size — 413×531 Pixels, 50KB Limit & Free Resizer",
  },
  description:
    "Aadhaar photo size: 3.5×4.5 cm, 413×531 pixels at 300 DPI, max 50KB JPEG. Specs for printed photos at enrollment centers — UIDAI does not accept online photo uploads.",
  openGraph: {
    title: "Aadhaar Photo Size — 413×531 Pixels, 50KB Limit & Free Resizer",
    description:
      "Aadhaar photo size: 3.5×4.5 cm, 413×531 pixels at 300 DPI, max 50KB JPEG. Specs for printed photos at enrollment centers — UIDAI does not accept online photo uploads.",
    url: "https://workutilities.com/aadhaar-photo-size",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/aadhaar-photo-size",
  },
};

export default function AadhaarPhotoSizePage() {
  return <PhotoSizeGuidePage guide={guide} />;
}
