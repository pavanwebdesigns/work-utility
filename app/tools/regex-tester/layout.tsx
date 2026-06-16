import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Regex Tester — Free Online Regular Expression Tool | WorkUtilities",
  },
  description:
    "Test and debug regular expressions free online. Real-time match highlighting with explanation.",
  keywords:
    "regex tester online free, regular expression tester, regex debugger online",
  openGraph: {
    title: "Regex Tester — Free Online Regular Expression Tool",
    description:
      "Test and debug regular expressions free online. Real-time match highlighting with explanation.",
    url: "https://workutilities.com/tools/regex-tester",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/regex-tester",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
