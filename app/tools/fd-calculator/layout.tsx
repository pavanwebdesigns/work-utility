import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "FD Calculator Online — Fixed Deposit Returns Calculator India | WorkUtilities",
  },
  description:
    "Calculate fixed deposit maturity amount, interest earned, and effective annual rate. Free FD calculator with growth chart.",
  keywords:
    "fd calculator online, fixed deposit calculator india, fd maturity calculator, fd interest calculator",
  openGraph: {
    title: "FD Calculator Online — Fixed Deposit Returns Calculator India",
    description:
      "Calculate FD maturity amount and interest with compounding frequency options.",
    url: "https://workutilities.com/tools/fd-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/fd-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
