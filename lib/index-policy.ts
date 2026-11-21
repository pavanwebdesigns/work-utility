/**
 * Central index registry for the core cut.
 * Non-core pages stay live but should be noindex and leave the sitemap/listings.
 * See docs/CORE-CUT-SPEC.md.
 */

export const CORE_TOOLS = new Set<string>([
  // PDF & docs
  "pdf-compress",
  "pdf-merge",
  "pdf-split",
  "pdf-unlock",
  "pdf-to-jpg",
  "pdf-to-word",
  "word-to-pdf",
  "image-to-pdf",
  "word-compress",
  // Images & photos
  "image-compress",
  "photo-resizer",
  "bg-remove",
  "heic-to-jpg",
  "image-converter",
  "webp-to-jpg",
  "signature-maker",
  // India money
  "emi-calculator",
  "gst-calculator",
  "ctc-calculator",
  "income-tax-calculator",
  "tax-regime-comparison",
  "hra-calculator",
  "sip-calculator",
  "fd-calculator",
  "ppf-calculator",
  "epf-calculator",
  "gratuity-calculator",
  "rent-receipt-generator",
  // USA money
  "paycheck-calculator",
  "mortgage-calculator",
  "401k-calculator",
  "w2-vs-1099-calculator",
  // Students & text
  "word-counter",
  "character-counter",
  "percentage-calculator",
  "cgpa-to-percentage",
  "age-calculator",
  "text-to-speech",
  // Everyday/dev with real demand
  "password-generator",
  "qr-code-generator",
  "uuid-generator",
  "timestamp-converter",
  "json-formatter",
  "unit-converter",
  "pomodoro-timer",
]);

export const CORE_POSTS = new Set<string>([
  "aadhaar-card-photo-size",
  "how-to-convert-heic-to-jpg-on-windows",
  "how-to-unlock-password-protected-pdf",
  "how-to-create-digital-signature-india",
  "how-to-calculate-percentage-of-marks-india",
  "word-count-for-upsc-essay-writing",
  "leap-year-checker-guide",
  "cgpa-to-percentage-for-job-applications",
  "how-to-compress-pdf-under-1mb",
  "compress-image-under-100kb-india",
  "how-to-resize-photo-for-government-exams",
  "how-to-merge-pdf-on-mobile-india",
  "how-to-split-pdf-extract-pages-india",
  "how-to-calculate-in-hand-salary-from-ctc",
  "old-vs-new-tax-regime-comparison-2026",
  "home-loan-emi-guide-india",
  "rent-receipt-for-hra-exemption-india",
  "how-to-start-sip-india-beginners-guide",
  "qr-code-for-small-business-india",
  "401k-vs-roth-ira-guide-usa",
  "w2-vs-1099-tax-comparison-guide",
]);

export const CORE_PAGES = new Set<string>([
  "/",
  "/tools",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/aadhaar-photo-size",
  "/pan-card-photo-size",
  "/passport-photo-size-india",
  "/visa-photo-size",
  "/driving-licence-photo-size",
]);

/** Normalize a path or full URL to a pathname without trailing slash (except "/"). */
function normalizePath(path: string): string {
  let pathname = path.trim();
  try {
    if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
      pathname = new URL(pathname).pathname;
    }
  } catch {
    // keep as-is
  }
  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * True when the path is part of the indexed core.
 * Accepts pathnames like `/tools/pdf-compress` or `/blog/slug`.
 */
export function isIndexable(path: string): boolean {
  const pathname = normalizePath(path);

  if (CORE_PAGES.has(pathname)) {
    return true;
  }

  if (pathname.startsWith("/tools/")) {
    const slug = pathname.slice("/tools/".length);
    return slug.length > 0 && !slug.includes("/") && CORE_TOOLS.has(slug);
  }

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length);
    return slug.length > 0 && !slug.includes("/") && CORE_POSTS.has(slug);
  }

  return false;
}
