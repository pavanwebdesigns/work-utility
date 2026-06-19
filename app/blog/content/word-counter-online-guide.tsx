import Link from "next/link";

const faqs = [
  {
    question: "How accurate is the word count?",
    answer:
      "The tool counts whitespace-separated tokens the same way Microsoft Word and Google Docs do — dates with slashes and currency amounts with symbols count as one word each.",
  },
  {
    question: "What counts as a sentence?",
    answer:
      "The tool splits on terminal punctuation (period, question mark, exclamation mark) — a paragraph with no punctuation reads as a single sentence.",
  },
  {
    question: "What are stop words in keyword density?",
    answer:
      'Common words like "the", "a", "is", "in" are excluded from keyword density analysis since they appear in almost every text and don\'t reflect the actual topics covered.',
  },
  {
    question: "Why do reading time and speaking time differ?",
    answer:
      "Reading speed averages around 200 words per minute silently; speaking aloud is slower at around 130 words per minute — so a 1,000-word piece takes about 5 minutes to read but nearly 8 minutes to speak.",
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

export default function WordCounterOnlineGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Need instant word and character counts while you write? Our free{" "}
        <Link href="/tools/word-counter">Word Counter</Link> updates in real time
        — words, characters (with and without spaces), sentences, paragraphs,
        lines, reading time, speaking time, keyword density, and social media
        platform limits. No signup, everything runs in your browser.
      </p>
      <hr />
      <h2>What This Word Counter Does</h2>
      <ul>
        <li><strong>Core counts</strong> — words, characters, sentences, paragraphs, and lines</li>
        <li><strong>Reading time</strong> — estimated at 200 words per minute for articles and blogs</li>
        <li><strong>Speaking time</strong> — estimated at 130 words per minute for presentations and speeches</li>
        <li><strong>Keyword density</strong> — top 10 most-used words (stop words excluded) with count and percentage</li>
        <li><strong>Platform limits</strong> — progress bars for Twitter/X, LinkedIn, Meta descriptions, Instagram captions, and SMS</li>
      </ul>
      <hr />
      <h2>Use Cases</h2>
      <p><strong>Students</strong> — hit essay word limits without manually counting. Pair with our{" "}
        <Link href="/blog/complete-student-tools-guide-india">Complete Student Tools Guide India</Link> for exam prep.
      </p>
      <p><strong>Content writers</strong> — track article length and keyword usage while drafting SEO content. See also our{" "}
        <Link href="/tools/keyword-density">Keyword Density Checker</Link>.
      </p>
      <p><strong>Social media managers</strong> — check character counts against Twitter/X (280), LinkedIn (3,000), Instagram (2,200), and Meta description (160) limits before posting.</p>
      <p><strong>Professionals</strong> — keep emails and reports concise with live character and word counts. Use our{" "}
        <Link href="/tools/character-counter">Character Counter</Link> for character-focused limits.
      </p>
      <hr />
      <h2>Reading Time vs Speaking Time</h2>
      <p>
        <strong>Reading time</strong> assumes silent reading at ~200 words per minute — useful for blog posts, newsletters, and article length estimates shown to readers.
      </p>
      <p>
        <strong>Speaking time</strong> assumes aloud delivery at ~130 words per minute — useful for presentations, podcasts, wedding speeches, and video scripts where pauses and emphasis slow the pace.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/complete-student-tools-guide-india">Complete Student Tools Guide India</Link>
        </li>
        <li>
          <Link href="/blog/word-count-for-upsc-essay-writing">Word Count for UPSC Essay Writing</Link>
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
      <p>
        <Link href="/tools/word-counter">Count Words Online Now →</Link>
      </p>
    </article>
  );
}
