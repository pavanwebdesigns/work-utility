import type { Metadata } from "next";
import { buildOpenGraph, withRobots } from "@/lib/seo";

export const metadata: Metadata = withRobots("https://workutilities.com/tools/pdf-unlock", {
  title: {
    absolute: "Remove PDF Password Free Online | WorkUtilities",
  },
  description:
    "Remove password from protected PDF files free online. Unlock a PDF when you know the password. Processed securely over HTTPS and deleted after. No signup.",
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
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
