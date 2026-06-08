import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy — WorkUtilities",
  },
  description:
    "WorkUtilities privacy policy — browser-only file processing, no uploads, minimal data collection.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We do not collect personal data. No account required. No files are uploaded to our servers.",
  },
  {
    title: "File Processing",
    body: "All file processing (PDF compression, image resizing, conversions) happens entirely in your browser using JavaScript. Your files never leave your device.",
  },
  {
    title: "Analytics",
    body: "We may use privacy-friendly analytics to understand general usage patterns (page views, tool usage). No personally identifiable information is collected.",
  },
  {
    title: "Cookies",
    body: "We use minimal cookies only for site functionality. No tracking or advertising cookies.",
  },
  {
    title: "Third Party Services",
    body: "We use Google AdSense for advertising. Google may use cookies for ad personalization. You can opt out via Google's ad settings.",
  },
  {
    title: "Contact",
    body: "For privacy concerns, contact us at privacy@workutilities.com",
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-content-muted">Last updated: June 2026</p>
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
          <p className="mt-10 text-sm text-content-secondary">
            Also read our{" "}
            <Link
              href="/terms"
              className="text-brand-blue transition-colors hover:underline"
            >
              Terms & Conditions →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
