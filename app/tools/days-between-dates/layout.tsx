import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Days Between Dates Calculator — Free Date Difference Tool" },
  description:
    "Calculate the exact number of days between two dates free online. Count days until an event or days since a past date. No signup needed.",
  keywords:
    "days between dates calculator, date difference calculator, count days between dates, days until event",
  openGraph: {
    title: "Days Between Dates Calculator — Free Date Difference Tool",
    description:
      "Calculate the exact number of days between two dates free online. Count days until an event or days since a past date.",
    url: "https://workutilities.com/tools/days-between-dates",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/days-between-dates" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
