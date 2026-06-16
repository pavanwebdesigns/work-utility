import Link from "next/link";

const faqs = [
  {
    question: "Does India observe Daylight Saving Time?",
    answer:
      "No. India Standard Time stays fixed at UTC+5:30 all year round, unlike the US and most of Europe, which shift their clocks twice a year for Daylight Saving Time.",
  },
  {
    question:
      "Why is India's time zone offset by 30 minutes instead of a whole hour?",
    answer:
      "India Standard Time (UTC+5:30) uses a half-hour offset rather than a whole-hour one — one of several countries worldwide that use non-whole-hour time zone offsets.",
  },
  {
    question: "How do I avoid scheduling mistakes across time zones?",
    answer:
      "Always check a live time zone converter right before sending a meeting invite, rather than relying on a time difference you calculated previously — Daylight Saving Time transitions can silently shift that difference during part of the year.",
  },
  {
    question: "What is UTC and why does it matter for scheduling?",
    answer:
      "UTC (Coordinated Universal Time) is the global reference time zone that all other time zones are expressed as an offset from. Most calendar and scheduling tools use UTC internally, even when showing you a local time.",
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

export default function TimeZoneConverterGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Scheduling a call across countries should be simple, but manual timezone
        math fails more often than most people admit — especially when Daylight
        Saving Time is involved. Use our free{" "}
        <Link href="/tools/timezone-converter">Time Zone Converter</Link> to
        confirm times before sending a calendar invite. Remote and distributed
        dev teams will also find related tools in our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>Why Manual Time Zone Math Goes Wrong</h2>
      <p>
        Three factors trip people up constantly. First,{" "}
        <strong>half-hour and quarter-hour offsets</strong> — India Standard Time
        is UTC+5:30, not a clean hour offset, so mental math from &quot;5 hours
        ahead of London&quot; breaks down quickly. Second,{" "}
        <strong>Daylight Saving Time</strong> — countries like the US shift
        their clocks twice a year while India does not, so the gap between
        locations changes seasonally. Third, <strong>date-line confusion</strong>{" "}
        — a meeting at 11 p.m. in one city can be the next morning in another,
        and a simple hour subtraction misses that entirely.
      </p>

      <hr />

      <h2>Scheduling Calls Across Distributed Teams</h2>
      <p>
        The most common real-world use case is coordinating standups or client
        calls across countries. For example, a team with members in India and
        the US must account for a time difference that itself changes part of
        the year — the US shifts for Daylight Saving Time while India stays at
        UTC+5:30 year-round. A standup that worked at 9 a.m. IST / 10:30 p.m.
        EST in winter may need to shift when the US springs forward. A live{" "}
        <Link href="/tools/timezone-converter">Time Zone Converter</Link>{" "}
        removes the guesswork.
      </p>

      <hr />

      <h2>UTC as the Global Reference Point</h2>
      <p>
        All time zones are commonly expressed as an offset from UTC (Coordinated
        Universal Time) — the global reference that does not shift for DST.
        Calendar apps and scheduling tools often store times as UTC internally,
        then display your local time on screen. Understanding UTC helps explain
        why a meeting invite might show a different local time than you expected
        if your calendar zone settings are wrong.
      </p>

      <hr />

      <h2>The Daylight Saving Time Complication</h2>
      <p>
        Countries like the US and most of Europe shift their clocks forward and
        back across the year. That means the time difference to a non-DST
        country like India is not constant year-round — it changes by an hour
        during part of the year. This is one of the most common sources of
        &quot;we scheduled it wrong&quot; meeting mistakes, because the offset you
        memorized three months ago may no longer be correct.
      </p>

      <hr />

      <h2>Practical Tip: Confirm Before You Send the Invite</h2>
      <p>
        Always confirm both parties&apos; local time using a live converter right
        before sending a calendar invite, rather than relying on a time
        difference you calculated months ago. DST transitions silently shift
        that difference — checking takes 30 seconds and prevents the awkward
        &quot;sorry, wrong time&quot; follow-up email.
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
          <Link href="/blog/pomodoro-technique-timer-guide">
            The Pomodoro Technique — 25-Minute Focus Timer
          </Link>
        </li>
        <li>
          <Link href="/blog/online-stopwatch-guide">
            Online Stopwatch with Lap Timer
          </Link>
        </li>
        <li>
          <Link href="/blog/complete-developer-tools-guide">
            Complete Developer Tools Guide 2026
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/timezone-converter">
          Convert Time Zones Now →
        </Link>
      </p>
    </article>
  );
}
