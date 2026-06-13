import Link from "next/link";

export default function WordCountForUpscEssayWritingContent() {
  return (
    <article className="prose-custom">
      <p>
        Ananya was 6 months into her UPSC preparation. Essay paper always scared
        her. Her mentor said &quot;Write 1000–1200 words in 90 minutes.&quot; She
        wrote her first practice essay. Counted manually: lost count at 400 words.
        Started again. Lost count again. Her friend said &quot;There&apos;s a tool
        for this.&quot;
      </p>

      <p>
        Word count isn&apos;t just a number — in UPSC, it&apos;s the difference
        between a structured answer and rambling that examiners ignore. Here&apos;s
        how to practice writing within limits and actually improve.
      </p>

      <hr />

      <h2>UPSC Essay Word Limit</h2>

      <p>
        The Essay paper in UPSC Mains asks you to write <strong>two essays</strong>,
        each between <strong>1000 and 1200 words</strong>. You get 3 hours total
        for both — roughly 90 minutes per essay including planning time.
      </p>

      <p>
        Writing under 1000 words signals incomplete arguments. Going over 1200 risks
        running out of time for the second essay and shows poor time management.
        Aim for 1100 words — gives you buffer without being too short.
      </p>

      <hr />

      <h2>Why Word Count Matters in UPSC</h2>

      <p>
        Examiners evaluate hundreds of scripts. A well-structured 1100-word essay
        with clear introduction, 3–4 body paragraphs, and conclusion beats a
        2000-word unstructured dump every time. Word limits force discipline —
        every sentence must earn its place.
      </p>

      <p>
        Practicing with a{" "}
        <Link href="/tools/word-counter">Word Counter</Link> builds an internal
        sense of length. After 20 practice essays, you&apos;ll know what 250 words
        looks like without counting.
      </p>

      <hr />

      <h2>How to Practice Writing Within Word Limit</h2>

      <h3>Time Yourself</h3>
      <p>
        Set a timer for 90 minutes. Plan for 10 minutes, write for 70, review for
        10. Paste your essay into the word counter immediately after. Track your
        count every session.
      </p>

      <h3>Track Improvement Over Weeks</h3>
      <p>
        Maintain a simple log: date, topic, word count, time taken. Use the{" "}
        <Link href="/tools/percentage-calculator">Percentage Calculator</Link> to
        track improvement — if you started averaging 850 words and now hit 1080
        consistently, that&apos;s measurable progress.
      </p>

      <hr />

      <h2>Other UPSC Writing Limits</h2>

      <ul>
        <li>
          <strong>GS answers (10 marks):</strong> ~150 words — about half a page
        </li>
        <li>
          <strong>GS answers (15 marks):</strong> ~250 words — one page
        </li>
        <li>
          <strong>Essay Paper II:</strong> Two essays, 1000–1200 words each
        </li>
        <li>
          <strong>Optional subject:</strong> Varies — check previous year papers
          for expected length
        </li>
      </ul>

      <p>
        Before you even start writing, confirm your age eligibility with the{" "}
        <Link href="/tools/age-calculator">Age Calculator</Link> — UPSC age
        cutoffs are strict and calculated as on 1st August of the exam year.
      </p>

      <hr />

      <h2>Tips to Write Faster Without Losing Quality</h2>

      <ul>
        <li>
          <strong>Outline first:</strong> 5 bullet points before writing saves 15
          minutes of restructuring
        </li>
        <li>
          <strong>Use examples:</strong> One concrete Indian example per paragraph
          is worth 50 words of generic theory
        </li>
        <li>
          <strong>Avoid repetition:</strong> If you said it in paragraph 2, don&apos;t
          restate in paragraph 4
        </li>
        <li>
          <strong>Practice typing:</strong> Handwriting speed matters, but many
          aspirants practice on laptop first for word count tracking
        </li>
      </ul>

      <hr />

      <h2>How to Estimate Word Count Without Counting</h2>

      <p>
        On standard A4 ruled sheets used in UPSC, roughly <strong>8–10 words per
        line</strong> and <strong>25–28 lines per page</strong>. One full page ≈
        250 words. For a 1100-word essay, you need about 4–4.5 pages. Count pages
        during the exam if you don&apos;t have a word counter handy.
      </p>

      <hr />

      <p>
        <Link href="/tools/word-counter">Count Your Essay Words →</Link>
      </p>
    </article>
  );
}
