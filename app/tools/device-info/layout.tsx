import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Device & Browser Info Checker Online Free — No Signup" },
  description:
    "Check your browser, OS, screen resolution, and device details online free. Useful for bug reports and troubleshooting. No signup needed.",
  keywords: "check browser and device info online, browser info checker, screen resolution checker",
  openGraph: {
    title: "Device & Browser Info Checker Online Free — No Signup",
    description: "View browser, OS, screen, and viewport details for bug reports. Free, instant.",
    url: "https://workutilities.com/tools/device-info",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/device-info" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
