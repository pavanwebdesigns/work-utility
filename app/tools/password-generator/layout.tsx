import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Password Generator Free — Strong Random Passwords",
  },
  description:
    "Generate strong random passwords with custom length, symbols, and numbers. Built-in strength indicator and one-click copy. Free secure password generator.",
  openGraph: buildOpenGraph({
    title: "Password Generator Free — Strong Random Passwords",
    description:
      "Create strong random passwords instantly with customizable options.",
    url: "https://workutilities.com/tools/password-generator",
    type: "website",
  }),
  alternates: {
    canonical: "https://workutilities.com/tools/password-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
