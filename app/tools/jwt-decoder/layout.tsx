import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "JWT Decoder — Free Online JSON Web Token Tool | WorkUtilities",
  },
  description:
    "Decode and inspect JWT tokens free online. View header, payload, and signature instantly. Browser-only, private.",
  keywords:
    "jwt decoder online free, json web token decoder, decode jwt token",
  openGraph: {
    title: "JWT Decoder — Free Online JSON Web Token Tool",
    description:
      "Decode and inspect JWT tokens free online. View header, payload, and signature instantly. Browser-only, private.",
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
