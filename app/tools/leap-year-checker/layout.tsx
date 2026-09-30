import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Leap Year Checker — Is This Year a Leap Year?" },
  description:
    "Check if any year is a leap year free online. See the exact rule explained, plus the next and previous leap years. No signup needed.",
  openGraph: buildOpenGraph({
    title: "Leap Year Checker — Is This Year a Leap Year?",
    description:
      "Check if any year is a leap year free online. See the exact rule explained, plus the next and previous leap years.",
    url: "https://workutilities.com/tools/leap-year-checker",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/leap-year-checker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
