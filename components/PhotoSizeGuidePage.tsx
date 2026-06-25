import Link from "next/link";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
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

  const ctaLabel = guide.enhancedCtaLabel ?? guide.ctaLabel;

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

          {guide.alertBanner && (
            <div className="mt-6 rounded-xl border border-tool-pdf/40 bg-tool-pdf/10 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-tool-pdf" />
                <div>
                  <p className="font-semibold text-tool-pdf">
                    ⚠️ {guide.alertBanner.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                    {guide.alertBanner.body}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className={`flex flex-wrap items-center gap-3 ${guide.alertBanner ? "mt-6" : "mt-8"}`}>
            <h1 className="text-2xl font-bold text-content-primary sm:text-3xl">
              {guide.h1}
            </h1>
            {guide.lastVerified && (
              <span className="rounded-full border border-tool-convert/30 bg-tool-convert/10 px-3 py-1 text-xs font-medium text-tool-convert">
                Last verified: {guide.lastVerified}
              </span>
            )}
          </div>

          {guide.quickSpecs && (
            <div className="mt-6 rounded-xl border border-tool-photo/30 bg-tool-photo/5 p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-content-muted">
                Quick Spec Summary
              </h2>
              <ul className="mt-4 space-y-2.5">
                {guide.quickSpecs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-start gap-2.5 text-sm text-content-primary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-tool-convert" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-surface-border bg-surface-card p-5 sm:p-6">
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
                <dt className="text-xs text-content-muted">
                  {guide.minKb ? "File Size" : "Max File Size"}
                </dt>
                <dd className="mt-0.5 font-medium text-content-primary">
                  {guide.minKb
                    ? `${guide.minKb} – ${guide.maxKb}`
                    : guide.maxKb}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-content-muted">Format</dt>
                <dd className="mt-0.5 font-medium text-content-primary">
                  {guide.format}
                </dd>
              </div>
              {guide.faceCoverage && (
                <div>
                  <dt className="text-xs text-content-muted">Face Coverage</dt>
                  <dd className="mt-0.5 font-medium text-content-primary">
                    {guide.faceCoverage}
                  </dd>
                </div>
              )}
              {guide.photoAge && (
                <div>
                  <dt className="text-xs text-content-muted">Photo Age</dt>
                  <dd className="mt-0.5 font-medium text-content-primary">
                    {guide.photoAge}
                  </dd>
                </div>
              )}
              <div
                className={
                  guide.faceCoverage && guide.photoAge ? "sm:col-span-2" : ""
                }
              >
                <dt className="text-xs text-content-muted">Background</dt>
                <dd className="mt-0.5 font-medium text-content-primary">
                  {guide.background}
                </dd>
              </div>
            </dl>
          </div>

          {guide.formatComparison && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-content-primary">
                {guide.formatComparison.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                {guide.formatComparison.intro}
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-surface-border">
                <table className="w-full min-w-[480px] text-sm">
                  <thead>
                    <tr className="border-b border-surface-border bg-surface-card">
                      <th className="px-4 py-3 text-left font-medium text-content-primary">
                        Document
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-content-primary">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-content-primary">
                        Digital Pixels
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-content-primary">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {guide.formatComparison.rows.map((row) => (
                      <tr
                        key={row.document}
                        className="border-b border-surface-border last:border-0"
                      >
                        <td className="px-4 py-3 font-medium text-content-primary">
                          {row.document}
                        </td>
                        <td className="px-4 py-3 text-content-secondary">
                          {row.size}
                        </td>
                        <td className="px-4 py-3 text-content-secondary">
                          {row.pixels}
                        </td>
                        <td className="px-4 py-3 text-content-secondary">
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {guide.ruleChanges && guide.ruleChanges.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-content-primary">
                {guide.ruleChangesTitle ?? "What Changed"}
              </h2>
              <ul className="mt-4 space-y-3">
                {guide.ruleChanges.map((change) => (
                  <li
                    key={change.oldRule}
                    className="rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm leading-relaxed text-content-secondary"
                  >
                    <span className="text-tool-pdf">❌</span> {change.oldRule}{" "}
                    → <span className="text-tool-convert">✅</span>{" "}
                    {change.newRule}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {guide.pixelDimensions && guide.pixelDimensions.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-content-primary">
                {guide.pixelDimensionsTitle ?? "Pixel Dimensions at Different DPI"}
              </h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-surface-border">
                <table className="w-full min-w-[320px] text-sm">
                  <thead>
                    <tr className="border-b border-surface-border bg-surface-card">
                      <th className="px-4 py-3 text-left font-medium text-content-primary">
                        {guide.pixelDimensionsColumnLabel ?? "DPI"}
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-content-primary">
                        Pixels
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-content-primary">
                        Use case
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {guide.pixelDimensions.map((row) => (
                      <tr
                        key={row.label ?? row.dpi}
                        className="border-b border-surface-border last:border-0"
                      >
                        <td className="px-4 py-3 text-content-secondary">
                          {row.label ?? `${row.dpi} DPI`}
                        </td>
                        <td className="px-4 py-3 font-medium text-content-primary">
                          {row.pixels}
                        </td>
                        <td className="px-4 py-3 text-content-secondary">
                          {row.bestFor}
                          {row.recommended && (
                            <span className="ml-1 text-tool-convert">✅</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {guide.pixelDimensionsNote && (
                <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                  {guide.pixelDimensionsNote}
                </p>
              )}
            </section>
          )}

          {guide.orientationWarning && (
            <div className="mt-10 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <p className="font-semibold text-amber-400">
                    {guide.orientationWarning.title}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-content-secondary">
                    {guide.orientationWarning.items.map((item) => (
                      <li key={item.label}>
                        <span className="font-medium text-content-primary">
                          {item.label}:
                        </span>{" "}
                        {item.dimensions} ({item.note})
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                    {guide.orientationWarning.footer}
                  </p>
                </div>
              </div>
            </div>
          )}

          {guide.whyKbLimit && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-content-primary">
                Why the 50KB File Size Limit?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-content-secondary">
                {guide.whyKbLimit}
              </p>
            </section>
          )}

          {guide.rejectionReasons && guide.rejectionReasons.length > 0 && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold text-content-primary">
                {guide.rejectionReasonsTitle ?? "Common Rejection Reasons"}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {guide.rejectionReasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex gap-3 text-sm leading-relaxed text-content-secondary"
                  >
                    <span className="shrink-0 text-tool-pdf">❌</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </section>
          )}

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

          <div className="mt-10 rounded-xl border border-tool-photo/30 bg-tool-photo/5 p-6 text-center sm:p-8">
            <p className="text-sm text-content-secondary">
              Resize your photo to the exact dimensions and file size — free,
              instant, and private in your browser.
            </p>
            <Link
              href={`/tools/photo-resizer?preset=${guide.ctaPreset}`}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-tool-photo px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#D97706]"
            >
              {ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
            {guide.ctaBullets && (
              <p className="mt-4 text-sm text-content-secondary">
                {guide.ctaBullets.map((bullet, index) => (
                  <span key={bullet}>
                    {index > 0 && " · "}
                    <span className="text-tool-convert">✅</span> {bullet}
                  </span>
                ))}
              </p>
            )}
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
