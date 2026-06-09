import type { Metadata } from "next";
import { PhotoSizeGuidePage } from "@/components/PhotoSizeGuidePage";
import { getPhotoSizeGuide } from "@/lib/photo-size-guides";

const guide = getPhotoSizeGuide("driving-licence")!;

export const metadata: Metadata = {
  title: {
    absolute:
      "Driving Licence Photo Size — RTO Sarathi Upload Requirements India",
  },
  description:
    "Driving licence photo size for Sarathi portal upload. 35x45mm, max 200KB. Resize free online.",
  openGraph: {
    title: "Driving Licence Photo Size — RTO Sarathi Upload Requirements India",
    description:
      "Driving licence photo size for Sarathi portal upload. 35x45mm, max 200KB. Resize free online.",
    url: "https://workutilities.com/driving-licence-photo-size",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/driving-licence-photo-size",
  },
};

export default function DrivingLicencePhotoSizePage() {
  return <PhotoSizeGuidePage guide={guide} />;
}
