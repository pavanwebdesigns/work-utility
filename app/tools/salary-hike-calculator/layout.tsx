import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Salary Hike Calculator — Calculate Your New Salary After Appraisal | WorkUtilities",
  },
  description:
    "Calculate new salary after hike percentage or find hike % from desired salary. Free salary hike calculator for appraisals.",
  keywords:
    "salary hike calculator, appraisal salary calculator, new salary after hike india",
  openGraph: {
    title: "Salary Hike Calculator — Calculate Your New Salary After Appraisal",
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
