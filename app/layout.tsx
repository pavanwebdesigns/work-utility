import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import PWAUpdateBanner from "@/components/PWAUpdateBanner";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WorkUtilities — Free Online Tools for Everyday Work",
    template: "%s | WorkUtilities",
  },
  description:
    "Free online PDF, image and document tools. Compress PDF, resize photos, convert files. Fast, free and private — everything runs in your browser.",
  metadataBase: new URL("https://workutilities.com"),
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "16x16" },
      { url: "/favicon-96x96.png?v=2", sizes: "96x96" },
      { url: "/favicon.svg?v=2" },
    ],
    apple: "/apple-touch-icon.png?v=2",
    shortcut: "/favicon.ico?v=2",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WorkUtilities",
  },
  openGraph: {
    siteName: "WorkUtilities",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "WorkUtilities — Free tools for Indian students, jobs & documents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.className} overflow-x-hidden max-w-full`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="WorkUtilities" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="overflow-x-hidden max-w-full">
        <Providers>
          <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to main content
            </a>
            {children}
          </div>
          <PWAInstallBanner />
          <PWAUpdateBanner />
        </Providers>
        <Analytics />
        <GoogleAnalytics gaId="G-N85BQ3XV27" />
      </body>
    </html>
  );
}
