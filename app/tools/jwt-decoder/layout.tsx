import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "JWT Decoder — Decode & Verify Signatures Online Free",
  },
  description:
    "Decode and verify JWT signatures free online. Color-coded header, payload, and signature panels with claims explainer. Browser-only, your secret never leaves this page.",
  keywords:
    "jwt decoder online free, verify jwt signature, json web token decoder, decode jwt token",
  openGraph: {
    title: "JWT Decoder — Decode & Verify Signatures Online Free",
    description:
      "Decode and verify JWT signatures with color-coded panels, claims explainer, and client-side verification.",
    url: "https://workutilities.com/tools/jwt-decoder",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/jwt-decoder",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
