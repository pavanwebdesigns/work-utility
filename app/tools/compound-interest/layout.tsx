import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Compound Interest Calculator — Free Online | WorkUtilities",
  },
  description:
    "Calculate compound interest growth free online. See how your investment grows with monthly or yearly compounding.",
  keywords:
    "compound interest calculator free, compound interest formula calculator, investment growth calculator",
  openGraph: {
    title: "Compound Interest Calculator — Free Online",
    description:
      "Calculate compound interest growth free online. See how your investment grows with monthly or yearly compounding.",
    url: "https://workutilities.com/tools/compound-interest",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/compound-interest",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
