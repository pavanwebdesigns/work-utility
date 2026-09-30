import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Remove PDF Password Free Online | WorkUtilities",
  },
  description:
    "Remove password from protected PDF files free online. Unlock a PDF when you know the password. Processed on our secure server over HTTPS and deleted immediately. No signup.",
  openGraph: buildOpenGraph({
    title: "Remove PDF Password Free Online",
    description:
      "Unlock password-protected PDFs. Processed securely and deleted after conversion.",
    url: "https://workutilities.com/tools/pdf-unlock",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-unlock",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
