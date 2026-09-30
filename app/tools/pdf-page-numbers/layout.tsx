import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Add Page Numbers to PDF Online Free — No Signup",
  },
  description:
    "Add page numbers to any PDF online free. Choose position, starting number, and format like 'Page 1 of 10'. No signup, nothing uploaded.",
  openGraph: buildOpenGraph({
    title: "Add Page Numbers to PDF Online Free — No Signup",
    description:
      "Add page numbers to any PDF with custom position, starting number, and format. Free and browser-only.",
    url: "https://workutilities.com/tools/pdf-page-numbers",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-page-numbers",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
