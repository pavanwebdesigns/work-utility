import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Calorie Deficit Calculator Free — Find Your Daily Target",
  },
  description:
    "Free calorie deficit calculator using the Mifflin-St Jeor formula. Calculate your BMR, maintenance calories, and a sustainable daily target.",
  openGraph: buildOpenGraph({
    title: "Calorie Deficit Calculator Free — Find Your Daily Target",
    description:
      "Calculate BMR, TDEE, and daily calorie targets using the Mifflin-St Jeor formula. Informational estimates only.",
    url: "https://workutilities.com/tools/calorie-deficit-calculator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/calorie-deficit-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
