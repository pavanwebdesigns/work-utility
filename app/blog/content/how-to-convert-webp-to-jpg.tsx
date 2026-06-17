import Link from "next/link";

const faqs = [
  {
    question: "Why can't I open a WebP image in my photo editor?",
    answer:
      "WebP is a newer image format, and some older photo editing software or devices haven't added support for it — converting to JPG makes the image universally compatible.",
  },
  {
    question: "Will converting WebP to JPG lose image quality?",
    answer:
      "There may be a small quality change since JPG uses different compression than WebP, but for most everyday images the difference is not noticeable.",
  },
  {
    question: "What happens if my WebP image has transparency?",
    answer:
      "JPG doesn't support transparency, so any transparent areas in the original WebP will be filled with a solid background color (usually white) after conversion.",
  },
  {
    question: "Can I convert multiple WebP images to JPG at once?",
    answer:
      "Check the tool's interface — many browser-based converters support converting one image at a time, though batch support may vary.",
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

export default function HowToConvertWebpToJpgContent() {
  return (
    <article className="prose-custom">
      <p>
        Downloaded a WebP image from the web and can&apos;t open it in your
        editor? Our free{" "}
        <Link href="/tools/webp-to-jpg">WebP to JPG Converter</Link> fixes
        compatibility in seconds — entirely in your browser, no signup.
      </p>

      <hr />

      <h2>Why Convert WebP to JPG</h2>
      <p>
        WebP images from websites often can&apos;t be opened in older photo
        editors, uploaded to platforms that only accept JPG/PNG, or displayed
        correctly on devices with incomplete WebP support. Converting to JPG
        makes the image work everywhere.
      </p>

      <hr />

      <h2>Why WebP Exists</h2>
      <p>
        WebP was developed to produce smaller file sizes than JPG or PNG at
        similar visual quality — which is why many websites serve it
        automatically, even when you didn&apos;t choose that format.
      </p>

      <hr />

      <h2>What Changes in Conversion</h2>
      <p>
        JPG doesn&apos;t support transparency or animation. If the source WebP
        had either, those will be lost — transparent areas become a solid
        background (usually white). Worth knowing before you convert, not
        discovering afterward.
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
          <Link href="/blog/how-to-convert-image-formats-online">
            How to Convert Image Formats Online — JPG, PNG, WebP Explained
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/webp-to-jpg">Convert WebP to JPG Now →</Link>
      </p>
    </article>
  );
}
