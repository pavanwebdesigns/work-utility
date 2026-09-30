import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";
import { PhotoSizeGuidePage } from "@/components/PhotoSizeGuidePage";
import { getPhotoSizeGuide } from "@/lib/photo-size-guides";

const guide = getPhotoSizeGuide("visa")!;

export const metadata: Metadata = {
  title: {
    absolute: "Visa Photo Size Requirements India — US, UK, Schengen 2025",
  },
  description:
    "Visa photo size requirements for US, UK, Schengen and other countries. 50x50mm standard. Resize free online.",
  openGraph: buildOpenGraph({
    title: "Visa Photo Size Requirements India — US, UK, Schengen 2025",
    description:
      "Visa photo size requirements for US, UK, Schengen and other countries. 50x50mm standard. Resize free online.",
    url: "https://workutilities.com/visa-photo-size",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/visa-photo-size",
  },
};

export default function VisaPhotoSizePage() {
  return <PhotoSizeGuidePage guide={guide} />;
}
