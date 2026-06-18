import Link from "next/link";

const faqs = [
  {
    question: "Why do the available voices look different on different devices?",
    answer:
      "This tool uses your browser and operating system's built-in speech synthesis engine, so available voices and their quality vary depending on your device — there's no single universal voice list.",
  },
  {
    question: "Does this work without an internet connection?",
    answer:
      "This depends on whether your browser's speech engine requires an internet connection for certain voices — some operate fully offline, others may need connectivity for higher-quality voices.",
  },
  {
    question: "Can text-to-speech help me proofread my writing?",
    answer:
      "Yes — hearing your own writing read aloud often makes awkward phrasing, repeated words, or unclear sentences more noticeable than reading silently.",
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

export default function FreeTextToSpeechOnlineGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Hearing your writing read aloud often catches awkward phrasing that silent reading misses. Use our free{" "}
        <Link href="/tools/text-to-speech">Text to Speech</Link> tool to listen instantly with your browser&apos;s built-in voices.
      </p>
      <hr />
      <h2>Common Use Cases</h2>
      <p>
        Proofread your own writing by listening, support accessibility for people who prefer audio, help language learners practice pronunciation, or preview how a script or announcement will sound when read aloud.
      </p>
      <hr />
      <h2>Browser Voices Vary by Device</h2>
      <p>
        This tool uses each device&apos;s built-in speech synthesis engine — not a single cloud voice. Available voices, languages, and quality depend on your browser and operating system.
      </p>
      <hr />
      <h2>Playback Only — No Audio Download</h2>
      <p>
        The Web Speech API supports live playback but does not provide a standard way to export speech as an audio file in the browser. Our tool offers listen-and-stop controls only — we don&apos;t claim a download feature that isn&apos;t technically supported.
      </p>
      <hr />
      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {faqs.map((faq) => (
        <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>
      ))}
      <hr />
      <p><Link href="/tools/text-to-speech">Try Text to Speech Now →</Link></p>
    </article>
  );
}
