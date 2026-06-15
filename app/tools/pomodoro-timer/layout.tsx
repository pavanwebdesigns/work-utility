import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Pomodoro Timer — Free Focus Timer Online | WorkUtilities",
  },
  description:
    "Free Pomodoro timer online. 25-minute focus sessions with short and long breaks. Boost productivity instantly.",
  keywords:
    "pomodoro timer online free, focus timer, pomodoro technique, work break timer",
  openGraph: {
    title: "Pomodoro Timer — Free Focus Timer Online",
    description:
      "25-minute focus sessions with short and long breaks.",
    url: "https://workutilities.com/tools/pomodoro-timer",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/pomodoro-timer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
