import Link from "next/link";

export default function CompressImageUnder100kbIndiaContent() {
  return (
    <article className="prose-custom">
      <p>
        Sanjana had been trying to upload her photo to the SSC exam portal for 45
        minutes. Every time: &quot;File size must be under 50KB.&quot; Her phone
        camera photo was 2.8MB. She tried WhatsApp compression, email, even
        screenshotting it. Nothing worked. Her friend Divya solved it in 30
        seconds.
      </p>

      <p>
        Indian government portals are strict about file sizes — and for good
        reason. They process lakhs of applications. Small files keep their systems
        running. Your job is to meet the limit without making your photo look like
        a potato.
      </p>

      <hr />

      <h2>Why Indian Government Portals Have Strict Size Limits</h2>

      <p>
        UPSC, SSC, state PSC, PAN — and other government portals cap photo and
        document uploads at 50KB to 300KB. Aadhaar photo specs apply to printed
        photos for enrollment visits (UIDAI does not accept online photo uploads).
        A phone camera photo is 2–5MB by default. That gap is why millions of
        Indians fail uploads every exam season.
      </p>

      <hr />

      <h2>What Is Image Compression?</h2>

      <p>
        Compression reduces file size by removing redundant data. For passport
        photos and ID scans, you can often go from 3MB to 40KB with barely
        visible quality loss — because the image is simple (face + plain
        background).
      </p>

      <hr />

      <h2>Step by Step: Compress Under 100KB</h2>

      <ol>
        <li>
          Open{" "}
          <Link href="/tools/image-compress">WorkUtilities Image Compress</Link>
        </li>
        <li>Upload your JPG or PNG photo</li>
        <li>Select High compression for government portals</li>
        <li>Check file size in preview — adjust if still too large</li>
        <li>Download and upload to portal</li>
      </ol>

      <p>
        For stricter 50KB limits, resize dimensions first with our{" "}
        <Link href="/tools/photo-resizer">Photo Resizer</Link>, then compress.
      </p>

      <hr />

      <h2>Compress Image Under 50KB</h2>

      <p>
        SSC signature uploads need under 20KB. SSC photo needs under 50KB. Combine
        resize + compress: set exact pixel dimensions, then compress aggressively.
        Text and simple backgrounds compress better than detailed photos.
      </p>

      <hr />

      <h2>Common Portals and Their Limits</h2>

      <table>
        <thead>
          <tr>
            <th>Portal</th>
            <th>Photo Limit</th>
            <th>Signature Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SSC</td>
            <td>50KB</td>
            <td>20KB</td>
          </tr>
          <tr>
            <td>UPSC</td>
            <td>300KB</td>
            <td>300KB</td>
          </tr>
          <tr>
            <td>Aadhaar (printed photo for enrollment)</td>
            <td>50KB</td>
            <td>—</td>
          </tr>
          <tr>
            <td>PAN card (NSDL)</td>
            <td>300KB</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>

      <p>
        See our full{" "}
        <Link href="/aadhaar-photo-size">Aadhaar Photo Size Guide</Link> for
        dimension requirements too.
      </p>

      <hr />

      <h2>Tips for Best Quality at Small Size</h2>

      <ul>
        <li>Use plain white or light background</li>
        <li>Resize to exact pixel dimensions before compressing</li>
        <li>Save as JPG — not PNG — for photos</li>
        <li>Avoid heavy filters or HDR mode on phone camera</li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/image-compress">Compress Your Image Now →</Link>
      </p>
    </article>
  );
}
