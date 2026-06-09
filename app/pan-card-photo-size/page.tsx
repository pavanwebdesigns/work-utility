import type { Metadata } from "next";
import { PhotoSizeGuidePage } from "@/components/PhotoSizeGuidePage";
import { getPhotoSizeGuide } from "@/lib/photo-size-guides";

const guide = getPhotoSizeGuide("pan")!;

export const metadata: Metadata = {
  title: {
    absolute: "PAN Card Photo Size — NSDL & UTI Requirements 2025",
  },
  description:
    "PAN card photo size requirements for NSDL and UTI portal. 3.5x2.5cm, max 300KB. Resize your photo free online.",
  openGraph: {
    title: "PAN Card Photo Size — NSDL & UTI Requirements 2025",
    description:
      "PAN card photo size requirements for NSDL and UTI portal. 3.5x2.5cm, max 300KB. Resize your photo free online.",
    url: "https://workutilities.com/pan-card-photo-size",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/pan-card-photo-size",
  },
};

export default function PanCardPhotoSizePage() {
  return <PhotoSizeGuidePage guide={guide} />;
}
