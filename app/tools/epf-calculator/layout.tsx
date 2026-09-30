import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "EPF Calculator — Provident Fund Maturity Free | WorkUtilities" },
  description:
    "Calculate EPF maturity amount free online. Estimate your Employee Provident Fund growth with employer and employee contributions.",
  alternates: { canonical: "https://workutilities.com/tools/epf-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
