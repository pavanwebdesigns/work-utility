import Link from "next/link";

const faqs = [
  {
    question: "Are passphrases more secure than random passwords?",
    answer:
      "A 4-word passphrase from a large wordlist has very high entropy and is considerably harder to crack than many short random passwords — and far easier to remember and type.",
  },
  {
    question: "How many words should a passphrase have?",
    answer:
      "4 words provides strong security for most purposes; 5-6 words is excellent for high-value accounts like email or password manager master passwords.",
  },
  {
    question: "Can I use a passphrase as my password manager master password?",
    answer:
      "Yes — a long, memorable passphrase is one of the best choices for a master password since it's both high-entropy and easy to remember without writing it down.",
  },
  {
    question: "What separates a good passphrase from a bad one?",
    answer:
      "True randomness in word selection matters most — a phrase you made up yourself is far less random than words chosen by a generator, since humans tend toward predictable patterns.",
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

export default function PassphraseGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        Need a password you can actually remember without sacrificing security?
        A passphrase generator creates random word combinations like{" "}
        <strong>correct-horse-battery-staple</strong> — high entropy, low
        frustration. Use our free{" "}
        <Link href="/tools/password-generator">Password Generator</Link> in
        Passphrase mode to create one instantly in your browser.
      </p>

      <hr />

      <h2>Why Passphrases Can Beat Random Character Passwords</h2>

      <p>
        Security is about total entropy, not just how random individual
        characters look. A 16-character password mixing letters, numbers, and
        symbols is strong — but a 4-word passphrase drawn from a 1,000-word
        list has roughly 40 bits of entropy per word, or about 160 bits total.
        That is comparable to or better than many random passwords people
        actually use in practice.
      </p>

      <p>
        The famous XKCD #936 comic illustrated this perfectly: four common words
        chosen at random are easier to memorize and type than a mangled string
        like <strong>Tr0ub4dor&amp;3</strong>, yet harder for attackers to
        guess because the search space is enormous.
      </p>

      <hr />

      <h2>Passphrase vs Random Password — When to Use Each</h2>

      <ul>
        <li>
          <strong>Use a passphrase</strong> for master passwords, WiFi passwords
          you type often, and accounts where memorization matters.
        </li>
        <li>
          <strong>Use a random password</strong> for website logins stored in a
          password manager, API keys, and one-time credentials you will copy-paste.
        </li>
        <li>
          <strong>Use 5–6 words</strong> for email, banking, and password manager
          vaults; 4 words is fine for most everyday accounts.
        </li>
      </ul>

      <hr />

      <h2>How Word Count Affects Security</h2>

      <p>
        Each additional random word multiplies the number of possible
        combinations. Moving from 3 to 4 words does not add a little security —
        it multiplies the attack space by roughly 1,000 (with a 1,000-word list).
        That is why 4+ words is the standard recommendation for passphrases today.
      </p>

      <hr />

      <h2>Generate a Passphrase Free Online</h2>

      <p>
        Open the{" "}
        <Link href="/tools/password-generator">Password Generator</Link>, switch
        to <strong>Passphrase</strong> mode, choose word count and separator,
        and click Generate. Everything runs client-side — nothing is stored or
        sent to a server. For random character passwords and strength checking,
        see our{" "}
        <Link href="/blog/how-to-create-strong-password-guide">
          strong password guide
        </Link>
        .
      </p>

      <hr />

      <h2>Frequently Asked Questions</h2>

      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <hr />

      <p>
        <Link href="/tools/password-generator">Generate a Passphrase Now →</Link>
      </p>
    </article>
  );
}
