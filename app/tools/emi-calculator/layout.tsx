import type { Metadata } from "next";
import { buildOpenGraph, withRobots } from "@/lib/seo";

export const metadata: Metadata = withRobots("https://workutilities.com/tools/emi-calculator", {
  title: {
    absolute: "EMI Calculator — Home, Car & Personal Loan India",
  },
  description:
    "Free EMI calculator for home, car, and personal loans in India. Enter amount, rate, and tenure — get EMI, total interest, and payment schedule.",
  openGraph: buildOpenGraph({
    title: "EMI Calculator — Home, Car & Personal Loan India",
    description:
      "Free EMI calculator for home, car, and personal loans in India. Enter amount, rate, and tenure — get EMI, total interest, and payment schedule.",
    url: "https://workutilities.com/tools/emi-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/emi-calculator",
  },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
