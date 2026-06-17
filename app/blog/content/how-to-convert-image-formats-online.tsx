import Link from "next/link";

const faqs = [
  {
    question: "What's the difference between JPG and PNG?",
    answer:
      "JPG uses lossy compression and produces smaller files, ideal for photos, but doesn't support transparency. PNG is lossless (no quality loss) and supports transparency, better for logos, graphics, and screenshots, but produces larger files for photo-like images.",
  },
  {
    question: "Is WebP better than JPG and PNG?",
    answer:
      "WebP generally achieves smaller file sizes at comparable visual quality, making it good for web performance, but support across older software and some platforms can still be inconsistent compared to the long-established JPG and PNG formats.",
  },
  {
    question: "Will converting JPG to PNG add transparency to my image?",
    answer:
      "No — converting formats alone doesn't add transparency to an existing solid background. You'd need to remove the background first using a background removal tool, then save as PNG to preserve the transparent areas.",
  },
  {
    question: "Does converting an image format reduce its quality?",
    answer:
      "Converting to a lossy format (like JPG) can reduce quality if compression is applied, while converting to a lossless format (like PNG) preserves the original quality, though possibly at a larger file size.",
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

export default function HowToConvertImageFormatsOnlineContent() {
  return (
    <article className="prose-custom">
      <p>
        JPG, PNG, and WebP each have strengths — choosing the wrong one means
        larger files, missing transparency, or compatibility headaches. Our free{" "}
        <Link href="/tools/image-converter">Image Converter</Link> handles
        conversions between all three in your browser, with nothing uploaded to a
        server.
      </p>

      <hr />

      <h2>JPG, PNG, and WebP Explained</h2>
      <p>
        <strong>JPG</strong> — best for photos with lots of color detail.
        Smaller file sizes through lossy compression, but some quality loss and
        no transparency support.
      </p>
      <p>
        <strong>PNG</strong> — lossless, supports transparency. Ideal for
        logos, graphics, screenshots with sharp edges and text, but larger file
        sizes for photos.
      </p>
      <p>
        <strong>WebP</strong> — modern format with both lossy and lossless modes,
        generally smaller than JPG/PNG at similar quality. Increasingly used for
        web performance, though older software and devices sometimes lack full
        support.
      </p>

      <hr />

      <h2>Why Convert Between Formats</h2>
      <ul>
        <li>A website or form requires a specific format upload</li>
        <li>An image editor or platform doesn&apos;t support WebP</li>
        <li>
          You need transparency in a photo that&apos;s currently JPG — note:
          converting JPG→PNG alone won&apos;t add transparency; use our{" "}
          <Link href="/tools/bg-remove">Background Remover</Link> first, then
          save as PNG
        </li>
        <li>Smaller file sizes for faster page loading</li>
      </ul>

      <hr />

      <h2>Quick Decision Guide</h2>
      <ul>
        <li><strong>Photos for general sharing</strong> → JPG</li>
        <li>
          <strong>Logos, icons, screenshots needing transparency</strong> → PNG
        </li>
        <li>
          <strong>Website optimization where supported</strong> → WebP
        </li>
      </ul>

      <hr />

      <h2>Frequently Asked Questions</h2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>
            {faq.question ===
            "Will converting JPG to PNG add transparency to my image?" ? (
              <>
                No — converting formats alone doesn&apos;t add transparency to
                an existing solid background. You&apos;d need to remove the
                background first using our{" "}
                <Link href="/tools/bg-remove">Background Remover</Link>, then
                save as PNG to preserve the transparent areas.
              </>
            ) : (
              faq.answer
            )}
          </p>
        </div>
      ))}

      <hr />

      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/how-to-convert-heic-to-jpg-on-windows">
            How to Convert HEIC to JPG on Windows
          </Link>
        </li>
        <li>
          <Link href="/blog/reduce-image-size-without-losing-quality">
            Reduce Image Size Without Losing Quality
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-convert-webp-to-jpg">
            How to Convert WebP to JPG
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/image-converter">Convert Image Format Now →</Link>
      </p>
    </article>
  );
}
