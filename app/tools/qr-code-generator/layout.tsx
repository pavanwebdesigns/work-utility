import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "QR Code Generator Free Online — Create QR Code for URL, WhatsApp, WiFi & More | WorkUtilities",
  },
  description:
    "Generate QR codes instantly for free. URL, WhatsApp, WiFi, VCard, SMS and more. Download as PNG or SVG. No signup, no watermark.",
  keywords:
    "qr code generator free online, wifi qr code, whatsapp qr code, vcard qr generator india",
  openGraph: {
    title:
      "QR Code Generator Free Online — Create QR Code for URL, WhatsApp, WiFi & More",
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
