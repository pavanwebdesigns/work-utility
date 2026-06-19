import Link from "next/link";

const faqs = [
  {
    question: "What is box breathing?",
    answer:
      "Box breathing is a controlled breathing technique involving four equal phases — inhale, hold, exhale, hold — each lasting the same number of counts (commonly 4 seconds each). It's widely used to manage stress and improve focus.",
  },
  {
    question: "How many rounds of box breathing should I do?",
    answer:
      "Most sources suggest starting with 4 rounds (one full cycle is about 16 seconds), which takes roughly a minute, and working up to however many feel comfortable. Even a few cycles can produce a noticeable calming effect.",
  },
  {
    question: "What's the difference between box breathing and 4-7-8 breathing?",
    answer:
      "Box breathing uses equal counts for all four phases (4-4-4-4 or similar). The 4-7-8 technique uses different durations — inhale 4, hold 7, exhale 8 — with a longer exhale, which some people find produces a stronger relaxation effect.",
  },
  {
    question: "Can box breathing help with anxiety?",
    answer:
      "Controlled breathing techniques like box breathing are commonly used as a tool for managing acute stress and anxiety, and the technique is well-regarded in both military and clinical wellness contexts — though it's not a substitute for professional mental health treatment if anxiety is persistent or severe.",
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

export default function BoxBreathingTechniqueGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Box breathing is one of the simplest stress-management techniques you can practice anywhere — no app install, no equipment. Use our free{" "}
        <Link href="/tools/box-breathing">Box Breathing Timer</Link> with an animated guide for the classic 4-4-4-4 pattern, or read on to understand how the technique works and when to use it.
      </p>
      <hr />
      <h2>What Is Box Breathing?</h2>
      <p>
        Box breathing is a controlled breathing pattern with four equal phases: inhale, hold, exhale, hold — each lasting the same number of counts. The most common version is 4-4-4-4 (four seconds per phase). The technique is widely used by Navy SEALs, military personnel, and high-performance teams as a rapid stress-management tool you can deploy in seconds.
      </p>
      <hr />
      <h2>How It Works Physiologically</h2>
      <p>
        Slow, controlled breathing activates the parasympathetic nervous system — the branch responsible for rest and recovery. This counteracts the &quot;fight or flight&quot; stress response: heart rate slows, cortisol levels drop, and your body shifts from alert mode toward calm. You don&apos;t need to understand the biology to feel the effect — even a minute of box breathing can produce a noticeable shift.
      </p>
      <hr />
      <h2>When to Use Box Breathing</h2>
      <ul>
        <li><strong>Before a difficult meeting or presentation</strong> — a few cycles to center yourself</li>
        <li><strong>During an anxiety episode</strong> — grounding through a fixed, repeatable pattern</li>
        <li><strong>Wind-down before sleep</strong> — as part of a bedtime routine</li>
        <li><strong>After a stressful situation</strong> — recovering from an argument or bad news</li>
      </ul>
      <hr />
      <h2>The 4-7-8 Variation</h2>
      <p>
        Some people prefer 4-7-8 breathing — inhale 4 seconds, hold 7, exhale 8 — where the longer exhale can feel more relaxing. Our{" "}
        <Link href="/tools/box-breathing">Box Breathing Timer</Link> supports custom phase durations, including a preset for 4-7-8. Think of it as an alternative, not a replacement for the equal-count box pattern.
      </p>
      <hr />
      <h2>A Note on Health</h2>
      <p>
        Breathing exercises are well-supported for general stress management, but anyone with a respiratory condition, heart condition, or other medical concern should check with their doctor before starting a new breathing practice.
      </p>
      <hr />
      <h2>Related Reading</h2>
      <ul>
        <li>
          <Link href="/blog/pomodoro-technique-timer-guide">Pomodoro Technique Timer Guide</Link>
        </li>
        <li>
          <Link href="/blog/bmi-calculator-guide">BMI Calculator Guide</Link>
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
      <p><Link href="/tools/box-breathing">Start Box Breathing Now →</Link></p>
    </article>
  );
}
