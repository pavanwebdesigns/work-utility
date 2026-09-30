import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Days Between Dates Calculator — Free Date Difference Tool" },
  description:
    "Calculate the exact number of days between two dates free online. Count days until an event or days since a past date. No signup needed.",
  openGraph: buildOpenGraph({
    title: "Days Between Dates Calculator — Free Date Difference Tool",
    description:
      "Calculate the exact number of days between two dates free online. Count days until an event or days since a past date.",
    url: "https://workutilities.com/tools/days-between-dates",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/days-between-dates" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
