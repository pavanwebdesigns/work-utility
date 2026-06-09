import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By using WorkUtilities, you agree to these terms. If you do not agree, please do not use the site.",
  },
  {
    title: "Use of Tools",
    body: "All tools on WorkUtilities are provided free of charge for personal and professional use. You may not use our tools for any illegal or harmful purposes.",
  },
  {
    title: "File Processing & Privacy",
    body: "All file processing happens entirely in your browser. WorkUtilities does not upload, store, or access your files in any way. We have no access to the content of files you process using our tools.",
  },
  {
    title: "Intellectual Property",
    body: "The WorkUtilities name, logo, and website design are the property of WorkUtilities. You may not copy or reproduce any part of this website without permission.",
  },
  {
    title: "Disclaimer of Warranties",
    body: 'Our tools are provided "as is" without any warranty. We do not guarantee that the tools will always work perfectly or be available at all times. Use at your own risk.',
  },
  {
    title: "Limitation of Liability",
    body: "WorkUtilities shall not be held liable for any damages arising from the use or inability to use our tools, including but not limited to data loss or file corruption.",
  },
  {
    title: "Advertising",
    body: "WorkUtilities uses Google AdSense to display advertisements. These ads help keep the service free. Ad content is controlled by Google and may be personalized based on your browsing history.",
  },
  {
    title: "Changes to Terms",
    body: "We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.",
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
];

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="mt-2 text-sm text-content-muted">
            Last updated: June 2026
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
