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

const GOOGLE_ADS_SETTINGS_URL = "https://adssettings.google.com";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-content-muted">Last updated: June 2026</p>

          <p className="mt-8 leading-relaxed text-content-secondary">
            At WorkUtilities (accessible from{" "}
            <a
              href="https://workutilities.com"
              className="text-brand-blue transition-colors hover:underline"
            >
              https://workutilities.com
            </a>
            ), the privacy of our visitors is one of our core priorities. This
            Privacy Policy document outlines the types of information we process
            and how we ensure maximum data protection.
          </p>

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                1. Information We Collect &amp; Privacy-First Architecture
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                WorkUtilities operates on a strict no-data-collection policy.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-content-secondary">
                <li>We do not collect, store, or share any personal data.</li>
                <li>
                  No user registration, signup, or account creation is required
                  to use our services.
                </li>
                <li>
                  <strong className="text-content-primary">
                    Zero Server Uploads:
                  </strong>{" "}
                  All file processing (including PDF compression, image
                  resizing, merging, and format conversions) happens entirely
                  client-side within your web browser using local JavaScript.
                  Your files never leave your device and are never transmitted
                  to our servers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                2. Cookies and Web Beacons
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Like any other website, WorkUtilities uses &quot;cookies&quot;.
                These cookies are used to store minimal configuration data and
                optimize the user experience by customizing our web page content
                based on visitors&apos; browser type and/or other information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                3. Google AdSense and Third-Party Advertising
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                We use Google AdSense as our primary third-party advertising
                vendor to serve advertisements on our site. To comply with
                Google&apos;s publisher policies, you must be aware of the
                following tracking mechanisms:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-content-secondary">
                <li>
                  <strong className="text-content-primary">
                    Third-Party Cookies:
                  </strong>{" "}
                  Google, as a third-party vendor, uses cookies to serve ads on
                  WorkUtilities based on your visit to this site and other sites
                  on the Internet.
                </li>
                <li>
                  <strong className="text-content-primary">
                    Google&apos;s DART Cookie:
                  </strong>{" "}
                  Google&apos;s use of advertising cookies enables it and its
                  partners to serve ads to our users based on their visit to our
                  site and/or other sites on the Internet.
                </li>
                <li>
                  <strong className="text-content-primary">Opting Out:</strong>{" "}
                  Users may choose to opt-out of personalized advertising and
                  the use of the DART cookie by visiting the official Google
                  Ads and Content Network Privacy Policy at the following URL:{" "}
                  <a
                    href={GOOGLE_ADS_SETTINGS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue transition-colors hover:underline"
                  >
                    Google Ads Settings
                  </a>
                  .
                </li>
              </ul>
              <p className="mt-4 leading-relaxed text-content-secondary">
                We have no access to or control over these cookies that are used
                by third-party advertisers. You can choose to disable cookies
                through your individual browser options.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                4. Analytics and Traffic Monitoring
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                We use minimal, privacy-friendly analytics utilities to monitor
                general web traffic and usage patterns (such as page views and
                tool execution frequency). This data is completely aggregated
                and anonymized. No Personally Identifiable Information (PII) or
                IP addresses are linked to these analytics tracking events.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                5. Third-Party Links
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Our website may contain links to other websites (such as
                external resources or our tools documentation). If you click on
                a third-party link, you will be directed to that site. Note that
                these external sites are not operated by us; therefore, we
                strongly advise you to review the Privacy Policy of these
                websites.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                6. Contact Us
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                If you have additional questions or require more information
                about our Privacy Policy, do not hesitate to contact us.
              </p>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Email:{" "}
                <a
                  href="mailto:workutilities.tools@outlook.com"
                  className="text-brand-blue transition-colors hover:underline"
                >
                  workutilities.tools@outlook.com
                </a>
              </p>
            </section>
          </div>

          <p className="mt-10 text-sm text-content-secondary">
            Also read our{" "}
            <Link
              href="/terms"
              className="text-brand-blue transition-colors hover:underline"
            >
              Terms &amp; Conditions →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
