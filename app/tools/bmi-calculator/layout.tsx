import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "BMI Calculator — Free Body Mass Index Calculator | WorkUtilities",
  },
  description:
    "Calculate your BMI free online. Supports metric and imperial units. Get instant BMI category results.",
  keywords:
    "bmi calculator free, body mass index calculator, calculate bmi online",
  openGraph: {
    title: "BMI Calculator — Free Body Mass Index Calculator",
    description:
      "Calculate your BMI free online. Supports metric and imperial units. Get instant BMI category results.",
    url: "https://workutilities.com/tools/bmi-calculator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/bmi-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
