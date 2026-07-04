import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://workutilities.com/visa-photo-size",
  },
};

export default function VisaPhotoSizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
