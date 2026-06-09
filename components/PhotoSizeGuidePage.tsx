import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  PHOTO_SIZE_GUIDE_ROUTES,
  type PhotoSizeGuide,
} from "@/lib/photo-size-guides";

export function PhotoSizeGuidePage({ guide }: { guide: PhotoSizeGuide }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const relatedPages = guide.relatedGuideIds
    .map((id) => PHOTO_SIZE_GUIDE_ROUTES[id])
    .filter(Boolean);

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-surface-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-content-secondary transition-colors hover:text-content-primary"
          >
            ← Home
          </Link>

          <h1 className="mt-8 text-2xl font-bold text-content-primary sm:text-3xl">
            {guide.h1}
          </h1>

          <div className="mt-8 rounded-xl border border-surface-border bg-surface-card p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-content-muted">
              Quick Reference
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-content-muted">Dimensions</dt>
                <dd className="mt-0.5 font-medium text-content-primary">
                  {guide.dimensions}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-content-muted">Physical Size</dt>
                <dd className="mt-0.5 font-medium text-content-primary">
                  {guide.physicalSize}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-content-muted">Max File Size</dt>
                <dd className="mt-0.5 font-medium text-content-primary">
                  {guide.maxKb}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-content-muted">Format</dt>
                <dd className="mt-0.5 font-medium text-content-primary">
                  {guide.format}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-content-muted">Background</dt>
                <dd className="mt-0.5 font-medium text-content-primary">
                  {guide.background}
                </dd>
              </div>
            </dl>
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-content-primary">
              Common Upload Errors
            </h2>
            <ul className="mt-4 space-y-3">
              {guide.uploadErrors.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-content-secondary"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tool-photo" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-content-primary">
              How to Resize Your Photo
            </h2>
            <ol className="mt-4 space-y-4">
              {guide.resizeSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tool-photo/10 text-xs font-bold text-tool-photo">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-content-secondary">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-10 rounded-xl border border-tool-photo/30 bg-tool-photo/5 p-6 text-center">
            <p className="text-sm text-content-secondary">
              Resize your photo to the exact dimensions and file size — free,
              instant, and private in your browser.
            </p>
            <Link
              href={`/tools/photo-resizer?preset=${guide.ctaPreset}`}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-tool-photo px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#D97706]"
            >
              {guide.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <section className="mt-12">
            <h2 className="text-lg font-semibold text-content-primary">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-4">
              {guide.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl border border-surface-border bg-surface-card p-4 sm:p-5"
                >
                  <h3 className="font-medium text-content-primary">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {relatedPages.length > 0 && (
            <section className="mt-12 border-t border-surface-border pt-8">
              <h2 className="text-lg font-semibold text-content-primary">
                Related Photo Size Guides
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedPages.map((page) => (
                  <Link
                    key={page.path}
                    href={page.path}
                    className="flex items-center justify-between rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-content-secondary transition-colors hover:border-tool-photo/40 hover:text-content-primary"
                  >
                    {page.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-content-muted" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
