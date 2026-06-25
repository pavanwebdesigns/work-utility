import Link from "next/link";

const faqs = [
  {
    question: "What is the best image format for websites in 2026?",
    answer:
      "WebP is the recommended format for websites — it produces 25-35% smaller files than JPG at the same visual quality, supports transparency, and is recommended by Google for better Core Web Vitals scores. All major browsers have supported WebP since 2022.",
  },
  {
    question: "Will converting PNG to JPG remove the transparent background?",
    answer:
      "Yes — JPG doesn't support transparency, so any transparent areas will be filled with a solid color (usually white) during conversion. If you need transparency, keep the PNG format or convert to WebP instead, which supports transparency at smaller file sizes.",
  },
  {
    question: "What quality setting should I use when converting to JPG?",
    answer:
      "85% quality is the recommended sweet spot for most uses — files are 30-50% smaller than 100% quality with no visible difference at normal viewing sizes. Below 70%, compression artifacts (blocky patterns) start to appear, especially on gradients and text.",
  },
  {
    question: "Is it safe to convert images in a browser without uploading them?",
    answer:
      "Yes — browser-based converters like this one process images locally on your device using JavaScript and the Canvas API. Your image never leaves your browser, which means no privacy risk and no file size limits.",
  },
  {
    question: "Can I convert a JPG back to PNG without quality loss?",
    answer:
      "No — JPG is lossy, meaning it discards image data during compression. Once a photo has been saved as JPG, converting it to PNG won't recover the lost quality. The PNG will just be a lossless copy of the already-compressed JPG.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        JPG, PNG, and WebP each have strengths — choosing the wrong one means
        larger files, missing transparency, or compatibility headaches. Our free{" "}
        <Link href="/tools/image-converter">Image Converter</Link> handles
        conversions between all three in your browser, with nothing uploaded to a
        server.
      </p>

      <hr />

      <h2>Which Format Should I Use in 2026?</h2>

      <p>
        <strong>WebP</strong> — Best for websites. Produces 25–35% smaller files
        than JPG at the same visual quality. Google recommends it for Core Web
        Vitals and PageSpeed. Supported by all major browsers since 2022.
      </p>

      <p>
        <strong>JPG</strong> — Best for photos shared via email and messaging.
        Universal compatibility with every device and app. Best choice when you
        don&apos;t know what software will open the file.
      </p>

      <p>
        <strong>PNG</strong> — Best for logos, icons, screenshots, and any image
        with text or sharp edges. The only common format that supports lossless
        quality plus transparency.
      </p>

      <p>
        <strong>When in doubt:</strong> use JPG for sharing, PNG for graphics,
        WebP for websites.
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
        generally smaller than JPG/PNG at similar quality. Supported by all
        modern browsers; some older desktop apps may not open WebP directly.
      </p>

      <hr />

      <h2>Quality Settings Explained</h2>

      <ul>
        <li>
          <strong>100% quality:</strong> Maximum file size, zero compression
          artifacts. Rarely needed.
        </li>
        <li>
          <strong>85–95%:</strong> Recommended range — visually identical to
          100% but 30–50% smaller file size.
        </li>
        <li>
          <strong>70–85%:</strong> Good for web thumbnails and previews —
          slight artifacts on close inspection only.
        </li>
        <li>
          <strong>Below 70%:</strong> Visible compression artifacts (blocky
          patterns), especially in gradients. Only for very small file size
          requirements.
        </li>
      </ul>

      <p>
        The sweet spot for most uses: <strong>85% quality</strong>. Human eyes
        cannot distinguish 85% from 100% at normal viewing size. Our{" "}
        <Link href="/tools/image-converter">Image Converter</Link> includes a
        quality slider for JPG and WebP output.
      </p>

      <hr />

      <h2>Transparency: The Hidden Gotcha</h2>

      <p>
        Converting a transparent PNG to JPG silently fills transparent areas
        with white — many users don&apos;t notice until they place the image on
        a colored background.
      </p>

      <p>
        <strong>Solution:</strong> keep PNG for transparency, or use WebP (supports
        transparency at smaller file size than PNG). If you need a JPG from a
        logo with transparency, remove the background first with our{" "}
        <Link href="/tools/bg-remove">Background Remover</Link>, then convert.
      </p>

      <hr />

      <h2>WebP in 2026 — Why It Matters</h2>

      <ul>
        <li>
          All major browsers support WebP since 2022 (Chrome, Firefox, Safari,
          Edge)
        </li>
        <li>
          Google uses image format as a PageSpeed / Core Web Vitals signal
        </li>
        <li>25–35% smaller than JPG at the same visual quality</li>
        <li>
          Supports both transparency (like PNG) and animation (like GIF)
        </li>
        <li>
          Only downside: some older desktop apps (Photoshop pre-2022, some
          Windows viewers) may not open WebP directly — use our{" "}
          <Link href="/blog/how-to-convert-webp-to-jpg">
            WebP to JPG guide
          </Link>{" "}
          when compatibility matters
        </li>
      </ul>

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
        <li>
          Smaller file sizes for faster page loading — see our{" "}
          <Link href="/blog/reduce-image-size-without-losing-quality">
            image compression guide
          </Link>
        </li>
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

      <h2>Why Client-Side Conversion Is Better</h2>

      <p>
        Server-based converters upload your image to a remote server — a privacy
        risk for personal photos, ID scans, and business assets. Browser-based
        tools like WorkUtilities use the Canvas API to convert locally:
      </p>

      <ul>
        <li>Your image never leaves your device</li>
        <li>No queue, no account, no file retention on third-party servers</li>
        <li>Works offline once the page is loaded</li>
        <li>Adjust quality and see file size before downloading</li>
      </ul>

      <hr />

      <h2>Frequently Asked Questions</h2>

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
          <Link href="/blog/reduce-image-size-without-losing-quality">
            Reduce Image Size Without Losing Quality
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-convert-webp-to-jpg">
            How to Convert WebP to JPG
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-convert-heic-to-jpg-on-windows">
            How to Convert HEIC to JPG on Windows
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
