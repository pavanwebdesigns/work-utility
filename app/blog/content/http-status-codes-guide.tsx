import Link from "next/link";

const faqs = [
  {
    question: "What is the difference between HTTP 401 and 403?",
    answer:
      "401 Unauthorized means the request lacks valid authentication credentials — the user is not logged in or the token is missing/expired. 403 Forbidden means the request is authenticated (we know who you are) but you don't have permission to access this resource. If you receive a 401, check your authentication token. If you receive a 403, check user roles and permissions.",
  },
  {
    question: "What is the difference between 301 and 302 redirects?",
    answer:
      "A 301 (Moved Permanently) tells browsers and search engines that the resource has permanently moved to a new URL — the redirect is cached and SEO authority transfers. A 302 (Found/Temporary Redirect) signals a temporary move — browsers don't cache it and SEO authority stays with the original URL. Use 301 for permanent URL changes, 302 for temporary redirects.",
  },
  {
    question: "What does HTTP 429 Too Many Requests mean?",
    answer:
      "429 means you've sent too many requests in a given time period and the server is rate-limiting you. The response should include a Retry-After header indicating when you can retry. Implement exponential backoff in your code: wait 1 second, then 2, then 4, then 8, before retrying.",
  },
  {
    question: "When should an API return 422 vs 400?",
    answer:
      "400 Bad Request is for malformed requests — syntax errors, invalid JSON format, missing required headers. 422 Unprocessable Entity is for requests that are syntactically correct but semantically invalid — for example, a well-formed JSON body where a field value fails business validation (e.g., age is -5). REST APIs increasingly use 422 for validation errors and 400 for format errors.",
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

export default function HttpStatusCodesGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        HTTP status codes tell you what happened with every API request. Use our{" "}
        <Link href="/tools/http-status-codes">HTTP Status Codes Reference</Link>{" "}
        for searchable quick lookup. Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>HTTP Status Code Categories</h2>
      <ul>
        <li><strong>1xx</strong> — Informational (request received, continuing)</li>
        <li><strong>2xx</strong> — Success (request completed)</li>
        <li><strong>3xx</strong> — Redirect (further action needed)</li>
        <li><strong>4xx</strong> — Client error (your request is wrong)</li>
        <li><strong>5xx</strong> — Server error (server failed)</li>
      </ul>

      <hr />

      <h2>Important 2xx Codes</h2>
      <p>
        <strong>200 OK</strong> — standard success. <strong>201 Created</strong> —
        new resource created via POST. <strong>204 No Content</strong> — success
        with no body (common for DELETE).
      </p>

      <hr />

      <h2>Redirect Codes</h2>
      <p>
        <strong>301</strong> permanent (SEO transfers). <strong>302</strong> temporary.
        <strong>307/308</strong> preserve HTTP method (POST stays POST).
      </p>

      <hr />

      <h2>Big 4xx Codes</h2>
      <p>
        400 (bad format), 401 (not authenticated), 403 (not authorized), 404 (not
        found), 422 (validation failed), 429 (rate limited).
      </p>

      <hr />

      <h2>401 vs 403</h2>
      <p>
        401 = no valid credentials. 403 = valid credentials but insufficient
        permissions. The most confused pair in web development.
      </p>

      <hr />

      <h2>5xx Server Errors</h2>
      <p>
        <strong>500</strong> internal server bug. <strong>502</strong> bad gateway
        (proxy can&apos;t reach backend). <strong>503</strong> service unavailable
        (overload/maintenance). <strong>504</strong> gateway timeout.
      </p>

      <hr />

      <h2>Rate Limiting and 429</h2>
      <p>
        Implement exponential backoff. Check Retry-After header. Related:{" "}
        <Link href="/tools/json-formatter">JSON Formatter</Link>,{" "}
        <Link href="/tools/dns-lookup">DNS Lookup</Link>.
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
