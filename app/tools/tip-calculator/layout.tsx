import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Tip Calculator — Split Bills Free Online | WorkUtilities",
  },
  description:
    "Calculate tip amount and split bills between friends free online. Works with USD and INR.",
  keywords:
    "tip calculator free, bill split calculator, tip calculator online, restaurant tip calculator",
  openGraph: {
    title: "Tip Calculator — Split Bills Free Online",
    description:
      "Calculate tip amount and split bills between friends free online.",
    url: "https://workutilities.com/tools/tip-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/tip-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
