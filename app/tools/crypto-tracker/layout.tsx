import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Crypto Price Tracker Online Free — Live Bitcoin & More",
  },
  description:
    "Track live cryptocurrency prices free online. Bitcoin, Ethereum, and top 15 cryptos with 24h change, market cap, and USD converter. No signup.",
  openGraph: buildOpenGraph({
    title: "Crypto Price Tracker Online Free — Live Bitcoin & More",
    description:
      "Live crypto prices with 24h change, market cap, volume, and USD converter.",
    url: "https://workutilities.com/tools/crypto-tracker",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/crypto-tracker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
