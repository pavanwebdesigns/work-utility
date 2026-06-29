import Link from "next/link";

const faqs = [
  {
    question: "What is JSON Schema used for?",
    answer:
      "JSON Schema is a vocabulary for describing and validating the structure of JSON data. It is used in REST API request/response validation, configuration file linting, form validation, and OpenAPI/Swagger documentation to ensure data conforms to expected types, formats, and constraints.",
  },
  {
    question: "What is the difference between Draft 7 and Draft 2020-12?",
    answer:
      "Draft 7 is the most widely supported version and is compatible with OpenAPI 3.0. Draft 2020-12 is the latest standard with improved keywords like $dynamicRef for recursive schemas. Use Draft 7 for maximum compatibility; use 2020-12 for new projects that need advanced features.",
  },
  {
    question: "Why does valid JSON fail schema validation?",
    answer:
      "Syntax-valid JSON can still fail validation if the data does not match the schema — wrong types (string instead of integer), missing required fields, values outside allowed ranges, or format mismatches (invalid email). The validator pinpoints exactly which field and rule failed.",
  },
  {
    question: "How do I mark a field as required in JSON Schema?",
    answer:
      'Add a required array at the same level as properties. Example: { "type": "object", "properties": { "name": { "type": "string" } }, "required": ["name"] }. Fields not listed in required are optional.',
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

export default function JsonSchemaValidatorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        JSON Schema lets you define the expected shape of JSON data and catch
        structural errors before they reach production. Use our free{" "}
        <Link href="/tools/json-schema-validator">JSON Schema Validator</Link>{" "}
        to test schemas and data in real time with plain-English error messages.
        Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>What Is JSON Schema?</h2>
      <p>
        JSON Schema is a JSON-based format for describing JSON documents. It
        specifies types, required fields, string formats (email, date, URI),
        numeric ranges, array lengths, and nested object structures. APIs use it
        to validate incoming requests and outgoing responses automatically.
      </p>

      <hr />

      <h2>Common Use Cases</h2>
      <ul>
        <li>
          <strong>API development</strong> — validate request bodies against
          OpenAPI schemas before deployment.
        </li>
        <li>
          <strong>Configuration files</strong> — ensure CI/CD configs and app
          settings have all required keys.
        </li>
        <li>
          <strong>Form validation</strong> — share one schema between frontend
          and backend for consistent rules.
        </li>
        <li>
          <strong>Schema design</strong> — test schemas with sample data before
          publishing to consumers.
        </li>
      </ul>

      <hr />

      <h2>Draft 7 vs Draft 2020-12</h2>
      <p>
        Our validator supports both drafts. <strong>Draft 7</strong> works with
        most existing schemas and OpenAPI 3.0 specs.{" "}
        <strong>Draft 2020-12</strong> adds $dynamicRef for complex recursive
        schemas and prefixItems for tuple validation. Select the draft that
        matches your schema&apos;s $schema declaration.
      </p>

      <hr />

      <h2>Reading Validation Errors</h2>
      <p>
        When validation fails, the tool shows the JSON path (e.g.{" "}
        <code>data.email</code>), the raw AJV message, and a plain-English
        explanation — like &quot;The value must be a valid email address&quot;
        or &quot;The &apos;name&apos; field is required but missing.&quot; This
        makes debugging faster than parsing cryptic parser output.
      </p>

      <hr />

      <h2>Valid JSON vs Valid Schema Data</h2>
      <p>
        A common mistake is assuming well-formed JSON automatically passes
        validation. <code>{`{"age": "28"}`}</code> is valid JSON but fails a
        schema requiring <code>age</code> to be an integer. Always check both
        JSON syntax (with our{" "}
        <Link href="/tools/json-formatter">JSON Formatter</Link>) and schema
        conformance separately.
      </p>

      <hr />

      <h2>JSON Schema in API Development</h2>
      <p>
        REST APIs often return structured error responses with HTTP status codes.
        Pair schema validation with our{" "}
        <Link href="/tools/http-status-codes">HTTP Status Codes</Link> reference
        when designing API contracts and error payloads.
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

      <p>
        <Link href="/tools/json-schema-validator">
          Validate JSON Schema Free →
        </Link>
      </p>
    </article>
  );
}
