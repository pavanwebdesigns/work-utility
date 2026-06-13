import Link from "next/link";

export default function CgpaToPercentageForJobApplicationsContent() {
  return (
    <article className="prose-custom">
      <p>
        Aditya from Bengaluru had a CGPA of 8.2 from VTU. Every job application
        asked for percentage. He typed &quot;78.4%&quot; because someone told
        him multiply by 9.5. His friend typed &quot;82%&quot; because
        &quot;that&apos;s what I got in 10th.&quot; A third friend typed
        &quot;7.2 out of 10&quot; and got rejected at the screening stage. All
        three were applying for the same job at an Infosys campus drive.
      </p>

      <p>
        CGPA to percentage conversion is not universal in India. Every university
        uses a different formula. Using the wrong one can get your application
        filtered out before a human even reads it.
      </p>

      <hr />

      <h2>Why Do Companies Ask for Percentage Not CGPA?</h2>

      <p>
        Older HR systems, government job forms, and legacy screening tools expect
        percentage. Companies comparing candidates from CBSE, VTU, Mumbai
        University, and Delhi University need one number — even if CGPA is more
        accurate.
      </p>

      <hr />

      <h2>University-Wise Conversion Formulas</h2>

      <table>
        <thead>
          <tr>
            <th>University</th>
            <th>Formula</th>
            <th>Example (8.2 CGPA)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>VTU / CBSE</td>
            <td>CGPA × 9.5</td>
            <td>77.9%</td>
          </tr>
          <tr>
            <td>Anna University</td>
            <td>(CGPA − 0.5) × 10</td>
            <td>77%</td>
          </tr>
          <tr>
            <td>CBSE (alternate)</td>
            <td>(CGPA − 0.75) × 10</td>
            <td>74.5%</td>
          </tr>
          <tr>
            <td>Mumbai University</td>
            <td>CGPA × 10</td>
            <td>82%</td>
          </tr>
          <tr>
            <td>Most others</td>
            <td>CGPA × 9.5</td>
            <td>77.9%</td>
          </tr>
        </tbody>
      </table>

      <p>
        Use our{" "}
        <Link href="/tools/cgpa-to-percentage">
          CGPA to Percentage Calculator
        </Link>{" "}
        with your university formula selected.
      </p>

      <hr />

      <h2>What to Write on Job Application Forms</h2>

      <ul>
        <li>Write converted percentage, not raw CGPA (unless form asks for CGPA)</li>
        <li>
          Add note: &quot;As per VTU conversion formula&quot; in cover letter if
          space allows
        </li>
        <li>Attach consolidated mark sheet PDF showing CGPA clearly</li>
        <li>Be consistent — same number on Naukri, LinkedIn, and application form</li>
      </ul>

      <hr />

      <h2>CGPA for Government Job Forms</h2>

      <p>
        SSC, UPSC, and state PSC often specify exact conversion in notification.
        Read the fine print — some accept CGPA directly, others want percentage
        with specific formula. Never guess for government forms.
      </p>

      <hr />

      <h2>4-Point Scale (US) to Percentage</h2>

      <p>
        US university CGPA on 4.0 scale: multiply by 25 for rough percentage (3.6
        GPA ≈ 90%). For precise conversion, use WES evaluation for visa and
        foreign degree recognition.
      </p>

      <p>
        Double-check calculations with our{" "}
        <Link href="/tools/percentage-calculator">
          Percentage Calculator
        </Link>
        . Keep resume length in check with{" "}
        <Link href="/tools/word-counter">Word Counter</Link>.
      </p>

      <hr />

      <p>
        <Link href="/tools/cgpa-to-percentage">
          Convert Your CGPA to Percentage →
        </Link>
      </p>
    </article>
  );
}
