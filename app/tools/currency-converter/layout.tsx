import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Currency Converter Online Free — Live Exchange Rates",
  },
  description:
    "Convert currencies with live exchange rates from the European Central Bank. Free online currency converter — USD, EUR, GBP, INR and more. No signup.",
  openGraph: buildOpenGraph({
    title: "Currency Converter Online Free — Live Exchange Rates",
    description:
      "Convert USD, EUR, GBP, INR and more with ECB reference exchange rates.",
    url: "https://workutilities.com/tools/currency-converter",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/currency-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
