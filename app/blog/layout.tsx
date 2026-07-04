import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Blog — WorkUtilities | Guides & Tips",
  },
  description:
    "Free guides on PDF compression, image resizing, photo size requirements for Indian documents, and more.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
