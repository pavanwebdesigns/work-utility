import type { Metadata } from "next";
import { PhotoSizeGuidePage } from "@/components/PhotoSizeGuidePage";
import { getPhotoSizeGuide } from "@/lib/photo-size-guides";

const guide = getPhotoSizeGuide("passport")!;

export const metadata: Metadata = {
  title: {
    absolute:
      "Passport Photo Size India 2026 — 35×45mm, 630×810 Pixels & Free Resizer",
  },
  description:
    "Indian passport photo size changed September 2025: 35×45mm portrait, 630×810 pixels, 10–250KB JPEG. Old 2×2 inch square rejected. Free resize tool.",
  openGraph: {
    title:
      "Passport Photo Size India 2026 — 35×45mm, 630×810 Pixels & Free Resizer",
    description:
      "Indian passport photo size changed September 2025: 35×45mm portrait, 630×810 pixels, 10–250KB JPEG. Old 2×2 inch square rejected. Free resize tool.",
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
