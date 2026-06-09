import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Remove PDF Password Free Online | WorkUtilities",
  },
  description:
    "Remove password from protected PDF files free online. Unlock PDF instantly in your browser. No signup required.",
  keywords:
    "remove pdf password online free, unlock pdf, pdf password remover india",
  openGraph: {
    title: "Remove PDF Password Free Online",
    description:
      "Unlock password-protected PDFs in your browser. Free and private.",
    url: "https://workutilities.com/tools/pdf-unlock",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-unlock",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
