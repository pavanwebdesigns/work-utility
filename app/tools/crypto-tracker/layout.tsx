import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Crypto Price Tracker Online Free — Live Bitcoin & More",
  },
  description:
    "Track live cryptocurrency prices free online. Bitcoin, Ethereum, and top 15 cryptos with 24h change, market cap, and USD converter. No signup.",
  keywords:
    "crypto price tracker, bitcoin price live, cryptocurrency prices, crypto market cap",
  openGraph: {
    title: "Crypto Price Tracker Online Free — Live Bitcoin & More",
    description:
      "Live crypto prices with 24h change, market cap, volume, and USD converter.",
    url: "https://workutilities.com/tools/crypto-tracker",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/crypto-tracker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
