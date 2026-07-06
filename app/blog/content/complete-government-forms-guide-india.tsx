import Link from "next/link";

const faqs = [
  {
    question: "What is the photo size for Aadhaar card?",
    answer:
      "Aadhaar photo size is 413×531 pixels, maximum 50KB, JPG format, for printed photos at enrollment centers. Photo updates require an in-person visit — online updates cover demographic details only.",
  },
  {
    question: "What is the photo size for passport in India?",
    answer:
      "Indian passport photos are 35mm × 45mm (2 inch × 2 inch), typically 413×531 pixels at 300 DPI, white background, max 1MB.",
  },
  {
    question: "How to resize photo for UPSC application?",
    answer:
      "UPSC requires approximately 3.5cm × 4.5cm, max 300KB JPG. Use Photo Resizer with government exam preset or custom dimensions.",
  },
  {
    question: "How to compress PDF for government portal?",
    answer:
      "Use PDF Compress with 70–80% compression for portal uploads. Most Indian government portals accept PDFs under 1–2MB.",
  },
  {
    question: "How to calculate age for government forms?",
    answer:
      "Government forms use age as on a specific cutoff date (e.g., 1st August for UPSC). Use Age Calculator with your DOB and the cutoff date.",
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

export default function CompleteGovernmentFormsGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Kavitha spent three hours at a photo studio in Hyderabad, then got her
        SSC application rejected because the photo was 4MB instead of 50KB. Indian
        government forms are unforgiving about dimensions, file sizes, and formats.
        This guide covers every photo and document requirement you will face — from
        Aadhaar updates to UPSC applications — with free tools to prepare everything
        at home.
      </p>

      <nav className="rounded-xl border border-surface-border bg-surface-card p-5 not-prose">
        <p className="mb-3 text-sm font-semibold text-content-primary">
          Table of Contents
        </p>
        <ul className="space-y-2 text-sm text-brand-blue">
          <li><a href="#photo-requirements">Photo size requirements for government documents</a></li>
          <li><a href="#aadhaar">Aadhaar card photo requirements</a></li>
          <li><a href="#pan">PAN card photo requirements</a></li>
          <li><a href="#passport">Passport photo requirements</a></li>
          <li><a href="#exams">Government exam photo requirements</a></li>
          <li><a href="#pdf-limits">PDF size limits on government portals</a></li>
          <li><a href="#age">Age calculation for eligibility</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>

      <hr />

      <h2 id="photo-requirements">Photo Size Requirements for Government Documents</h2>
      <p>
        Every Indian government document has different photo specs. Using one
        passport photo for Aadhaar, PAN, and SSC will get at least one application
        rejected. Always check the specific portal before uploading. Use{" "}
        <Link href="/tools/photo-resizer">Photo Resizer</Link> with presets for
        each document type.
      </p>

      <h2 id="aadhaar">Aadhaar Card Photo Requirements</h2>
      <p>
        UIDAI requires 413×531 pixels, max 50KB JPG for printed photos some
        enrollment centers request. Photo and biometric updates require an
        in-person visit — online updates cover demographic details (address,
        name, DOB) only. Guide:{" "}
        <Link href="/blog/aadhaar-photo-size-guide">Aadhaar photo size guide</Link>.
        Detailed specs:{" "}
        <Link href="/aadhaar-photo-size">Aadhaar Photo Size</Link> landing page.
      </p>

      <h2 id="pan">PAN Card Photo Requirements</h2>
      <p>
        PAN applications need a recent colour photo, typically under 50KB. See{" "}
        <Link href="/pan-card-photo-size">PAN Card Photo Size</Link> for exact
        dimensions and resize instructions.
      </p>

      <h2 id="passport">Passport Photo Requirements</h2>
      <p>
        MEA requires 35mm × 45mm, white background, neutral expression. Guides:{" "}
        <Link href="/blog/passport-photo-size-requirements-india-guide">
          Passport photo size requirements
        </Link>
        ,{" "}
        <Link href="/blog/how-to-make-passport-size-photo-at-home">
          Make passport size photo at home
        </Link>
        , and{" "}
        <Link href="/passport-photo-size-india">Passport Photo Size India</Link>.
      </p>

      <h2 id="exams">Government Exam Photo Requirements (UPSC, SSC, Railway)</h2>
      <p>
        SSC and Railway typically need 200×230 pixels, 40–50KB JPG. UPSC allows up
        to 300KB. Read{" "}
        <Link href="/blog/how-to-resize-photo-for-government-exams">
          Resize photo for government exams
        </Link>{" "}
        and compress with{" "}
        <Link href="/tools/image-compress">Image Compress</Link> or{" "}
        <Link href="/blog/compress-image-under-100kb-india">
          Compress image under 100KB
        </Link>
        .
      </p>

      <h2 id="pdf-limits">PDF Size Limits on Government Portals</h2>
      <p>
        Most portals cap PDFs at 1–2MB. Compress with{" "}
        <Link href="/tools/pdf-compress">PDF Compress</Link> before uploading
        marksheets, certificates, or ID proofs. Create QR codes for payment links
        on forms with{" "}
        <Link href="/tools/qr-code-generator">QR Code Generator</Link>.
      </p>

      <h2 id="age">Age Calculation for Eligibility</h2>
      <p>
        UPSC, SSC, and Railway calculate age as on specific cutoff dates — getting
        this wrong means disqualification. Use{" "}
        <Link href="/tools/age-calculator">Age Calculator</Link> and read{" "}
        <Link href="/blog/age-calculator-for-government-forms-india">
          Age calculator for government forms
        </Link>
        . Also see{" "}
        <Link href="/driving-licence-photo-size">Driving Licence Photo Size</Link>.
      </p>

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
        <Link href="/tools/photo-resizer">Resize Your Photo Free →</Link>
      </p>
    </article>
  );
}
