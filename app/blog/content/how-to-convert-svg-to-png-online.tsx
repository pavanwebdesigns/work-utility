import Link from "next/link";

const faqs = [
  {
    question: "Why would I convert a scalable SVG into a fixed-resolution PNG?",
    answer:
      "Many platforms, apps, and older software don't support SVG and require a standard raster image format — converting to PNG at your needed resolution makes the image universally usable.",
  },
  {
    question: "What resolution should I choose when converting?",
    answer:
      "Choose the largest resolution you might need, since SVG can be re-exported at any size, but a PNG can't be cleanly upscaled afterward without quality loss.",
  },
  {
    question: "Does the converted PNG support transparency?",
    answer:
      "Yes, if your SVG has a transparent background, you can preserve that transparency in the PNG output rather than adding a solid background.",
  },
  {
    question: "Will text in my SVG render correctly in the PNG?",
    answer:
      "Generally yes, as long as the SVG's fonts are properly embedded or use system-available fonts — externally-referenced fonts not loaded in the browser may not render as expected.",
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

export default function HowToConvertSvgToPngOnlineContent() {
  return (
    <article className="prose-custom">
      <p>
        SVG is resolution-independent, but many platforms only accept raster images. Use our free{" "}
        <Link href="/tools/svg-to-png">SVG to PNG Converter</Link> to export at the size you need, with transparent or solid backgrounds.
      </p>
      <hr />
      <h2>Why Convert SVG to PNG?</h2>
      <p>
        Social media, older apps, and many upload forms expect PNG or JPG — not vector SVG. Converting lets you use logos, icons, and illustrations where SVG isn&apos;t supported.
      </p>
      <hr />
      <h2>Choose the Right Output Size</h2>
      <p>
        SVG scales perfectly to any size, but PNG is fixed-resolution. Export at the largest size you might need — upscaling a PNG afterward causes quality loss.
      </p>
      <hr />
      <h2>Transparent Backgrounds for Logos</h2>
      <p>
        Transparent PNG output matters when your icon or logo needs to sit on top of other content without a white box around it.
      </p>
      <hr />
      <h2>Related Tools</h2>
      <p>
        Browse our <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide</Link>.
      </p>
      <p>
        For raster format changes, see <Link href="/blog/how-to-convert-image-formats-online">how to convert image formats online</Link>.
      </p>
      <hr />
      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {faqs.map((faq) => (
        <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>
      ))}
      <hr />
      <p><Link href="/tools/svg-to-png">Convert SVG to PNG Now →</Link></p>
    </article>
  );
}
