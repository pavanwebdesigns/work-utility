import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const LAST_UPDATED = "July 2026";

const GOOGLE_ANALYTICS_OPT_OUT_URL = "https://tools.google.com/dlpage/gaoptout";
const GOOGLE_PRIVACY_URL = "https://policies.google.com/privacy";
const GOOGLE_ADS_SETTINGS_URL = "https://adssettings.google.com";
const VERCEL_PRIVACY_URL = "https://vercel.com/legal/privacy-policy";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy — WorkUtilities",
  },
  description:
    "How WorkUtilities handles your data — browser-based tools, analytics, cookies, local storage, and future advertising disclosures.",
  alternates: {
    canonical: "https://workutilities.com/privacy",
  },
};

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
          <p className="mt-2 text-sm text-content-muted">
            Last updated: {LAST_UPDATED}
          </p>

          <p className="mt-8 leading-relaxed text-content-secondary">
            At WorkUtilities (accessible from{" "}
            <a
              href="https://workutilities.com"
              className="text-brand-blue transition-colors hover:underline"
            >
              https://workutilities.com
            </a>
            ), we aim to be transparent about what data our website and tools
            process. This Privacy Policy describes our practices as of the date
            above.
          </p>

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                1. Account-Free Tools &amp; What We Collect Directly
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                WorkUtilities does not require registration or account creation.
                We do not operate a user account system and we do not ask you to
                submit a profile, email address, or payment details to use our
                free tools.
              </p>
              <p className="mt-2 leading-relaxed text-content-secondary">
                We do not intentionally collect the content of files you process
                through our own application code, except where a specific tool
                sends data to a server as described in Section 2.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                2. How Our Tools Process Data
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Most WorkUtilities tools run entirely in your web browser using
                client-side JavaScript. For those tools, files and inputs you
                provide are processed locally on your device and are not
                uploaded to WorkUtilities servers through our tool code.
              </p>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Some tools are exceptions and may transmit data over the
                internet:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-content-secondary">
                <li>
                  <strong className="text-content-primary">
                    Server-assisted PDF tools:
                  </strong>{" "}
                  Certain PDF features (such as PDF compression, PDF to Word, PDF
                  to JPG, and PDF unlock) send the file you select to a
                  configured processing service so the conversion can be
                  completed. Only use these tools if you are comfortable
                  sending that file for processing.
                </li>
                <li>
                  <strong className="text-content-primary">
                    Network lookup and rate tools:
                  </strong>{" "}
                  Tools such as DNS lookup, IP lookup, currency converter, and
                  crypto price tracker send the query you enter (for example, a
                  domain name, IP address, or currency pair) to third-party or
                  WorkUtilities-operated APIs to return results.
                </li>
              </ul>
              <p className="mt-3 leading-relaxed text-content-secondary">
                Tool pages describe their processing approach where relevant. If
                you need maximum privacy for sensitive documents, prefer tools
                that state they run fully in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                3. Cookies, Local Storage &amp; Similar Technologies
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                WorkUtilities uses first-party cookies and browser storage for
                basic site functionality, such as remembering your currency
                preference (INR/USD), saved favorite tools, and similar UI
                settings. These are stored in cookies and/or{" "}
                <code className="text-content-primary">localStorage</code> in
                your browser.
              </p>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Third-party analytics services used on this site may also set
                cookies or use similar technologies, as described in Section 4.
              </p>
              <p className="mt-2 leading-relaxed text-content-secondary">
                <strong className="text-content-primary">
                  Advertising cookies:
                </strong>{" "}
                WorkUtilities does <em>not</em> currently display third-party
                advertising or use advertising cookies. See Section 5 for our
                approach to future monetization.
              </p>
              <p className="mt-2 leading-relaxed text-content-secondary">
                You can clear or block cookies and local storage through your
                browser settings. Blocking cookies may affect currency
                preferences and other convenience features.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                4. Analytics
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                We use analytics services to understand how visitors use
                WorkUtilities — for example, which pages are viewed and general
                traffic patterns. As of {LAST_UPDATED}, these include:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-content-secondary">
                <li>
                  <strong className="text-content-primary">
                    Google Analytics
                  </strong>{" "}
                  — provided by Google. Google Analytics may use cookies and
                  collect information such as pages visited, approximate
                  location, browser type, device information, and IP address,
                  according to{" "}
                  <a
                    href={GOOGLE_PRIVACY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue transition-colors hover:underline"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  . You can opt out of Google Analytics using the{" "}
                  <a
                    href={GOOGLE_ANALYTICS_OPT_OUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue transition-colors hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-content-primary">
                    Vercel Web Analytics
                  </strong>{" "}
                  — provided by Vercel, our hosting platform. Vercel states that
                  its Web Analytics product is designed to be privacy-friendly
                  and does not use third-party cookies for tracking. See{" "}
                  <a
                    href={VERCEL_PRIVACY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue transition-colors hover:underline"
                  >
                    Vercel&apos;s Privacy Policy
                  </a>
                  .
                </li>
              </ul>
              <p className="mt-3 leading-relaxed text-content-secondary">
                We use analytics to improve the site. We do not sell your
                personal information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                5. Advertising &amp; Future Monetization
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                WorkUtilities does <em>not</em> currently show third-party
                display advertising (including Google AdSense) on this website.
                No advertising cookies are in use at this time.
              </p>
              <p className="mt-2 leading-relaxed text-content-secondary">
                We may introduce third-party advertising services in the future
                to help keep the site free — for example, Google AdSense or
                similar programs. If we enable advertising, those partners may
                use cookies or similar identifiers to serve, measure, and
                personalize ads where permitted by law.
              </p>
              <p className="mt-2 leading-relaxed text-content-secondary">
                If advertising is enabled, we will update this Privacy Policy
                and our Terms to describe the services used, the types of data
                involved, and how you can manage personalized advertising —
                including through{" "}
                <a
                  href={GOOGLE_ADS_SETTINGS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue transition-colors hover:underline"
                >
                  Google Ads Settings
                </a>{" "}
                where applicable. We may also implement a cookie consent
                mechanism where required.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                6. Third-Party Links
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Our website may link to external sites (documentation, partner
                resources, or references). Those sites are not operated by
                WorkUtilities. We encourage you to review the privacy policies
                of any third-party site you visit.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                7. Changes to This Policy
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                We may update this Privacy Policy from time to time. The
                &quot;Last updated&quot; date at the top of this page will
                reflect the most recent revision. Continued use of WorkUtilities
                after changes are posted constitutes your acknowledgment of the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-content-primary">
                8. Contact Us
              </h2>
              <p className="mt-2 leading-relaxed text-content-secondary">
                Questions about this Privacy Policy? Contact us at{" "}
                <a
                  href="mailto:workutilities.tools@outlook.com"
                  className="text-brand-blue transition-colors hover:underline"
                >
                  workutilities.tools@outlook.com
                </a>
                .
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
