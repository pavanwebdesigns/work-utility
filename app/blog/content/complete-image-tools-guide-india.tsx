import Link from "next/link";

const faqs = [
  {
    question: "How to compress image under 50KB for government portal?",
    answer:
      "Upload to Image Compress, select High compression, and check file size. For photos, resize to exact dimensions first with Photo Resizer, then compress.",
  },
  {
    question: "How to resize image to passport size free?",
    answer:
      "Use Photo Resizer with Passport preset (35mm × 45mm). Click a photo against a white wall, upload, crop, and download.",
  },
  {
    question: "How to convert PNG to JPG online free?",
    answer:
      "Use Image Converter to switch between JPG, PNG, and WebP formats instantly in your browser. No software needed.",
  },
  {
    question: "How to create digital signature for PDF?",
    answer:
      "Draw or upload your signature with Signature Maker, download as PNG, and insert into PDFs or forms. Guide: How to create digital signature.",
  },
  {
    question: "How to make QR code for business free?",
    answer:
      "Paste your UPI link, WhatsApp URL, or website into QR Code Generator and download PNG for print or digital use.",
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

export default function CompleteImageToolsGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Meena sells handmade jewellery on Instagram from Pune. Every product photo
        needed a white background, under 100KB for Meesho uploads, and a QR code
        for UPI payments at her stall. She was paying for three different apps until
        she found free image tools that handle compression, resizing, conversion,
        signatures, and QR codes in one place. This guide covers every image task
        Indians face daily.
      </p>

      <nav className="rounded-xl border border-surface-border bg-surface-card p-5 not-prose">
        <p className="mb-3 text-sm font-semibold text-content-primary">
          Table of Contents
        </p>
        <ul className="space-y-2 text-sm text-brand-blue">
          <li><a href="#compress">Image compression — reduce file size</a></li>
          <li><a href="#resize">Photo resize — exact dimensions</a></li>
          <li><a href="#convert">Image format conversion</a></li>
          <li><a href="#signature">Digital signature creation</a></li>
          <li><a href="#qr">QR code generation</a></li>
          <li><a href="#background">Background removal</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>

      <hr />

      <h2 id="compress">Image Compression — Reduce File Size</h2>
      <p>
        Government portals, WhatsApp, and e-commerce platforms enforce strict KB
        limits. Compress with{" "}
        <Link href="/tools/image-compress">Image Compress</Link>. Guides:{" "}
        <Link href="/blog/compress-image-under-100kb-india">
          Compress image under 100KB
        </Link>
        .
      </p>

      <h2 id="resize">Photo Resize — Exact Dimensions</h2>
      <p>
        Aadhaar, PAN, passport, SSC — each needs different pixel dimensions.{" "}
        <Link href="/tools/photo-resizer">Photo Resizer</Link> has presets for
        Indian documents. Guides:{" "}
        <Link href="/blog/aadhaar-photo-size-guide">Aadhaar photo size guide</Link>,{" "}
        <Link href="/blog/passport-photo-size-requirements-india-guide">
          Passport photo size requirements
        </Link>,{" "}
        <Link href="/blog/how-to-make-passport-size-photo-at-home">
          Make passport size photo at home
        </Link>
        .
      </p>

      <h2 id="convert">Image Format Conversion</h2>
      <p>
        Convert between JPG, PNG, and WebP with{" "}
        <Link href="/tools/image-converter">Image Converter</Link>. Combine
        multiple images into one PDF for bank KYC with{" "}
        <Link href="/tools/image-to-pdf">Image to PDF</Link>. Guide:{" "}
        <Link href="/blog/how-to-combine-images-into-pdf-india">
          How to combine images into PDF
        </Link>
        .
      </p>

      <h2 id="signature">Digital Signature Creation</h2>
      <p>
        Sign PDF forms and applications without printing. Create signatures with{" "}
        <Link href="/tools/signature-maker">Signature Maker</Link>. Guide:{" "}
        <Link href="/blog/how-to-create-digital-signature-india">
          How to create digital signature
        </Link>
        .
      </p>

      <h2 id="qr">QR Code Generation</h2>
      <p>
        UPI payments, WhatsApp groups, shop menus, college fest registrations —
        QR codes simplify everything. Create free with{" "}
        <Link href="/tools/qr-code-generator">QR Code Generator</Link>. Guides:{" "}
        <Link href="/blog/qr-code-for-small-business-india">
          QR code for small business
        </Link>,{" "}
        <Link href="/blog/qr-code-for-college-events-india">
          QR code for college events
        </Link>
        .
      </p>

      <h2 id="background">Background Removal</h2>
      <p>
        Product photos, passport-style headshots, and LinkedIn profiles often need
        clean backgrounds. Our Background Remover tool is being upgraded for better
        accuracy — use Photo Resizer and Image Compress in the meantime for
        document photos.
      </p>

      <hr />

      <h2>All Image Tools</h2>
      <ul>
        <li><Link href="/tools/image-compress">Image Compress</Link></li>
        <li><Link href="/tools/photo-resizer">Photo Resizer</Link></li>
        <li><Link href="/tools/image-converter">Image Converter</Link></li>
        <li><Link href="/tools/image-to-pdf">Image to PDF</Link></li>
        <li><Link href="/tools/signature-maker">Signature Maker</Link></li>
        <li><Link href="/tools/qr-code-generator">QR Code Generator</Link></li>
      </ul>

      <hr />

      <h2 id="faq">Frequently Asked Questions</h2>
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

      <p>
        <Link href="/tools">Try Our Free Image Tools →</Link>
      </p>
    </article>
  );
}
