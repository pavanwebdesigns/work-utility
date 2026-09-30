import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Gratuity Calculator — Free Online India | WorkUtilities" },
  description:
    "Calculate gratuity amount on retirement or resignation free online. As per Payment of Gratuity Act formula.",
  alternates: { canonical: "https://workutilities.com/tools/gratuity-calculator" },
  openGraph: buildOpenGraph({
    title: "Gratuity Calculator — Free Online India | WorkUtilities",
    description:
      "Calculate gratuity amount on retirement or resignation free online. As per Payment of Gratuity Act formula.",
    url: "https://workutilities.com/tools/gratuity-calculator",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
