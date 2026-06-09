import type { Metadata } from "next";
import { PhotoSizeGuidePage } from "@/components/PhotoSizeGuidePage";
import { getPhotoSizeGuide } from "@/lib/photo-size-guides";

const guide = getPhotoSizeGuide("aadhaar")!;

export const metadata: Metadata = {
  title: {
    absolute:
      "Aadhaar Card Photo Size — Dimensions, KB Limit & Resize Free",
  },
  description:
    "Aadhaar card photo size is 35x45mm, 413x531 pixels, max 50KB. Learn exact requirements and resize your photo free online.",
  openGraph: {
    title: "Aadhaar Card Photo Size — Dimensions, KB Limit & Resize Free",
    description:
      "Aadhaar card photo size is 35x45mm, 413x531 pixels, max 50KB. Learn exact requirements and resize your photo free online.",
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
