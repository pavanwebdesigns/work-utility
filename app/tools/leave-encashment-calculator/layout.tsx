import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Leave Encashment Calculator India — Tax Exemption 2026",
  },
  description:
    "Calculate leave encashment amount and tax exemption. Budget 2023 raised exemption to ₹25 lakhs. Calculate during service vs retirement. Free, no signup.",
  openGraph: buildOpenGraph({
    title: "Leave Encashment Calculator India — Tax Exemption 2026",
    description:
      "Calculate leave encashment and tax exemption at retirement with ₹25 lakh Budget 2023 limit.",
    url: "https://workutilities.com/tools/leave-encashment-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/leave-encashment-calculator",
  },
};

export default function LeaveEncashmentCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
