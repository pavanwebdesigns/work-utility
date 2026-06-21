import Link from "next/link";

const faqs = [
  {
    question: "Can I decode a JWT without the secret key?",
    answer:
      "Yes — decoding only requires reading the Base64-encoded header and payload, which requires no key. Verifying the signature (confirming the token is genuine) does require the secret/private key.",
  },
  {
    question: "Is JWT payload data encrypted?",
    answer:
      "No, it's only Base64-encoded, which is trivially reversible — never put sensitive secret data in a JWT payload, since anyone holding the token can read its contents.",
  },
  {
    question:
      "Why does my JWT decoder show valid data even for an expired or invalid token?",
    answer:
      "Decoding always reads the token's contents — but WorkUtilities JWT Decoder also checks the exp claim and shows expired/valid badges. Signature verification requires your secret or public key; without it, the tool shows decoded claims but cannot confirm the token is genuine.",
  },
  {
    question: "What's the difference between a JWT and a session cookie?",
    answer:
      "A JWT is self-contained (the server can verify it without a database lookup, since the data and signature travel with the token). A traditional session cookie just holds an ID that the server looks up in a session store.",
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

export default function HowToDecodeJwtTokenOnlineContent() {
  return (
    <article className="prose-custom">
      <p>
        JWTs (JSON Web Tokens) power authentication in most modern web and mobile
        apps, but the actual structure of a JWT — and what&apos;s safe to do with
        one — confuses a lot of developers debugging an auth issue for the first
        time. Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>The 3 Parts of a JWT</h2>
      <p>
        A JWT has the structure <code>header.payload.signature</code>:
      </p>
      <ul>
        <li>
          <strong>Header</strong> — algorithm and token type (e.g. HS256, RS256).
        </li>
        <li>
          <strong>Payload</strong> — claims and data: user ID, expiry, roles,
          etc.
        </li>
        <li>
          <strong>Signature</strong> — cryptographic proof the token wasn&apos;t
          tampered with, generated using a secret key the server holds.
        </li>
      </ul>

      <hr />

      <h2>Decoding vs Verifying</h2>
      <p>
        &quot;Decoding&quot; a JWT (reading the header/payload) requires no secret
        key — anyone can do it, since the payload is only Base64-encoded, not
        encrypted. &quot;Verifying&quot; a JWT (confirming the signature is valid
        and the token is genuine, not forged) requires the secret or public key.
        WorkUtilities JWT Decoder does both: it decodes instantly and can verify
        signatures when you provide your key.
      </p>

      <hr />

      <h2>Signature Verification (Client-Side)</h2>
      <p>
        The{" "}
        <Link href="/tools/jwt-decoder">JWT Decoder</Link> supports signature
        verification for common algorithms — HMAC (HS256, HS384, HS512), RSA
        (RS256, RS384, RS512, PS256), and ECDSA (ES256, ES384, ES512). The
        algorithm is auto-detected from the token header.
      </p>
      <ul>
        <li>
          <strong>HMAC (HS*)</strong> — paste your shared secret. Toggle
          &quot;base64 encoded&quot; if your secret is stored as Base64.
        </li>
        <li>
          <strong>RSA / ECDSA (RS*, ES*, PS*)</strong> — paste the public key in
          PEM format (<code>-----BEGIN PUBLIC KEY-----</code>).
        </li>
      </ul>
      <p>
        Verification runs entirely in your browser using the Web Crypto API —
        your secret never leaves the page. You&apos;ll see ✅ Signature Verified
        or ❌ Invalid Signature. If no key is provided, the tool still decodes
        the token and shows an informational message to add a key.
      </p>

      <hr />

      <h2>Claims Explainer</h2>
      <p>
        Standard JWT claims use short keys. The decoder shows both the key and
        its expanded name, similar to jwt.io:
      </p>
      <ul>
        <li>
          <code>iss</code> — Issuer (who created the token)
        </li>
        <li>
          <code>sub</code> — Subject (who the token is about)
        </li>
        <li>
          <code>aud</code> — Audience (intended recipient)
        </li>
        <li>
          <code>exp</code> — Expiration Time (when the token expires)
        </li>
        <li>
          <code>nbf</code> — Not Before (token not valid before this time)
        </li>
        <li>
          <code>iat</code> — Issued At (when the token was created)
        </li>
        <li>
          <code>jti</code> — JWT ID (unique token identifier)
        </li>
      </ul>
      <p>
        Timestamp claims (<code>exp</code>, <code>iat</code>, <code>nbf</code>)
        show both the Unix timestamp and a human-readable date. When{" "}
        <code>exp</code> is present, the payload panel shows a green valid badge
        or red expired badge with time remaining.
      </p>

      <hr />

      <h2>Never Put Secret Data in the Payload</h2>
      <p>
        Since the payload is just Base64-encoded (readable by anyone holding the
        token), JWTs should only contain non-sensitive claims (user ID, role,
        expiry) — never passwords, SSNs, or anything that needs to stay
        confidential.
      </p>

      <hr />

      <h2>Common Debugging Use Case</h2>
      <p>
        Check token expiry (<code>exp</code> claim) when debugging &quot;why am
        I getting logged out&quot; or &quot;why is my API call returning
        401&quot; issues. The decoded payload reveals this instantly. Use the{" "}
        <Link href="/tools/jwt-decoder">JWT Decoder</Link> — the payload itself
        is JSON; see also{" "}
        <Link href="/blog/how-to-format-json-online-free">
          How to format JSON online free
        </Link>
        .
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
          <Link href="/blog/complete-developer-tools-guide">
            Complete Developer Tools Guide 2026
          </Link>
        </li>
        <li>
          <Link href="/blog/how-to-format-json-online-free">
            How to Format and Validate JSON Online Free
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/jwt-decoder">Decode a JWT Token Now →</Link>
      </p>
    </article>
  );
}
