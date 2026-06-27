import Link from "next/link";

const faqs = [
  {
    question: "Is the random number truly random?",
    answer:
      "Browser-based generators use the crypto.getRandomValues() API for cryptographically secure randomness — far more random than rolling a die or shuffling a deck manually, and suitable for giveaways, games, and any fairness-critical application.",
  },
  {
    question: "Can the same number appear twice?",
    answer:
      'By default yes (with replacement). Enable "No repeats" to generate unique numbers only — useful for picking lottery numbers, assigning roles, or running draws where each participant can only win once.',
  },
  {
    question: "How do I pick a winner from a numbered list for a giveaway?",
    answer:
      "Assign each participant a number (1, 2, 3...), set the range from 1 to the total number of participants, and generate one random number. The participant with that number wins. For multiple prizes, generate multiple unique numbers with \"No repeats\" enabled.",
  },
  {
    question: "What's the difference between random number generators and dice?",
    answer:
      "A well-implemented digital random number generator has equal probability for every outcome and no physical bias (unlike dice that can be slightly weighted or worn). For fair decision-making, a digital generator is generally more reliable than physical dice.",
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

export default function RandomNumberGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Need to pick a giveaway winner, decide who goes first in a game, or
        generate test data? A random number generator (RNG) produces unbiased
        integers within any range you set. Our free{" "}
        <Link href="/tools/random-number">Random Number Generator</Link> supports
        single numbers, lists, dice rolls, and UUIDs — all in your browser with
        no signup.
      </p>

      <hr />

      <h2>How Random Numbers Work on a Computer</h2>

      <p>
        Computers do not produce true randomness from thin air — they use{" "}
        <strong>pseudo-random number generators (PRNGs)</strong> or
        cryptographically secure APIs that produce sequences statistically
        indistinguishable from true randomness for practical purposes. Browser
        tools typically rely on <code>Math.random()</code> or{" "}
        <code>crypto.getRandomValues()</code> depending on the use case. For
        giveaways and classroom picks, either is far more fair than human
        guessing.
      </p>

      <hr />

      <h2>With Replacement vs No Repeats</h2>

      <p>
        <strong>With replacement</strong> (default): the same number can appear
        multiple times — like rolling a die repeatedly. <strong>Without
        replacement / no repeats</strong>: each number is drawn once from the
        pool, like picking tickets from a bowl without putting them back. Enable
        no repeats when assigning unique roles, lottery numbers, or multiple
        distinct winners.
      </p>

      <hr />

      <h2>Common Ranges and Use Cases</h2>

      <ul>
        <li>
          <strong>1–6</strong> — virtual dice for board games
        </li>
        <li>
          <strong>1–52</strong> — card deck position
        </li>
        <li>
          <strong>1–100</strong> — generic picker, classroom activities
        </li>
        <li>
          <strong>Custom range</strong> — numbered participant lists for
          giveaways
        </li>
      </ul>

      <p>
        Teachers use random picks for student participation; event hosts assign
        each entrant a number and generate one winner; developers generate sample
        IDs and test data. For standard unique identifiers in apps, see our{" "}
        <Link href="/tools/uuid-generator">UUID Generator</Link> and{" "}
        <Link href="/blog/uuid-generator-guide">UUID generator guide</Link>.
      </p>

      <hr />

      <h2>Fairness and Bias</h2>

      <p>
        A well-implemented RNG gives every number in the range an equal
        probability. Bias can occur when the range does not divide evenly into the
        generator&apos;s output space, but modern browser implementations handle
        this correctly for integer ranges used in everyday applications.
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
          <Link href="/blog/uuid-generator-guide">
            UUID Generator Guide — When to Use UUIDs
          </Link>
        </li>
        <li>
          <Link href="/tools/uuid-generator">UUID Generator Tool</Link>
        </li>
        <li>
          <Link href="/blog/best-free-calculators-for-students-2026">
            Best Free Calculators for Students 2026
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/random-number">
          Generate Random Numbers Free →
        </Link>
      </p>
    </article>
  );
}
