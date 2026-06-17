import Link from "next/link";

const faqs = [
  {
    question: "What is a good color contrast ratio for accessibility?",
    answer:
      "WCAG guidelines recommend a minimum contrast ratio of 4.5:1 for normal text (AA standard) and 7:1 for AAA compliance, with slightly lower thresholds for large text.",
  },
  {
    question: "How do I calculate aspect ratio for resizing an image?",
    answer:
      "Aspect ratio is the proportional relationship between width and height (e.g. 16:9). To resize while keeping proportions, calculate the new height (or width) using the same ratio as the original dimensions.",
  },
  {
    question: "What's the difference between HEX, RGB, and HSL color formats?",
    answer:
      "HEX is a compact hexadecimal code (e.g. #3B82F6) commonly used in CSS, RGB specifies red/green/blue intensity values directly, and HSL describes color by hue, saturation, and lightness — useful for intuitively adjusting a color's brightness or vibrancy.",
  },
  {
    question: "Why convert Markdown to HTML instead of just writing HTML directly?",
    answer:
      "Markdown is faster to write and read in its raw form (especially for documentation and content drafts), but browsers and many platforms need actual HTML to render formatting — converting bridges that gap.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function DesignToolsForDevelopersGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Color and layout decisions show up in every frontend project — whether you
        are matching a designer&apos;s handoff, checking accessibility, or
        previewing documentation. These four free tools run in your browser with
        no signup. See our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>{" "}
        for the full developer toolkit.
      </p>

      <hr />

      <h2>Color Picker</h2>
      <p>
        Pick and convert colors between HEX, RGB, and HSL formats — useful when a
        designer hands over a color in one format but your codebase needs another,
        or when sampling a color value to reuse consistently across a UI. Save up
        to ten colors to a palette during a design session. Use{" "}
        <Link href="/tools/color-picker">Color Picker</Link>.
      </p>

      <hr />

      <h2>Color Contrast Checker</h2>
      <p>
        Check whether a text and background color combination meets WCAG
        accessibility contrast ratio guidelines — AA and AAA standards. This
        matters for users with low vision and is increasingly a real compliance
        requirement for many websites, not just a nice-to-have. See pass/fail
        badges and a live text preview as you adjust colors. Use{" "}
        <Link href="/tools/color-contrast">Color Contrast Checker</Link>.
      </p>

      <hr />

      <h2>Aspect Ratio Calculator</h2>
      <p>
        Calculate proportional dimensions when resizing an image or video — for
        example, figuring out what height to use for a fixed width while keeping
        the original proportions intact, avoiding stretched or squished media.
        Includes presets for 16:9, 9:16, 1:1, and more. Use{" "}
        <Link href="/tools/aspect-ratio">Aspect Ratio Calculator</Link>.
      </p>

      <hr />

      <h2>Markdown to HTML Converter</h2>
      <p>
        Convert Markdown-formatted text into rendered HTML — useful for previewing
        how Markdown content (READMEs, blog drafts, documentation) will look once
        rendered, or for converting content for a CMS or email that needs HTML
        rather than raw Markdown syntax. Live preview updates as you type. Use{" "}
        <Link href="/tools/markdown-to-html">Markdown to HTML Converter</Link>.
      </p>

      <hr />

      <h2>Frequently Asked Questions</h2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <hr />

      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-developer-tools-guide">
            Complete Developer Tools Guide 2026
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/color-picker">Try Color Picker →</Link>
        {" · "}
        <Link href="/tools/color-contrast">Contrast Checker →</Link>
        {" · "}
        <Link href="/tools/aspect-ratio">Aspect Ratio →</Link>
        {" · "}
        <Link href="/tools/markdown-to-html">Markdown to HTML →</Link>
      </p>
    </article>
  );
}
