import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Terms & Conditions — WorkUtilities",
  },
  description:
    "Terms and conditions for using WorkUtilities free online tools.",
  alternates: {
    canonical: "https://workutilities.com/terms",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
