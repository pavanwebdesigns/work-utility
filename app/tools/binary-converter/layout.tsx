import type { Metadata } from "next";
import { buildOpenGraph, withRobots } from "@/lib/seo";

export const metadata: Metadata = withRobots("https://workutilities.com/tools/binary-converter", {
  title: {
    absolute: "Binary Converter — Decimal Hex Octal Free | WorkUtilities",
  },
  description:
    "Convert between binary, decimal, hexadecimal and octal number systems free online. Instant conversion.",
  openGraph: buildOpenGraph({
    title: "Binary Converter — Decimal Hex Octal Free",
    description:
      "Convert between binary, decimal, hexadecimal and octal number systems.",
    url: "https://workutilities.com/tools/binary-converter",
    type: "website",
  }),
  alternates: { canonical: "https://workutilities.com/tools/binary-converter" },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
