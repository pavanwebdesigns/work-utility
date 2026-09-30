import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "DNS Lookup Tool Online Free — Check Any DNS Record",
  },
  description:
    "Look up DNS records for any domain free online. Check A, AAAA, CNAME, MX, TXT, NS records instantly. Powered by Cloudflare DNS. No signup.",
  openGraph: buildOpenGraph({
    title: "DNS Lookup Tool Online Free — Check Any DNS Record",
    description:
      "Query A, AAAA, CNAME, MX, TXT, NS, and SOA records via Cloudflare DNS.",
    url: "https://workutilities.com/tools/dns-lookup",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/dns-lookup" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
