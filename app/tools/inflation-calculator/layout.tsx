import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Inflation Calculator — Free Online Value Calculator | WorkUtilities" },
  description:
    "Calculate the value of money over time adjusted for inflation free online. See purchasing power changes instantly.",
  alternates: { canonical: "https://workutilities.com/tools/inflation-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
