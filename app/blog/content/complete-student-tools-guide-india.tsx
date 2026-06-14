import Link from "next/link";

const faqs = [
  {
    question: "How to convert CGPA to percentage for job application?",
    answer:
      "Multiply CGPA by your university's formula — VTU uses ×9.5, Anna University differs, CBSE uses ×9.5. Use our CGPA to Percentage tool with the correct formula for your board.",
  },
  {
    question: "What is the word limit for UPSC essay?",
    answer:
      "UPSC Mains essay paper requires 1000–1200 words per essay. Practice with our Word Counter to stay within limits.",
  },
  {
    question: "How to resize photo for SSC CGL application?",
    answer:
      "SSC CGL requires 200×230 pixels, max 50KB JPG. Use Photo Resizer with custom dimensions, then Image Compress if needed.",
  },
  {
    question: "What is 7.5 CGPA in percentage VTU?",
    answer:
      "VTU formula: 7.5 × 9.5 = 71.25%. Always verify with your university's official conversion formula before submitting job applications.",
  },
  {
    question: "How to calculate aggregate percentage for 6 subjects?",
    answer:
      "Add marks across all 6 subjects, divide by total maximum marks, multiply by 100. Use Percentage Calculator for instant results.",
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

export default function CompleteStudentToolsGuideIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        From Class 10 board results to campus placements, Indian students juggle
        percentage calculations, exam photo uploads, essay word counts, and PDF
        submissions — often on a phone with a deadline in hours. Paid apps charge
        ₹99/month for tools you use once a semester. This guide maps every student
        task to a free WorkUtilities tool, with links to detailed how-to guides for
        each scenario.
      </p>

      <nav className="rounded-xl border border-surface-border bg-surface-card p-5 not-prose">
        <p className="mb-3 text-sm font-semibold text-content-primary">
          Table of Contents
        </p>
        <ul className="space-y-2 text-sm text-brand-blue">
          <li><a href="#cgpa">CGPA to percentage conversion</a></li>
          <li><a href="#percentage">How to calculate percentage of marks</a></li>
          <li><a href="#word-count">Word count for essays and assignments</a></li>
          <li><a href="#photo">Photo resize for exam applications</a></li>
          <li><a href="#pdf">PDF tools for students</a></li>
          <li><a href="#age">Age calculation for eligibility</a></li>
          <li><a href="#best-tools">Best free tools every student needs</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>

      <hr />

      <h2 id="cgpa">CGPA to Percentage Conversion</h2>
      <p>
        Job portals and government forms ask for percentage but your marksheet shows
        CGPA. Convert accurately with{" "}
        <Link href="/tools/cgpa-to-percentage">CGPA to Percentage</Link>. Guide:{" "}
        <Link href="/blog/cgpa-to-percentage-for-job-applications">
          CGPA to percentage for job applications
        </Link>
        .
      </p>

      <h2 id="percentage">How to Calculate Percentage of Marks</h2>
      <p>
        Board exams, scholarship forms, and visa applications need aggregate
        percentage. Formula: (marks obtained ÷ total marks) × 100. Use{" "}
        <Link href="/tools/percentage-calculator">Percentage Calculator</Link> and
        read{" "}
        <Link href="/blog/how-to-calculate-percentage-of-marks-india">
          How to calculate percentage of marks
        </Link>
        .
      </p>

      <h2 id="word-count">Word Count for Essays and Assignments</h2>
      <p>
        UPSC essays need 1000–1200 words. College assignments have strict limits.
        Track count with{" "}
        <Link href="/tools/word-counter">Word Counter</Link>. UPSC-specific guide:{" "}
        <Link href="/blog/word-count-for-upsc-essay-writing">
          Word count for UPSC essay
        </Link>
        .
      </p>

      <h2 id="photo">Photo Resize for Exam Applications</h2>
      <p>
        SSC, UPSC, Railway, and college forms reject oversized photos constantly.
        Resize with{" "}
        <Link href="/tools/photo-resizer">Photo Resizer</Link>, compress with{" "}
        <Link href="/tools/image-compress">Image Compress</Link>. Guides:{" "}
        <Link href="/blog/how-to-resize-photo-for-government-exams">
          Resize photo for government exams
        </Link>
        .
      </p>

      <h2 id="pdf">PDF Tools for Students</h2>
      <p>
        Merge assignment PDFs with{" "}
        <Link href="/tools/pdf-merge">PDF Merge</Link>, extract marksheet pages
        with{" "}
        <Link href="/tools/pdf-split">PDF Split</Link>. Guide:{" "}
        <Link href="/blog/how-to-split-pdf-extract-pages-india">
          How to split PDF and extract pages
        </Link>
        .
      </p>

      <h2 id="age">Age Calculation for Eligibility</h2>
      <p>
        UPSC and SSC age cutoffs use specific reference dates. Calculate exact age
        with{" "}
        <Link href="/tools/age-calculator">Age Calculator</Link>. Read{" "}
        <Link href="/blog/age-calculator-for-government-forms-india">
          Age calculator for government forms
        </Link>
        .
      </p>

      <h2 id="best-tools">Best Free Tools Every Student Needs</h2>
      <p>
        Password Generator for secure accounts, Unit Converter for engineering
        coursework, QR Code Generator for college fests. Full list:{" "}
        <Link href="/blog/best-free-tools-for-indian-students">
          Best free tools for Indian students
        </Link>
        .
      </p>

      <hr />

      <h2>All Student Tools</h2>
      <ul>
        <li><Link href="/tools/cgpa-to-percentage">CGPA to Percentage</Link></li>
        <li><Link href="/tools/percentage-calculator">Percentage Calculator</Link></li>
        <li><Link href="/tools/word-counter">Word Counter</Link></li>
        <li><Link href="/tools/age-calculator">Age Calculator</Link></li>
        <li><Link href="/tools/photo-resizer">Photo Resizer</Link></li>
        <li><Link href="/tools/image-compress">Image Compress</Link></li>
        <li><Link href="/tools/pdf-merge">PDF Merge</Link></li>
        <li><Link href="/tools/pdf-split">PDF Split</Link></li>
        <li><Link href="/tools/password-generator">Password Generator</Link></li>
        <li><Link href="/tools/unit-converter">Unit Converter</Link></li>
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
        <Link href="/tools">Explore All Student Tools →</Link>
      </p>
    </article>
  );
}
