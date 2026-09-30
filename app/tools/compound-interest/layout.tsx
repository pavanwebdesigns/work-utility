import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Compound Interest Calculator — Free Online | WorkUtilities",
  },
  description:
    "Calculate compound interest growth free online. See how your investment grows with monthly or yearly compounding.",
  openGraph: buildOpenGraph({
    title: "Compound Interest Calculator — Free Online",
    description:
      "Calculate compound interest growth free online. See how your investment grows with monthly or yearly compounding.",
    url: "https://workutilities.com/tools/compound-interest",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/compound-interest",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
