import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "About — WorkUtilities",
  },
  description:
    "Learn about WorkUtilities — free, private, browser-based tools for everyday work.",
};

const sections = [
  {
    title: "What we do",
    body: "Free browser-based tools for Indian workers, students, and professionals. No signup, no uploads to server.",
  },
  {
    title: "Why we built this",
    body: "Most tool sites are cluttered with ads and require account creation. We wanted something clean and fast.",
  },
  {
    title: "Privacy first",
    body: "All processing happens in your browser. We never see your files.",
  },
  {
    title: "Built with",
    body: "Next.js, Tailwind CSS, pdf-lib, browser-image-compression, jsPDF",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← Home
          </Link>
          <h1 className="mt-8 text-2xl font-bold text-content-primary sm:text-3xl">
            About WorkUtilities
          </h1>
          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-semibold text-content-primary">
                  {section.title}
                </h2>
                <p className="mt-2 leading-relaxed text-content-secondary">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
