import type { Metadata } from "next";
import { PhotoSizeGuidePage } from "@/components/PhotoSizeGuidePage";
import { getPhotoSizeGuide } from "@/lib/photo-size-guides";

const guide = getPhotoSizeGuide("passport")!;

export const metadata: Metadata = {
  title: {
    absolute:
      "Passport Photo Size India — 35x45mm Official Requirements 2025",
  },
  description:
    "Indian passport photo size is 35x45mm, white background, max 50KB. Complete requirements and free online resizer.",
  openGraph: {
    title: "Passport Photo Size India — 35x45mm Official Requirements 2025",
    description:
      "Indian passport photo size is 35x45mm, white background, max 50KB. Complete requirements and free online resizer.",
    url: "https://workutilities.com/passport-photo-size-india",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/passport-photo-size-india",
  },
};

export default function PassportPhotoSizePage() {
  return <PhotoSizeGuidePage guide={guide} />;
}
