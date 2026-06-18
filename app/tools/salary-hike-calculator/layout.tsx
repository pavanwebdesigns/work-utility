import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Salary Hike Calculator Free — New Pay After Appraisal",
  },
  description:
    "Calculate your new salary after an appraisal hike or find the hike percentage from your target pay. Free salary hike calculator for employees in India.",
  keywords:
    "salary hike calculator, appraisal salary calculator, new salary after hike india",
  openGraph: {
    title: "Salary Hike Calculator Free — New Pay After Appraisal",
    description:
      "Know your new salary and monthly increase after a hike instantly.",
    url: "https://workutilities.com/tools/salary-hike-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/salary-hike-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
