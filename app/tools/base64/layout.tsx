import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Base64 Encoder Decoder — Free Online | WorkUtilities",
  },
  description:
    "Encode and decode Base64 text or files free online. Fast, private, browser-only Base64 converter.",
  keywords:
    "base64 encoder decoder online free, base64 converter, encode decode base64",
  openGraph: {
    title: "Base64 Encoder Decoder — Free Online",
    description: "Encode and decode Base64 text or files instantly.",
    url: "https://workutilities.com/tools/base64",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/base64" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
