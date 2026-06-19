import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Subnet Calculator Online Free — CIDR IP Range Tool",
  },
  description:
    "Calculate IP subnet ranges from CIDR notation. See network, broadcast, mask, usable hosts, and a quick reference table. Reverse lookup mask to CIDR.",
  keywords:
    "subnet calculator, cidr calculator, ip range calculator, subnet mask to cidr",
  openGraph: {
    title: "Subnet Calculator Online Free — CIDR IP Range Tool",
    description:
      "Free CIDR subnet calculator with network details and mask-to-CIDR reverse lookup.",
    url: "https://workutilities.com/tools/subnet-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/subnet-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
