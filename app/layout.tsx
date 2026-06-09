import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WorkUtilities — Free Online Tools for Everyday Work",
    template: "%s | WorkUtilities",
  },
  description:
    "Free online PDF, image and document tools. Compress PDF, resize photos, convert files. Fast, free and private — everything runs in your browser.",
  keywords:
    "free online tools, pdf tools, image tools, document converter, compress pdf, photo resizer india",
  metadataBase: new URL("https://workutilities.com"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WorkUtilities",
  },
  openGraph: {
    siteName: "WorkUtilities",
    type: "website",
    url: "https://workutilities.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0F1E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="apple-touch-icon" href="/logo-light.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
