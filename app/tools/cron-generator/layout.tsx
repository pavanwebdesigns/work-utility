import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Cron Expression Generator Online Free — Visual Builder",
  },
  description:
    "Build cron expressions visually with five fields, presets, human-readable descriptions, and the next five scheduled run times. Paste expressions to parse.",
  keywords:
    "cron expression generator, cron builder online, cron schedule maker, visual cron editor",
  openGraph: {
    title: "Cron Expression Generator Online Free — Visual Builder",
    description:
      "Visual cron builder with presets, human descriptions, and next run times.",
    url: "https://workutilities.com/tools/cron-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/cron-generator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
