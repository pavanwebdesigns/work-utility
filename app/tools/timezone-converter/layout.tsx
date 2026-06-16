import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Time Zone Converter — Free Online Tool | WorkUtilities",
  },
  description:
    "Convert time between time zones free online. Compare multiple cities and find meeting times instantly.",
  keywords:
    "time zone converter online free, world clock converter, meeting time zone calculator",
  openGraph: {
    title: "Time Zone Converter — Free Online Tool",
    description:
      "Convert time between time zones free online. Compare multiple cities and find meeting times instantly.",
    url: "https://workutilities.com/tools/timezone-converter",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/timezone-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
