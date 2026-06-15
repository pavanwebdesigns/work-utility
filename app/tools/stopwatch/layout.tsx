import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Stopwatch Online — Free Timer with Laps | WorkUtilities",
  },
  description:
    "Free online stopwatch with lap timer. Precise timing with milliseconds. Start, stop, lap, and reset instantly.",
  keywords:
    "stopwatch online free, online timer with laps, precise stopwatch, lap timer online",
  openGraph: {
    title: "Stopwatch Online — Free Timer with Laps",
    description: "Precise stopwatch with lap timer and centisecond precision.",
    url: "https://workutilities.com/tools/stopwatch",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/stopwatch" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
