import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Free Online Signature Maker — Create Digital Signature | WorkUtilities",
  },
  description:
    "Create digital signatures by drawing, typing, or uploading. Download PNG or JPG and copy to clipboard instantly.",
  keywords:
    "signature maker online free, digital signature creator, online signature generator india",
  openGraph: {
    title: "Free Online Signature Maker — Create Digital Signature",
    description:
      "Draw, type, or upload your signature and download it instantly.",
    url: "https://workutilities.com/tools/signature-maker",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/signature-maker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
