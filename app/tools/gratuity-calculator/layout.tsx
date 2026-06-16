import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Gratuity Calculator — Free Online India | WorkUtilities" },
  description:
    "Calculate gratuity amount on retirement or resignation free online. As per Payment of Gratuity Act formula.",
  keywords:
    "gratuity calculator online free, gratuity calculation formula india, retirement gratuity calculator",
  alternates: { canonical: "https://workutilities.com/tools/gratuity-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
