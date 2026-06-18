import Link from "next/link";

const faqs = [
  {
    question: "How is GPA calculated?",
    answer:
      "Each letter grade converts to a grade point (e.g. A=4.0, B=3.0), multiplied by that course's credit hours, summed across all courses, then divided by total credit hours — giving a credit-weighted average.",
  },
  {
    question: "What's the difference between weighted and unweighted GPA?",
    answer:
      "Unweighted GPA treats every course equally regardless of credit hours or difficulty. Weighted GPA (what most colleges use) factors in credit hours, and some high schools additionally weight by course difficulty (AP/Honors courses count for more).",
  },
  {
    question: "Does a B+ always equal 3.3 grade points?",
    answer:
      "This is the most common standard mapping, though some institutions use slightly different scales — check your specific school's grading policy if precision matters for an official record.",
  },
  {
    question: "Can I calculate GPA across multiple semesters?",
    answer:
      "Yes — add all courses from every semester you want included; the calculator will compute a single cumulative weighted GPA across everything entered.",
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

export default function GpaCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Need to calculate your GPA on the standard 4.0 scale? Use our free{" "}
        <Link href="/tools/gpa-calculator">GPA Calculator</Link> to add courses, grades, and credit hours and get your weighted GPA instantly.
      </p>
      <hr />
      <h2>The Standard 4.0 GPA Scale</h2>
      <p>Most US colleges use this letter-grade-to-point mapping:</p>
      <ul>
        <li><strong>A / A+:</strong> 4.0</li>
        <li><strong>A-:</strong> 3.7</li>
        <li><strong>B+:</strong> 3.3</li>
        <li><strong>B:</strong> 3.0</li>
        <li><strong>B-:</strong> 2.7</li>
        <li><strong>C+:</strong> 2.3</li>
        <li><strong>C:</strong> 2.0</li>
        <li><strong>C-:</strong> 1.7</li>
        <li><strong>D+:</strong> 1.3</li>
        <li><strong>D:</strong> 1.0</li>
        <li><strong>D-:</strong> 0.7</li>
        <li><strong>F:</strong> 0.0</li>
      </ul>
      <hr />
      <h2>Weighted vs Unweighted GPA</h2>
      <p>
        <strong>Weighted GPA</strong> (what this calculator computes) accounts for credit hours — a 4-credit course affects your GPA more than a 1-credit course. Most college GPAs are credit-weighted. <strong>Unweighted GPA</strong> treats every course equally regardless of credits.
      </p>
      <p>
        Some high schools use a different kind of weighting — AP or Honors courses may count for more than standard courses on a 5.0 scale. That is separate from credit-hour weighting and not what this tool calculates.
      </p>
      <hr />
      <h2>Worked Example</h2>
      <p>Three courses:</p>
      <ul>
        <li>Calculus (4 credits, A = 4.0) → 16.0 grade points</li>
        <li>History (3 credits, B+ = 3.3) → 9.9 grade points</li>
        <li>English (3 credits, A- = 3.7) → 11.1 grade points</li>
      </ul>
      <p>
        Total: 37.0 grade points ÷ 10 credit hours = <strong>3.70 GPA</strong>.
      </p>
      <hr />
      <h2>Indian Students: CGPA vs GPA</h2>
      <p>
        This tool uses the US 4.0 letter-grade pattern. Indian students working with CGPA should use our{" "}
        <Link href="/tools/cgpa-to-percentage">CGPA to Percentage</Link> converter instead — see our guide on{" "}
        <Link href="/blog/cgpa-to-percentage-for-job-applications">CGPA to percentage for job applications</Link>.
      </p>
      <hr />
      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
      <hr />
      <p>
        Browse more student tools in our{" "}
        <Link href="/blog/complete-student-tools-guide-india">complete student tools guide</Link>.
      </p>
      <p><Link href="/tools/gpa-calculator">Calculate Your GPA Now →</Link></p>
    </article>
  );
}
