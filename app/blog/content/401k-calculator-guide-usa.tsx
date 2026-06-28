import Link from "next/link";

const faqs = [
  {
    question: "What is the 401k contribution limit for 2026?",
    answer:
      "For 2026, employees under 50 can contribute up to $24,500. Workers aged 50-59 and 64+ can contribute $32,500 (including a $8,000 catch-up). Workers aged 60-63 can contribute up to $35,750 under the SECURE 2.0 Act's super catch-up provision. Employer matching contributions are separate and bring the combined limit to $72,000.",
  },
  {
    question: "How much should I contribute to my 401k?",
    answer:
      "At minimum, contribute enough to capture your full employer match — if your employer matches 50% of contributions up to 6% of salary, you should contribute at least 6%. Beyond that, financial advisors commonly recommend 10-15% of gross salary including the employer match. If you can, maxing out your contribution limit gives the most tax advantage.",
  },
  {
    question: "What is the employer 401k match and why does it matter?",
    answer:
      "An employer match is money your company adds to your 401k — essentially free money. A common structure is \"50% of your contributions up to 6% of salary,\" meaning if you contribute 6%, your employer adds another 3%. Not capturing the full match is equivalent to leaving part of your compensation on the table.",
  },
  {
    question: "What is the SECURE 2.0 super catch-up contribution?",
    answer:
      "Under the SECURE 2.0 Act, workers aged 60-63 can make \"super catch-up\" contributions of an additional $11,250 beyond the base limit in 2026, for a total of $35,750. This window was specifically created for workers who are behind on retirement savings and have a few peak earning years before retirement.",
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

export default function FourOhOneKCalculatorGuideUsaContent() {
  return (
    <article className="prose-custom">
      <p>
        A 401(k) is the primary retirement savings vehicle for US employees,
        offering tax-deferred growth and often employer matching. Use our free{" "}
        <Link href="/tools/401k-calculator">401k Calculator 2026</Link> to project
        your balance at retirement with IRS limits auto-applied. Related:{" "}
        <Link href="/blog/us-paycheck-calculator-guide">US paycheck calculator guide</Link>
        .
      </p>

      <hr />

      <h2>2026 401k Contribution Limits</h2>
      <p>
        Under 50: <strong>$24,500</strong>. Ages 50-59 and 64+: <strong>$32,500</strong>{" "}
        (with $8,000 catch-up). Ages 60-63: <strong>$35,750</strong> (SECURE 2.0 super
        catch-up). Our calculator applies the correct limit based on your age.
      </p>

      <hr />

      <h2>Employer Match — Free Money</h2>
      <p>
        The most important factor in 401k growth is capturing your full employer
        match. A typical structure: 50% match on contributions up to 6% of salary.
        If you earn $75,000 and contribute 6%, you put in $4,500 and your employer
        adds $2,250 — that&apos;s a guaranteed 50% return on those dollars.
      </p>

      <hr />

      <h2>Traditional vs Roth 401k</h2>
      <p>
        <strong>Traditional 401k</strong> contributions reduce taxable income now;
        withdrawals in retirement are taxed. <strong>Roth 401k</strong> uses
        after-tax dollars but withdrawals are tax-free. Roth makes sense if you
        expect higher tax rates in retirement.
      </p>

      <hr />

      <h2>The Power of Starting Early</h2>
      <p>
        A 30-year-old contributing $9,750/year (including match) at 7% return for
        37 years accumulates over $1.5 million. Starting at 40 with the same
        contributions leaves only 27 years — the outcome is dramatically lower.
        Start as early as possible.
      </p>

      <hr />

      <h2>Rule of Thumb: Get the Full Match</h2>
      <p>
        Contribute at least enough to get 100% of your employer match — usually 3-6%
        of salary. Beyond that, aim for 10-15% total (including match) for a
        comfortable retirement.
      </p>

      <hr />

      <h2>401k Benchmarks by Age</h2>
      <p>
        Fidelity suggests: 1× salary saved by 30, 3× by 40, 6× by 50, 8× by 60.
        Use our calculator to see where you stand and what changes would close the gap.
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

      <h2>Related Tools</h2>
      <ul>
        <li><Link href="/tools/w2-vs-1099-calculator">W-2 vs 1099 Calculator</Link></li>
        <li><Link href="/tools/self-employment-tax">Self-Employment Tax Calculator</Link></li>
        <li><Link href="/blog/w2-vs-1099-tax-comparison-guide">W-2 vs 1099 tax comparison</Link></li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/401k-calculator">Calculate 401k Balance Free →</Link>
      </p>
    </article>
  );
}
