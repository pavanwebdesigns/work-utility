import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Binary Converter — Decimal Hex Octal Free | WorkUtilities",
  },
  description:
    "Convert between binary, decimal, hexadecimal and octal number systems free online. Instant conversion.",
  keywords:
    "binary converter online free, decimal to binary, hex to binary, octal converter",
  openGraph: {
    title: "Binary Converter — Decimal Hex Octal Free",
    description:
      "Convert between binary, decimal, hexadecimal and octal number systems.",
    url: "https://workutilities.com/tools/binary-converter",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: { canonical: "https://workutilities.com/tools/binary-converter" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
