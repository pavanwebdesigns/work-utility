import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const LAST_UPDATED = "July 2026";

export const metadata: Metadata = {
  title: {
    absolute: "Terms & Conditions — WorkUtilities",
  },
  description:
    "Terms and conditions for using WorkUtilities free online tools, including data handling, analytics, and future advertising.",
  alternates: {
    canonical: "https://workutilities.com/terms",
  },
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By using WorkUtilities, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the site.",
  },
  {
    title: "Use of Tools",
    body: "All tools on WorkUtilities are provided free of charge for personal and professional use. You may not use our tools for any illegal or harmful purposes.",
  },
  {
    title: "File Processing & Privacy",
    body: "Most WorkUtilities tools process files and inputs locally in your browser. A small number of PDF tools (PDF Compress, PDF to Word, PDF to JPG, PDF Unlock) use secure server-side processing — this is clearly noted on each tool page. Some network-based tools send queries to external APIs. WorkUtilities does not require an account.",
    privacyLink: true,
  },
  {
    title: "Analytics & Cookies",
    body: "WorkUtilities uses Google Analytics (G-N85BQ3XV27) and Vercel Analytics for anonymous usage statistics. These services may process IP addresses and device information per their respective privacy policies. The site also uses first-party cookies and browser storage for preferences such as currency selection.",
    privacyLink: true,
  },
  {
    title: "Advertising",
    body: "WorkUtilities may introduce Google AdSense or similar advertising services in the future. Our Terms and Privacy Policy will be updated before ads are enabled.",
    privacyLink: true,
  },
  {
    title: "Intellectual Property",
    body: "The WorkUtilities name, logo, and website design are the property of WorkUtilities. You may not copy or reproduce any part of this website without permission.",
  },
  {
    title: "Disclaimer of Warranties",
    body: 'Our tools are provided "as is" without any warranty. We do not guarantee that the tools will always work perfectly or be available at all times. Calculators and converters provide estimates for informational purposes only — not professional, legal, tax, or financial advice. Use at your own risk.',
  },
  {
    title: "Limitation of Liability",
    body: "WorkUtilities shall not be held liable for any damages arising from the use or inability to use our tools, including but not limited to data loss or file corruption.",
  },
  {
    title: "Changes to Terms",
    body: `We reserve the right to update these terms at any time. The "Last updated" date on this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the new terms.`,
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India. Any disputes shall be resolved under Indian jurisdiction.",
  },
  {
    title: "Contact",
    body: "For questions about these terms, contact us at:",
    email: "workutilities.tools@outlook.com",
  },
] as const;

export default function TermsPage() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
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
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm text-content-muted">
            Last updated: {LAST_UPDATED}
          </p>
          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-semibold text-content-primary">
                  {section.title}
                </h2>
                <p className="mt-2 leading-relaxed text-content-secondary">
                  {section.body}
                  {"email" in section && section.email && (
                    <>
                      {" "}
                      <a
                        href={`mailto:${section.email}`}
                        className="text-brand-blue transition-colors hover:underline"
                      >
                        {section.email}
                      </a>
                    </>
                  )}
                  {"privacyLink" in section && section.privacyLink && (
                    <>
                      {" "}
                      See our{" "}
                      <Link
                        href="/privacy"
                        className="text-brand-blue transition-colors hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </>
                  )}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm text-content-secondary">
            Also read our{" "}
            <Link
              href="/privacy"
              className="text-brand-blue transition-colors hover:underline"
            >
              Privacy Policy →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
