import Link from "next/link";

const faqs = [
  {
    question: "What does `0 9 * * 1-5` mean in cron?",
    answer:
      "It runs at 9:00 AM every weekday (Monday through Friday). The fields are Minute (0), Hour (9), Day of Month (*=any), Month (*=any), Day of Week (1-5=Monday to Friday).",
  },
  {
    question: "What's the difference between `*/5` and `0,5,10,15...` in a cron expression?",
    answer:
      "Both can produce similar schedules, but `*/5` means \"every 5 minutes starting from 0\" and will fire at 0, 5, 10...55. An explicit list gives you more control over exactly which minutes are included.",
  },
  {
    question: "Why does my cron job run at the wrong time?",
    answer:
      "Cron uses the server's system timezone, not your local timezone — if your server runs on UTC and you expected 9 AM IST, you'd need to set the job for 3:30 AM UTC instead (IST is UTC+5:30).",
  },
  {
    question: "Does this generator work for AWS EventBridge or Kubernetes cron?",
    answer:
      "Standard 5-field cron syntax (what this tool generates) is compatible with most Linux systems and many cloud schedulers. AWS EventBridge uses a 6-field format with a seconds field — note this if you're targeting AWS specifically.",
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

export default function CronExpressionGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Cron expressions power scheduled tasks across Linux servers, CI/CD pipelines, and cloud schedulers — but the syntax is easy to get wrong. Use our free{" "}
        <Link href="/tools/cron-generator">Cron Expression Generator</Link> to build schedules visually, see a human-readable description, and preview the next 5 run times.
      </p>
      <hr />
      <h2>What Is a Cron Expression?</h2>
      <p>
        A cron expression is a compact string that defines when a scheduled task should run. Cron is used everywhere: Linux/Unix crontab jobs, database backups, server maintenance scripts, CI/CD pipelines, AWS EventBridge, Google Cloud Scheduler, and Kubernetes CronJobs. Instead of memorizing field syntax, a visual builder lets you configure schedules and verify the output instantly.
      </p>
      <hr />
      <h2>The 5 Fields of Standard Cron</h2>
      <p>A standard Unix cron expression has five space-separated fields:</p>
      <ol>
        <li><strong>Minute</strong> (0–59)</li>
        <li><strong>Hour</strong> (0–23)</li>
        <li><strong>Day of Month</strong> (1–31)</li>
        <li><strong>Month</strong> (1–12)</li>
        <li><strong>Day of Week</strong> (0–7, where 0 and 7 are Sunday)</li>
      </ol>
      <p>Special characters include <code>*</code> (every), <code>/</code> (intervals like <code>*/5</code> for every 5 minutes), <code>-</code> (ranges like <code>1-5</code>), and <code>,</code> (lists like <code>1,3,5</code>).</p>
      <hr />
      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Timezone mismatch</strong> — cron uses the server&apos;s local timezone, not yours. A job set for 9 AM on a UTC server is 2:30 PM IST.</li>
        <li><strong>Day of Month vs Day of Week</strong> — in some cron implementations, when both fields are specified (neither is <code>*</code>), the behavior can be non-obvious. Test your expression before deploying.</li>
        <li><strong>6-field cron</strong> — AWS EventBridge and some Kubernetes setups add a seconds field at the start. Standard Linux crontab uses 5 fields.</li>
      </ul>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide 2026</Link>
        </li>
      </ul>
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
      <p><Link href="/tools/cron-generator">Build a Cron Expression Now →</Link></p>
    </article>
  );
}
