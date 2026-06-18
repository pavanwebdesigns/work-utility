import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Add Watermark to PDF Online Free — Text or Logo",
  },
  description:
    "Add a text or image watermark to any PDF online free. Mark documents as Draft, Confidential, or add your logo. Adjustable opacity. No signup.",
  keywords:
    "add watermark to pdf, pdf watermark online free, draft confidential watermark pdf",
  openGraph: {
    title: "Add Watermark to PDF Online Free — Text or Logo",
    description:
      "Add text or image watermarks to PDFs with adjustable opacity and placement. Free, private, browser-only.",
    url: "https://workutilities.com/tools/pdf-watermark",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/pdf-watermark",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
