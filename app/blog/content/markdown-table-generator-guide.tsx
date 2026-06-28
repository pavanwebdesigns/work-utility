import Link from "next/link";

const faqs = [
  {
    question: "What is the Markdown table syntax?",
    answer:
      "A Markdown table uses pipe characters (|) to separate columns and a row of dashes (---) to separate the header from the data rows. Minimum syntax: | Header 1 | Header 2 | (newline) |---|---| (newline) | Data 1 | Data 2 |. Alignment is added with colons: |:---| for left, |:---:| for center, |---:| for right.",
  },
  {
    question: "How do I add alignment to a Markdown table?",
    answer:
      "Add colons to the separator row (dashes row): |:---| aligns the column left, |:---:| centers it, and |---:| aligns right. Without a colon, the default is left-aligned.",
  },
  {
    question: "Can I convert Excel or CSV data to a Markdown table?",
    answer:
      "Yes — copy your Excel data (which copies as tab-separated values) or any CSV, paste it into the CSV import area, and the tool converts it to a properly formatted Markdown table automatically.",
  },
  {
    question: "Which platforms support Markdown tables?",
    answer:
      "Markdown tables are supported in GitHub (README.md, issues, PRs), GitLab, Bitbucket, Notion, Obsidian, Joplin, VS Code Markdown preview, Jekyll and Hugo static site generators, and many documentation platforms. They are NOT supported in basic Markdown (CommonMark) — table support requires GitHub Flavored Markdown (GFM) or MultiMarkdown.",
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

export default function MarkdownTableGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Markdown tables power documentation on GitHub, Notion, and Obsidian. Use our
        free{" "}
        <Link href="/tools/markdown-table">Markdown Table Generator</Link> with
        visual editor and CSV import. Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>Markdown Table Syntax</h2>
      <pre>
        <code>{`| Name | Age | City |
|------|-----|------|
| Alice | 30 | Mumbai |
| Bob | 25 | Delhi |`}</code>
      </pre>
      <p>
        Three elements: pipe-separated columns, a dash separator row, and data rows.
      </p>

      <hr />

      <h2>Visual Editor vs Manual Typing</h2>
      <p>
        Use the visual grid for small tables. Paste CSV for data exported from
        Excel or Google Sheets.
      </p>

      <hr />

      <h2>Column Alignment</h2>
      <ul>
        <li>Left: <code>|:---|</code></li>
        <li>Center: <code>|:---:|</code></li>
        <li>Right: <code>|---:|</code></li>
      </ul>

      <hr />

      <h2>Converting CSV/Excel to Markdown</h2>
      <p>
        Copy cells from Excel (tab-separated), paste into the CSV mode, and click
        Parse. Related:{" "}
        <Link href="/tools/json-formatter">JSON Formatter</Link>,{" "}
        <Link href="/tools/markdown-to-html">Markdown to HTML</Link>.
      </p>

      <hr />

      <h2>Where Markdown Tables Are Used</h2>
      <p>
        GitHub READMEs, API documentation, Notion pages, Obsidian notes, Jekyll/Hugo
        static sites, and developer wikis.
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
    </article>
  );
}
