import Link from "next/link";

export default function PassportPhotoSizeRequirementsIndiaGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Harish applied for his passport renewal online. He uploaded his photo —
        taken professionally at a studio. Application rejected: &quot;Photo does
        not meet specifications.&quot; The studio photo cost him ₹150. The studio
        said &quot;We gave you standard size.&quot; Standard wasn&apos;t enough.
      </p>

      <p>
        Indian passport photos have very specific requirements from the Ministry
        of External Affairs (MEA). Studio photographers don&apos;t always know the
        digital upload specs — only the print size. Here&apos;s what actually
        matters for online applications.
      </p>

      <hr />

      <h2>Official Passport Photo Requirements (MEA Guidelines)</h2>

      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Print size</td>
            <td>2 inch × 2 inch (51mm × 51mm)</td>
          </tr>
          <tr>
            <td>Digital minimum</td>
            <td>350×350 pixels</td>
          </tr>
          <tr>
            <td>File size</td>
            <td>Max 1MB</td>
          </tr>
          <tr>
            <td>Background</td>
            <td>Plain white</td>
          </tr>
          <tr>
            <td>Face coverage</td>
            <td>70–80% of frame</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Common Rejection Reasons</h2>

      <ul>
        <li>Shadows on face or background</li>
        <li>Coloured or patterned background instead of white</li>
        <li>Face too small in frame (below 70%)</li>
        <li>Photo too old — must be recent (within 6 months)</li>
        <li>File size over 1MB or wrong dimensions</li>
        <li>Glasses with glare, hat, or head covering (except religious)</li>
      </ul>

      <hr />

      <h2>How to Take Passport Photo at Home</h2>

      <h3>Phone Tips</h3>
      <ul>
        <li>Stand against a plain white wall in daylight</li>
        <li>Camera at eye level, 1–1.5 metres away</li>
        <li>Neutral expression, both ears visible</li>
        <li>No flash — causes glare on forehead</li>
      </ul>

      <hr />

      <h2>How to Resize Photo to Passport Size Free</h2>

      <ol>
        <li>
          Open{" "}
          <Link href="/tools/photo-resizer?preset=passport">
            Photo Resizer — Passport preset
          </Link>
        </li>
        <li>Upload your photo and crop to face guidelines</li>
        <li>
          Compress with{" "}
          <Link href="/tools/image-compress">Image Compress</Link> if over 1MB
        </li>
        <li>Download and upload to passport portal</li>
      </ol>

      <p>
        Full specs on our{" "}
        <Link href="/passport-photo-size-india">Passport Photo Size page</Link>.
      </p>

      <hr />

      <h2>Special Requirements</h2>

      <h3>Infants and Children</h3>
      <p>
        Baby must be alone in photo — no hands of parent visible. Eyes open if
        possible. Plain white sheet as background works well.
      </p>

      <h3>Elderly Applicants</h3>
      <p>
        Same dimensions apply. Ensure adequate lighting — wrinkles and shadows
        cause rejections too.
      </p>

      <hr />

      <p>
        <Link href="/tools/photo-resizer?preset=passport">
          Resize Your Passport Photo →
        </Link>
      </p>
    </article>
  );
}
