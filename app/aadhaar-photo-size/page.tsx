import type { Metadata } from "next";
import { buildOpenGraph, withRobots } from "@/lib/seo";
import { PhotoSizeGuidePage } from "@/components/PhotoSizeGuidePage";
import { getPhotoSizeGuide } from "@/lib/photo-size-guides";

const guide = getPhotoSizeGuide("aadhaar")!;

export const metadata: Metadata = withRobots("https://workutilities.com/aadhaar-photo-size", {
  title: {
    absolute:
      "Aadhaar Photo Size — 413×531px, 50KB & Free Resizer",
  },
  description:
    "Aadhaar photo size: 3.5×4.5 cm, 413×531 px at 300 DPI, max 50KB JPEG. Specs for printed enrollment photos — UIDAI does not accept online uploads.",
  openGraph: buildOpenGraph({
    title: "Aadhaar Photo Size — 413×531px, 50KB & Free Resizer",
    description:
      "Aadhaar photo size: 3.5×4.5 cm, 413×531 px at 300 DPI, max 50KB JPEG. Specs for printed enrollment photos — UIDAI does not accept online uploads.",
    url: "https://workutilities.com/aadhaar-photo-size",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/aadhaar-photo-size",
  },
});

export default function AadhaarPhotoSizePage() {
  return <PhotoSizeGuidePage guide={guide} />;
}
