import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "QR Code Generator Free — URL, WiFi, WhatsApp",
  },
  description:
    "Generate QR codes for URLs, WhatsApp, WiFi, vCards, and SMS. Download as PNG or SVG with no watermark. Free online QR code generator — no signup needed.",
  keywords:
    "qr code generator free online, wifi qr code, whatsapp qr code, vcard qr generator india",
  openGraph: {
    title: "QR Code Generator Free — URL, WiFi, WhatsApp",
    description:
      "Generate QR codes instantly for free. Download as PNG or SVG. No signup, no watermark.",
    url: "https://workutilities.com/tools/qr-code-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/qr-code-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
