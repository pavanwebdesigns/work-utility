import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "SIP Calculator India Free — Mutual Fund Returns",
  },
  description:
    "Calculate mutual fund SIP returns with maturity value, total invested, and estimated gains. Free SIP calculator with year-by-year growth projection for India.",
  keywords:
    "sip calculator online free, mutual fund sip calculator india, sip returns calculator, monthly sip calculator",
  openGraph: {
    title: "SIP Calculator India Free — Mutual Fund Returns",
    description:
      "Calculate SIP maturity value, total invested, and estimated returns instantly.",
    url: "https://workutilities.com/tools/sip-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/sip-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
