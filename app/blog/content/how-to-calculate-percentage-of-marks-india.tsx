import Link from "next/link";

export default function HowToCalculatePercentageOfMarksIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Priya got her Class 12 marksheet. Total marks: 423 out of 500. Her cousin
        asked &quot;What percentage did you get?&quot; Priya said &quot;423.&quot;
        Her cousin stared at her. &quot;That&apos;s not a percentage, that&apos;s
        your marks.&quot; Priya had genuinely never calculated it herself. Her
        school always printed it on the marksheet. This time they didn&apos;t.
      </p>

      <p>
        If you&apos;ve been in Priya&apos;s shoes, you&apos;re not alone. Most
        Indian students know their marks but freeze when someone asks for
        percentage — especially on job forms, college applications, or visa
        paperwork. The good news: it takes 10 seconds once you know the formula.
      </p>

      <hr />

      <h2>The Basic Percentage Formula</h2>

      <p>
        Percentage means &quot;out of 100.&quot; The formula every Indian student
        needs:
      </p>

      <p>
        <strong>Percentage = (Marks Obtained ÷ Total Marks) × 100</strong>
      </p>

      <p>
        For Priya: (423 ÷ 500) × 100 = <strong>84.6%</strong>. That&apos;s it.
        Use our free{" "}
        <Link href="/tools/percentage-calculator">Percentage Calculator</Link> to
        skip manual math — enter marks and total, get instant results.
      </p>

      <hr />

      <h2>How to Calculate Aggregate Percentage</h2>

      <p>
        Board exams have multiple subjects. Aggregate percentage is your total
        marks across all subjects divided by maximum possible marks.
      </p>

      <h3>Example: Class 12 CBSE</h3>
      <p>
        If you scored 95 in Physics, 88 in Chemistry, 92 in Maths, 85 in English,
        and 90 in Computer Science — total marks = 450 out of 500. Percentage =
        (450 ÷ 500) × 100 = <strong>90%</strong>.
      </p>

      <p>
        Some boards exclude certain subjects from aggregate (like optional
        languages). Always check your board&apos;s rules — CBSE, ICSE, and state
        boards differ slightly.
      </p>

      <hr />

      <h2>Class 10 and Class 12 Percentage Calculation</h2>

      <p>
        <strong>Class 10:</strong> Usually 5 main subjects × 100 marks = 500 total.
        Some state boards use 600 or include internal assessment differently.
      </p>

      <p>
        <strong>Class 12:</strong> Same logic — sum all subject marks, divide by
        total maximum. For science stream students applying to engineering, some
        colleges ask for PCM (Physics-Chemistry-Maths) percentage separately.
        Calculate that subset the same way.
      </p>

      <hr />

      <h2>Percentage for Entrance Exams</h2>

      <p>
        Entrance exams report scores differently, but percentage still matters for
        cutoffs and eligibility.
      </p>

      <ul>
        <li>
          <strong>JEE Main:</strong> Percentile is not percentage — don&apos;t
          confuse them. But board percentage (75% minimum for NITs/IIITs) uses
          the standard formula.
        </li>
        <li>
          <strong>NEET:</strong> Score out of 720, often converted to percentile.
          Eligibility uses board percentage (50% for General, relaxed for
          reserved categories).
        </li>
        <li>
          <strong>CAT:</strong> No percentage in the exam itself, but IIMs
          consider your graduation percentage heavily during shortlisting.
        </li>
      </ul>

      <hr />

      <h2>What Percentage Is Needed For?</h2>

      <h3>Government Jobs</h3>
      <p>
        Most central government jobs require <strong>50–60% in graduation</strong>.
        SSC, Railway, and Bank PO notifications specify minimum marks. Check the
        exact notification — some count aggregate, others want degree percentage
        only.
      </p>

      <h3>Central Universities</h3>
      <p>
        DU, JNU, and other central universities often set cutoffs at 95%+ for
        popular courses. State universities vary — some use entrance exams instead
        of board percentage.
      </p>

      <h3>Visa Applications</h3>
      <p>
        Student visa applications (UK, Canada, Australia) ask for percentage or
        GPA. Always convert accurately — embassies verify against your
        transcripts.
      </p>

      <hr />

      <h2>Percentage vs CGPA — Which to Use Where</h2>

      <p>
        Modern universities report CGPA on a 10-point scale. Job portals and older
        forms still ask for percentage. Don&apos;t guess the conversion — use our{" "}
        <Link href="/tools/cgpa-to-percentage">CGPA to Percentage</Link> tool with
        the correct formula for your university (VTU uses ×9.5, Anna University
        differs, CBSE has its own multiplier).
      </p>

      <p>
        Writing a college application essay? Track your word count with the{" "}
        <Link href="/tools/word-counter">Word Counter</Link> so you stay within
        limits while describing your academic achievements.
      </p>

      <hr />

      <p>
        <Link href="/tools/percentage-calculator">
          Calculate Your Percentage →
        </Link>
      </p>
    </article>
  );
}
