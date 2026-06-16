import Link from "next/link";

const faqs = [
  {
    question: "Can a hash be reversed back to the original text?",
    answer:
      "No, cryptographic hash functions are one-way — you cannot mathematically reverse a hash back to its original input. The only way to \"crack\" a hash is by guessing inputs and comparing hashes (brute force).",
  },
  {
    question: "Why does my file's hash not match the published checksum?",
    answer:
      "This usually means the file was corrupted during download, modified, or you're comparing against the wrong hash algorithm (e.g. comparing a SHA-256 hash against an MD5 value).",
  },
  {
    question: "Is MD5 still safe to use?",
    answer:
      "MD5 is fine for basic file-integrity checks but is not considered cryptographically secure — it should not be used for passwords, digital signatures, or anything security-sensitive.",
  },
  {
    question: "Should I use this tool to hash passwords for my app?",
    answer:
      "No — for password storage, use a purpose-built password hashing algorithm like bcrypt or Argon2 (with salting), not a plain hash generator. Plain hashes of passwords are vulnerable to rainbow-table and brute-force attacks.",
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

export default function Md5Sha256HashGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Hash generators get used for two very different reasons — verifying that a
        downloaded file wasn&apos;t corrupted or tampered with, and (for
        SHA-256 specifically) cryptographic and security-related use cases — and
        mixing up which hash algorithm is appropriate for which purpose is a
        common mistake. See our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>{" "}
        for the full toolkit.
      </p>

      <hr />

      <h2>What Hashing Does</h2>
      <p>
        A hash function takes any input (text or file) and produces a
        fixed-length string (the &quot;hash&quot; or &quot;checksum&quot;) that
        changes completely if even one byte of the input changes — making it
        useful for verifying integrity.
      </p>

      <hr />

      <h2>MD5 vs SHA-1 vs SHA-256</h2>
      <p>
        <strong>MD5</strong> and <strong>SHA-1</strong> are fast but considered
        cryptographically broken for security purposes (collisions have been
        demonstrated) — still fine for basic file-integrity checksums (like
        verifying a download wasn&apos;t corrupted), but not for password storage
        or security-sensitive hashing.
      </p>
      <p>
        <strong>SHA-256</strong> is the current standard for anything
        security-related (digital signatures, blockchain, integrity verification
        where tampering matters).
      </p>

      <hr />

      <h2>Verifying File Downloads</h2>
      <p>
        Many software downloads (Linux ISOs, open source releases) publish a
        checksum hash. Generate a hash from your downloaded file with the{" "}
        <Link href="/tools/hash-generator">Hash Generator</Link> and compare it
        to the published value — a match confirms the file wasn&apos;t corrupted
        or tampered with during download.
      </p>

      <hr />

      <h2>What NOT to Use This For</h2>
      <p>
        Hashing a password yourself for storage in a database is not secure
        practice on its own (no salt, fast algorithms are crackable via
        brute-force/rainbow tables). Proper password storage requires
        purpose-built algorithms (bcrypt, Argon2), not a simple SHA-256
        generator.
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
      </ul>

      <hr />

      <p>
        <Link href="/tools/hash-generator">Generate MD5 or SHA-256 Hash →</Link>
      </p>
    </article>
  );
}
