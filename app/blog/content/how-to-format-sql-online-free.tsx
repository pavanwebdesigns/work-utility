import Link from "next/link";

const faqs = [
  {
    question: "Does this tool validate my SQL syntax?",
    answer:
      "No — it formats and indents your SQL for readability, but doesn't check for syntax errors or validate against a specific database dialect.",
  },
  {
    question: "Will formatting change how my query executes?",
    answer:
      "No — formatting only changes whitespace, line breaks, and keyword capitalization. The query logic and execution are unaffected.",
  },
  {
    question: "Does this work for all SQL dialects (MySQL, PostgreSQL, SQL Server)?",
    answer:
      "Basic formatting (keyword capitalization, indentation) works across dialects since it doesn't depend on dialect-specific syntax — though very database-specific syntax extensions may not format perfectly.",
  },
  {
    question: "Can I minify SQL instead of formatting it?",
    answer:
      "Yes — toggle to minify mode to collapse a formatted query into a single compact line, useful when you need to paste a query somewhere with line-length constraints.",
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

export default function HowToFormatSqlOnlineFreeContent() {
  return (
    <article className="prose-custom">
      <p>
        A long unformatted SQL query with nested subqueries and joins is hard to scan for logic errors — proper indentation makes the structure visually obvious. Use our free{" "}
        <Link href="/tools/sql-formatter">SQL Formatter</Link> for a quick formatting pass before committing SQL or sharing it in a code review.
      </p>
      <hr />
      <h2>Why Formatted SQL Matters</h2>
      <p>
        During code review and debugging, readability directly affects how quickly you spot mistakes — a missing JOIN condition, an orphaned WHERE clause, or a subquery that returns unexpected rows. Formatting doesn&apos;t fix logic errors, but it makes them easier to see.
      </p>
      <hr />
      <h2>Basic Formatting Conventions</h2>
      <p>
        Common conventions include uppercase keywords (SELECT, FROM, WHERE), each major clause on its own line, and indented conditions under WHERE, AND, and OR. Our formatter applies these patterns as a readability pass — not as a SQL linter.
      </p>
      <hr />
      <h2>Format Before You Commit or Share</h2>
      <p>
        Use this as a quick cleanup step before committing SQL to a codebase or pasting a query into a pull request comment. It&apos;s not a substitute for testing your query against your actual database.
      </p>
      <hr />
      <h2>Related Developer Tools</h2>
      <p>
        See our <Link href="/blog/complete-developer-tools-guide">Complete Developer Tools Guide</Link> for JSON formatting, encoding tools, and more.
      </p>
      <p>
        Also read: <Link href="/blog/how-to-format-json-online-free">how to format JSON online free</Link>.
      </p>
      <hr />
      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {faqs.map((faq) => (
        <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>
      ))}
      <hr />
      <p><Link href="/tools/sql-formatter">Format SQL Now →</Link></p>
    </article>
  );
}
