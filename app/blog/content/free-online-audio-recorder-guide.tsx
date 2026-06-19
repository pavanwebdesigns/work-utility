import Link from "next/link";

const faqs = [
  {
    question: "Do I need to install anything to record audio in the browser?",
    answer:
      "No — this tool uses your browser's built-in microphone API. Just allow microphone access when prompted and you can start recording immediately.",
  },
  {
    question: "Is my recorded audio uploaded anywhere?",
    answer:
      "No — recordings are processed entirely in your browser and stay on your device. Nothing is sent to any server, which also means recordings are lost when you close or refresh the page.",
  },
  {
    question: "What format does the recording download in?",
    answer:
      "Recordings download as WebM audio, a modern open format natively supported by most browsers. If you need MP3 specifically, many free converters can convert WebM to MP3 after downloading.",
  },
  {
    question: "Why is the browser asking for microphone permission?",
    answer:
      "Accessing your microphone requires explicit permission for privacy and security reasons — your browser prompts you once per site. The permission is only used while you're actively recording and can be revoked anytime from your browser's privacy settings.",
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

export default function FreeOnlineAudioRecorderGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Need to capture a quick voice note without installing an app? Use our free{" "}
        <Link href="/tools/audio-recorder">Online Audio Recorder</Link> to record from your microphone, play back, and download — all in your browser with no signup.
      </p>
      <hr />
      <h2>Common Use Cases</h2>
      <ul>
        <li><strong>Voice notes and reminders</strong> — capture a thought without opening a separate app</li>
        <li><strong>Short voice messages</strong> — record audio to share or transcribe later</li>
        <li><strong>Microphone testing</strong> — verify your mic works before a video call</li>
        <li><strong>Quick dictation</strong> — record an idea when typing isn&apos;t convenient</li>
        <li><strong>Short project audio</strong> — when you don&apos;t want desktop recording software</li>
      </ul>
      <hr />
      <h2>Privacy-First: Nothing Leaves Your Browser</h2>
      <p>
        This tool uses the browser&apos;s built-in MediaRecorder API. Audio is processed entirely on your device — nothing is uploaded to any server. Recordings exist only in your current session and are lost when you close or refresh the page.
      </p>
      <hr />
      <h2>WebM Format</h2>
      <p>
        Recordings download as WebM audio — a modern open format well-supported in browsers. Older media players may not play WebM natively; converting to MP3 after download is straightforward with free converters if needed.
      </p>
      <hr />
      <h2>Microphone Permission</h2>
      <p>
        Your browser will ask for microphone access — this is a standard security prompt. The site never stores or transmits your audio. You can revoke permission anytime from your browser&apos;s privacy settings.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/free-text-to-speech-online-guide">Free Text to Speech Online Guide</Link>
        </li>
      </ul>
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
      <p><Link href="/tools/audio-recorder">Start Recording Now →</Link></p>
    </article>
  );
}
