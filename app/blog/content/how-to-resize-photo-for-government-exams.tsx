import Link from "next/link";

export default function HowToResizePhotoForGovernmentExamsContent() {
  return (
    <article className="prose-custom">
      <p>
        Manoj had been preparing for SSC CGL for 2 years. Application form day
        finally came. He spent 4 hours filling every detail perfectly. Photo
        upload step: &quot;JPEG only, 20KB–50KB, 200×230 pixels.&quot; His phone
        photo was 4MB. It was 11 PM. Form closing at midnight. He almost missed
        it.
      </p>

      <p>
        Government exam photo requirements are strict and unforgiving. One wrong
        dimension or file size, and the portal rejects your upload — sometimes
        with no clear error message. Here&apos;s everything you need to know
        before you hit submit.
      </p>

      <hr />

      <h2>Photo Requirements for Major Exams</h2>

      <h3>UPSC CSE</h3>
      <p>
        Maximum <strong>300KB</strong>, dimensions approximately{" "}
        <strong>3.5cm × 4.5cm</strong> (roughly 413×531 pixels at 300 DPI).
        White or light background, face clearly visible, no cap or sunglasses.
      </p>

      <h3>SSC CGL</h3>
      <p>
        Maximum <strong>50KB</strong>, dimensions{" "}
        <strong>200×230 pixels</strong>. JPEG format only. This is one of the
        strictest size limits — most phone photos start at 2–5MB.
      </p>

      <h3>Railway RRB</h3>
      <p>
        Maximum <strong>40KB</strong>, dimensions <strong>200×230 pixels</strong>.
        Similar to SSC but even tighter on file size. Compress after resizing.
      </p>

      <h3>IBPS Bank PO</h3>
      <p>
        Maximum <strong>50KB</strong>, dimensions <strong>200×230 pixels</strong>.
        Signature uploaded separately — don&apos;t mix them up.
      </p>

      <h3>State PSC</h3>
      <p>
        Varies by state — usually <strong>50KB max</strong> with dimensions
        between 200×230 and 350×350 pixels. Always read the specific notification
        PDF before uploading.
      </p>

      <hr />

      <h2>Signature Requirements</h2>

      <p>
        Signatures are uploaded separately from photos. Typical specs: black ink
        on white paper, scanned or photographed clearly, usually under 20KB.
        Dimensions around 140×60 pixels for SSC. Sign on plain white paper,
        photograph in good light, then resize and compress separately.
      </p>

      <hr />

      <h2>Step-by-Step Resize Guide Using WorkUtilities</h2>

      <ol>
        <li>
          Open the{" "}
          <Link href="/tools/photo-resizer">Photo Resizer</Link> in your phone
          browser
        </li>
        <li>
          Select the Government Exam preset or enter custom dimensions (200×230
          for SSC/Railway)
        </li>
        <li>Upload your photo and crop to fit the frame</li>
        <li>
          If still over the KB limit, use{" "}
          <Link href="/tools/image-compress">Image Compress</Link> to reduce under
          50KB
        </li>
        <li>Download JPEG and upload to the exam portal</li>
      </ol>

      <p>
        For detailed dimensions across all government IDs, see our{" "}
        <Link href="/blog/resize-photo-for-government-forms-india">
          Government Exam Photo Size guide
        </Link>
        .
      </p>

      <hr />

      <h2>Common Rejection Reasons</h2>

      <ul>
        <li>File size exceeds limit (most common — phone photos are too large)</li>
        <li>Wrong dimensions or aspect ratio</li>
        <li>PNG format instead of JPEG</li>
        <li>Blurry photo or poor lighting</li>
        <li>Background not plain white or light coloured</li>
        <li>Face too small or partially cut off</li>
      </ul>

      <hr />

      <h2>How to Take Exam Photo at Home</h2>

      <p>
        You don&apos;t need a studio. Stand against a plain white wall near a
        window for natural light. Face the light source — don&apos;t stand with
        the window behind you. Neutral expression, eyes open, no cap. Click from
        chest-up distance, then crop and resize in the tool.
      </p>

      <p>
        Manoj fixed his photo in 15 minutes using these steps and submitted with
        45 minutes to spare. Don&apos;t be Manoj-at-11-PM — resize before form day.
      </p>

      <hr />

      <p>
        <Link href="/tools/photo-resizer">Resize Your Exam Photo →</Link>
      </p>
    </article>
  );
}
