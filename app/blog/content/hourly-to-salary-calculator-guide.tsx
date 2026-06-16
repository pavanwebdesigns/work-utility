import Link from "next/link";

const faqs = [
  {
    question: "How many work hours are there in a year?",
    answer:
      "The common baseline is 2,080 hours (40 hours/week × 52 weeks), but this varies based on your actual paid weeks, part-time schedules, or overtime arrangements.",
  },
  {
    question: "Does this calculation include taxes?",
    answer:
      "No, this is a gross-to-gross conversion (before tax). Take-home pay will be lower after applicable income tax and deductions.",
  },
  {
    question: "Is overtime pay included in the standard formula?",
    answer:
      "No — the standard formula assumes regular hours only. If you regularly work overtime, calculate that separately at your applicable overtime rate.",
  },
  {
    question:
      "How do I compare a freelance hourly rate to a full-time salaried offer fairly?",
    answer:
      "Account for the value of benefits (health insurance, paid leave, retirement contributions) that salaried roles typically include but freelance hourly rates don't, since these add real value beyond the raw hourly number.",
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

export default function HourlyToSalaryCalculatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Whether you&apos;re comparing a freelance hourly rate to a full-time
        offer, or a US-based hourly job to an annual figure, the conversion is
        more nuanced than just multiplying by a flat number of work-hours per
        year — actual working weeks, paid time off, and overtime assumptions all
        change the real answer. For Indian salaried employees comparing CTC to
        take-home pay, read{" "}
        <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc">
          How to calculate in-hand salary from CTC
        </Link>
        . Browse all finance guides in our{" "}
        <Link href="/blog/complete-salary-tax-guide-india">
          Complete Salary &amp; Tax Guide
        </Link>
        .
      </p>

      <hr />

      <h2>The Basic Formula</h2>

      <p>
        The standard baseline: hourly rate × hours per week × weeks per year.
        For a typical full-time US schedule (40 hours/week, 52 weeks/year),
        that&apos;s hourly rate × 2,080. But this baseline assumes you work all
        52 weeks with no unpaid time off — if you get 2 weeks of unpaid leave,
        your real working weeks are 50, not 52, which changes your effective
        annual figure.
      </p>

      <hr />

      <h2>Why This Matters for Freelancers and Contractors</h2>

      <p>
        If you&apos;re quoting an hourly rate as a freelancer, remember that
        annual salary employees typically get paid time off, holidays, and
        benefits that you may need to price into your hourly rate separately,
        since &quot;hourly × hours worked&quot; is all you actually get paid for
        — there&apos;s no equivalent of paid leave unless you build it into your
        rate.
      </p>

      <hr />

      <h2>Going the Other Direction: Salary to Hourly</h2>

      <p>
        If you have an annual salary and want to know your effective hourly
        rate, the same logic works in reverse — divide your salary by your
        actual annual working hours. This is useful for comparing a salaried
        offer against an hourly contract offer apples-to-apples, especially when
        one role has significantly more unpaid overtime expectations than the
        other.
      </p>

      <hr />

      <h2>Worked Example</h2>

      <p>
        At $25/hour, 40 hours/week, 52 weeks/year: $25 × 40 × 52 = $52,000/year.
        But if that job only guarantees 48 paid weeks (4 weeks unpaid leave), the
        realistic annual figure drops to $48,000. The{" "}
        <Link href="/tools/hourly-to-salary">Hourly to Salary Calculator</Link>{" "}
        lets you toggle between standard and custom week/hour assumptions, and
        switch direction (hourly-to-annual or annual-to-hourly) instantly, with
        a side-by-side grid across common pay periods (hourly, daily, weekly,
        monthly, annual).
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
          <Link href="/blog/how-to-calculate-in-hand-salary-from-ctc">
            How to Calculate In-Hand Salary from CTC
          </Link>
        </li>
        <li>
          <Link href="/blog/complete-salary-tax-guide-india">
            Complete Salary &amp; Tax Guide for Indian Employees
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/hourly-to-salary">
          Convert Hourly to Annual Salary →
        </Link>
      </p>
    </article>
  );
}
