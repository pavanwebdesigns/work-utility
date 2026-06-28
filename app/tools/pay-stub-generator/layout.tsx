import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Pay Stub Generator Online Free — US Paycheck Creator",
  },
  description:
    "Generate a professional US pay stub online free. Enter earnings and deductions, preview instantly, save as PDF. Nothing uploaded to servers. No signup.",
  keywords:
    "pay stub generator free online, paycheck stub creator, US pay stub maker 2026",
  openGraph: {
    title: "Pay Stub Generator Online Free — US Paycheck Creator",
    description:
      "Create professional US pay stubs in your browser. Print or save as PDF — no data sent to servers.",
    url: "https://workutilities.com/tools/pay-stub-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pay-stub-generator",
  },
};

export default function PayStubGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
