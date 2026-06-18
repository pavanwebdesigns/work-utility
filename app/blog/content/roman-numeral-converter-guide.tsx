import Link from "next/link";

const faqs = [
  {
    question: "Why is 4 written as IV instead of IIII?",
    answer:
      "Roman numerals use subtractive notation for certain combinations — placing a smaller numeral before a larger one means subtraction, so IV represents 5-1=4, following the standard convention rather than repeating I four times.",
  },
  {
    question: "What's the largest number you can write in standard Roman numerals?",
    answer:
      "Basic Roman numeral notation practically extends to 3999 (MMMCMXCIX) using the standard symbols — numbers beyond that require special notation not commonly used in everyday contexts.",
  },
  {
    question: "Where are Roman numerals still commonly used today?",
    answer:
      "Movie and event sequels (Super Bowl LVIII), clock faces, formal document section numbering, and royal/papal numbering (like Elizabeth II) are common modern uses.",
  },
  {
    question: "Can all numbers be converted to Roman numerals?",
    answer:
      "Within the standard range (1 to 3999), yes — every whole number has a valid Roman numeral representation using the standard symbol and subtractive notation rules.",
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

export default function RomanNumeralConverterGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Need to convert a number to Roman numerals or decode a Roman numeral back? Use our free{" "}
        <Link href="/tools/roman-numeral-converter">Roman Numeral Converter</Link> for instant, accurate conversion both directions.
      </p>
      <hr />
      <h2>Basic Symbol Values</h2>
      <ul>
        <li><strong>I</strong> = 1</li>
        <li><strong>V</strong> = 5</li>
        <li><strong>X</strong> = 10</li>
        <li><strong>L</strong> = 50</li>
        <li><strong>C</strong> = 100</li>
        <li><strong>D</strong> = 500</li>
        <li><strong>M</strong> = 1000</li>
      </ul>
      <hr />
      <h2>Subtractive Notation</h2>
      <p>
        When a smaller numeral appears before a larger one, it means subtraction — not addition. <strong>IV</strong> = 5 − 1 = 4 (not IIII). <strong>IX</strong> = 9, <strong>XL</strong> = 40, <strong>CM</strong> = 900. This rule is why 4 isn&apos;t written as four I&apos;s and why certain combinations like IL (for 49) are invalid in standard notation.
      </p>
      <hr />
      <h2>Where Roman Numerals Appear Today</h2>
      <p>
        Roman numerals still show up in movie and event sequel numbering (Super Bowl LVIII), clock faces, formal document outlines, monarch and pope numbering (Elizabeth II), and copyright years in film credits. They remain a recognizable shorthand for ordinal numbering in formal contexts.
      </p>
      <hr />
      <h2>Practical Range Limit</h2>
      <p>
        Standard notation has no single symbol beyond M (1000), so large numbers use repeated and combined symbols. The practical ceiling for basic notation is <strong>3999</strong> (MMMCMXCIX). Our converter supports the full 1–3999 range.
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
        See also our{" "}
        <Link href="/blog/useful-text-utility-tools-guide">useful text utility tools guide</Link> and{" "}
        <Link href="/blog/complete-developer-tools-guide">complete developer tools guide</Link>.
      </p>
      <p><Link href="/tools/roman-numeral-converter">Convert Roman Numerals Now →</Link></p>
    </article>
  );
}
