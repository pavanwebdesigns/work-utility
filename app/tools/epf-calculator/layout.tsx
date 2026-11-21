import type { Metadata } from "next";
import { buildOpenGraph, withRobots } from "@/lib/seo";

export const metadata: Metadata = withRobots("https://workutilities.com/tools/epf-calculator", {
  title: { absolute: "EPF Calculator — Provident Fund Maturity | WorkUtilities" },
  description:
    "Calculate EPF maturity amount free online. Estimate your Employee Provident Fund growth with employer and employee contributions.",
  alternates: { canonical: "https://workutilities.com/tools/epf-calculator" },
  openGraph: buildOpenGraph({
    title: "EPF Calculator — Provident Fund Maturity | WorkUtilities",
    description:
      "Calculate EPF maturity amount free online. Estimate your Employee Provident Fund growth with employer and employee contributions.",
    url: "https://workutilities.com/tools/epf-calculator",
  }),
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
