import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "SIP Calculator Online Free — Mutual Fund SIP Returns Calculator India | WorkUtilities",
  },
  description:
    "Calculate mutual fund SIP returns instantly. Free SIP calculator with maturity value, estimated returns, and year-by-year growth chart.",
  keywords:
    "sip calculator online free, mutual fund sip calculator india, sip returns calculator, monthly sip calculator",
  openGraph: {
    title: "SIP Calculator Online Free — Mutual Fund SIP Returns Calculator India",
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
