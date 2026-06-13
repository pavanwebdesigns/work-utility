import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Notice Period Calculator — Find Your Last Working Day | WorkUtilities",
  },
  description:
    "Calculate your last working day from resignation date and notice period. Includes buyout amount estimate and calendar view.",
  keywords:
    "notice period calculator, last working day calculator, notice buyout calculator india",
  openGraph: {
    title: "Notice Period Calculator — Find Your Last Working Day",
    description:
      "Find your last working day, days remaining, and notice buyout amount.",
    url: "https://workutilities.com/tools/notice-period-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/notice-period-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
