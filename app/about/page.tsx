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

const LINKEDIN_URL =
  "https://www.linkedin.com/in/pavan-kumar-korrapolu-40175224";
const PORTFOLIO_URL = "https://iampavan.com";

const externalLinkClass =
  "font-medium text-brand-blue transition-colors hover:underline";

export const metadata: Metadata = {
  title: {
    absolute: "About — WorkUtilities",
  },
  description:
    "Learn about WorkUtilities — free, private, browser-based tools for everyday work.",
};

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
                WorkUtilities is built, engineered, and maintained independently
                by Pavan Kumar, a professional UI/UX Lead and Frontend
                Developer based in Hyderabad, India. With years of industry
                experience designing high-density enterprise suites, advanced
                dashboard architectures, and modern digital products, I created
                this platform to bridge a critical gap in daily digital
                workflows.
              </p>
              <p className="mt-4 leading-relaxed text-content-secondary">
                This platform was built to give people — especially Indian
                employees, software engineers, students, and freelancers — fast,
                reliable, free tools for everyday document, image, and
                calculation tasks, without the clutter, fake &quot;download&quot;
                buttons, and aggressive ads found on many similar tool sites.
              </p>
              <p className="mt-4 leading-relaxed text-content-secondary">
                <span className="font-semibold text-content-primary">
                  Connect with the Founder:
                </span>{" "}
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 ${externalLinkClass}`}
                  >
                    <LinkedInIcon className="h-4 w-4 shrink-0" />
                    Connect on LinkedIn
                  </a>
                  <span className="text-content-secondary" aria-hidden>
                    |
                  </span>
                  <a
                    href={PORTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={externalLinkClass}
                  >
                    Portfolio &amp; Insights
                  </a>
                </span>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                Our Technical Philosophy: Privacy-First Architecture
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Most tools run entirely in your browser using client-side
                JavaScript. A small number of PDF tools use secure server-side
                processing — this is clearly noted on each tool page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                What We Do
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Free, enterprise-grade, browser-based tools optimized for Indian
                workers, tech professionals, students, and global users. No
                signup and no corporate paywalls.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                Why We Built This
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Most utility sites are cluttered with misleading ads, tracking
                scripts, and require forced account creation. We wanted
                something blazing fast, clean, and minimal that respects user
                time and data privacy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                Built With (Our Tech Stack)
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                To ensure maximum speed, accessibility, and lightweight
                rendering, the platform is crafted using:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-content-secondary">
                <li>
                  <strong className="text-content-primary">
                    Framework &amp; Styling:
                  </strong>{" "}
                  Next.js, Tailwind CSS
                </li>
                <li>
                  <strong className="text-content-primary">
                    Core Libraries:
                  </strong>{" "}
                  pdf-lib, browser-image-compression, jsPDF, and native Web APIs
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
