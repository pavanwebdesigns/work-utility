import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Favicon Generator Online Free — Create Favicon.ico & PNG",
  },
  description:
    "Generate a favicon from any image free online. Get favicon.ico plus all standard PNG sizes and ready-to-paste HTML tags. No signup needed.",
  keywords:
    "favicon generator, create favicon online free, favicon.ico generator, apple touch icon generator",
  openGraph: {
    title: "Favicon Generator Online Free — Create Favicon.ico & PNG",
    description:
      "Upload an image and download a complete favicon package with ICO, PNG sizes, and HTML link tags.",
    url: "https://workutilities.com/tools/favicon-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/favicon-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
