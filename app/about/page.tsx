import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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

const LINKEDIN_URL =
  "https://www.linkedin.com/in/pavan-kumar-korrapolu-40175224";

export default function AboutPage() {
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
            About WorkUtilities
          </h1>
          <div className="mt-8 space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                Who Built WorkUtilities
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                WorkUtilities is built and maintained independently by a
                UI/UX designer and frontend developer based in Hyderabad,
                India, with professional experience building software products
                and user interfaces. This platform was built to give people —
                especially Indian employees, students, and freelancers — fast,
                reliable, free tools for everyday document, image, and
                calculation tasks, without the clutter, fake &quot;download&quot;
                buttons, and aggressive ads found on many similar tool sites.
              </p>
              <p className="mt-4 leading-relaxed text-content-secondary">
                Every tool on this site runs entirely in your browser. Nothing
                you upload is sent to a server, stored, or seen by anyone —
                which also means there&apos;s nothing to leak or misuse. That
                privacy-first approach isn&apos;t a marketing line, it&apos;s a
                deliberate technical decision in how every tool here is built.
              </p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface-card px-4 py-2.5 text-sm font-medium text-content-primary transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
              >
                <LinkedInIcon className="h-4 w-4 shrink-0" />
                Connect on LinkedIn
              </a>
            </section>

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
