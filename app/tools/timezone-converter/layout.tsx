import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Time Zone Converter — Free Online Tool | WorkUtilities",
  },
  description:
    "Convert time between time zones free online. Compare multiple cities and find meeting times instantly.",
  openGraph: buildOpenGraph({
    title: "Time Zone Converter — Free Online Tool",
    description:
      "Convert time between time zones free online. Compare multiple cities and find meeting times instantly.",
    url: "https://workutilities.com/tools/timezone-converter",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/timezone-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
