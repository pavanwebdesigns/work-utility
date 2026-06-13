import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Password Generator Online Free — Strong Random Password Generator | WorkUtilities",
  },
  description:
    "Generate strong random passwords with custom length and character options. Free password generator with strength indicator.",
  keywords:
    "password generator online free, strong random password generator, secure password maker",
  openGraph: {
    title: "Password Generator Online Free — Strong Random Password Generator",
    description:
      "Create strong random passwords instantly with customizable options.",
    url: "https://workutilities.com/tools/password-generator",
    siteName: "WorkUtilities",
    type: "website",
  },
  alternates: {
    canonical: "https://workutilities.com/tools/password-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
