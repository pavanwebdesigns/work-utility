import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "IP Address Lookup — Find Location & ISP Online Free",
  },
  description:
    "Look up any IP address location, ISP, and timezone online free. See your own IP or check any IP address instantly. No signup needed.",
  keywords:
    "IP address lookup, IP geolocation, find my IP, IP location checker",
  openGraph: {
    title: "IP Address Lookup — Find Location & ISP Online Free",
    description:
      "See your public IP or look up any IPv4 address — country, city, ISP, timezone.",
    url: "https://workutilities.com/tools/ip-lookup",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/ip-lookup" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
