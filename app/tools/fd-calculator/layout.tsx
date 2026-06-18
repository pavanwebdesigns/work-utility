import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "FD Calculator India Free — Fixed Deposit Returns",
  },
  description:
    "Calculate fixed deposit maturity amount, interest earned, and effective annual rate with quarterly or yearly compounding. Free FD calculator for India.",
  keywords:
    "fd calculator online, fixed deposit calculator india, fd maturity calculator, fd interest calculator",
  openGraph: {
    title: "FD Calculator India Free — Fixed Deposit Returns",
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
