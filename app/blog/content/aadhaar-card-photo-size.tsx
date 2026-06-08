import Link from "next/link";

export default function AadhaarCardPhotoSizeContent() {
  return (
    <article className="prose-custom">
      <p>
        I still remember the frustration. It was a Tuesday morning, and I had
        taken half a day off from work specifically to visit the Aadhaar
        enrollment center near Ameerpet. I had everything ready — documents,
        address proof, even an extra photocopy just in case. But when I handed
        over my photo, the operator looked at it and shook his head.
      </p>

      <p>&quot;Sir, yeh size nahi chalega.&quot;</p>

      <p>
        The photo I had printed was slightly too large. Not by much — maybe a
        centimeter off — but that was enough to send me back home. Wasted half a
        day, wasted the print cost, and most importantly, wasted the effort.
      </p>

      <p>
        That experience is exactly why I built the Photo Resizer tool on
        WorkUtilities. Nobody should have to go through that kind of hassle just
        because they didn&apos;t know the exact pixel dimensions.
      </p>

      <hr />

      <h2>What Is the Correct Aadhaar Card Photo Size?</h2>

      <p>
        Let&apos;s get straight to the point. For Aadhaar card enrollment and
        update, UIDAI (Unique Identification Authority of India) specifies the
        following photo requirements:
      </p>

      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Dimensions</strong>
            </td>
            <td>35mm × 35mm</td>
          </tr>
          <tr>
            <td>
              <strong>Pixel size</strong>
            </td>
            <td>213 × 213 pixels (at 72 DPI)</td>
          </tr>
          <tr>
            <td>
              <strong>File format</strong>
            </td>
            <td>JPEG</td>
          </tr>
          <tr>
            <td>
              <strong>Background</strong>
            </td>
            <td>White or light grey</td>
          </tr>
          <tr>
            <td>
              <strong>File size</strong>
            </td>
            <td>Less than 1MB</td>
          </tr>
          <tr>
            <td>
              <strong>Face coverage</strong>
            </td>
            <td>70–80% of the frame</td>
          </tr>
        </tbody>
      </table>

      <p>
        These are the official UIDAI requirements as of 2026. While some centers
        are flexible, it is always safer to get the exact dimensions right.
      </p>

      <hr />

      <h2>Why Do So Many People Get It Wrong?</h2>

      <p>
        Most photo studios in India print passport-size photos by default — which
        are 35mm × 45mm. Notice the height difference: passport photos are
        taller. This is fine for passport applications but <strong>not for Aadhaar</strong>.
      </p>

      <p>When people submit passport-size photos for Aadhaar, one of two things happens:</p>

      <ol>
        <li>
          The operator crops it at the center, cutting off part of your chin or
          forehead
        </li>
        <li>The application gets sent back, wasting your time</li>
      </ol>

      <p>
        The confusion is understandable. Both sizes are called &quot;passport-size
        photos&quot; colloquially in India, but they are technically different.
      </p>

      <hr />

      <h2>Aadhaar Photo vs Other Indian Document Photos</h2>

      <p>
        Here is a quick comparison of photo sizes for common Indian government
        documents:
      </p>

      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Width</th>
            <th>Height</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Aadhaar Card</td>
            <td>35mm</td>
            <td>35mm</td>
            <td>Square format</td>
          </tr>
          <tr>
            <td>PAN Card</td>
            <td>35mm</td>
            <td>35mm</td>
            <td>Same as Aadhaar</td>
          </tr>
          <tr>
            <td>Passport (India)</td>
            <td>51mm</td>
            <td>51mm</td>
            <td>2×2 inch</td>
          </tr>
          <tr>
            <td>Visa Application</td>
            <td>51mm</td>
            <td>51mm</td>
            <td>2×2 inch</td>
          </tr>
          <tr>
            <td>Driving License</td>
            <td>25mm</td>
            <td>32mm</td>
            <td>Rectangular</td>
          </tr>
          <tr>
            <td>Voter ID</td>
            <td>35mm</td>
            <td>45mm</td>
            <td>Standard passport size</td>
          </tr>
        </tbody>
      </table>

      <p>
        Notice that Aadhaar and PAN card use a <strong>square format</strong> —
        this catches people off guard the most.
      </p>

      <hr />

      <h2>How to Resize Your Photo for Aadhaar at Home (Free)</h2>

      <p>
        You do not need to visit a photo studio for this. Here is how to do it
        yourself in under a minute:
      </p>

      <p>
        <strong>Step 1:</strong> Go to{" "}
        <Link href="/tools/photo-resizer">WorkUtilities Photo Resizer</Link>
      </p>

      <p>
        <strong>Step 2:</strong> Upload your photo (JPG, PNG, or WebP — up to
        10MB)
      </p>

      <p>
        <strong>Step 3:</strong> Select &quot;Aadhaar Card&quot; from the preset
        sizes
      </p>

      <p>
        <strong>Step 4:</strong> Choose &quot;White&quot; as the background color
      </p>

      <p>
        <strong>Step 5:</strong> Click &quot;Resize Photo&quot; and download
      </p>

      <p>
        Your photo will be exactly 213 × 213 pixels — the correct digital size
        for Aadhaar.
      </p>

      <p>
        <strong>Important:</strong> The tool runs entirely in your browser. Your
        photo is never uploaded to any server. It stays on your device throughout
        the entire process.
      </p>

      <hr />

      <h2>Tips for Taking the Perfect Aadhaar Photo</h2>

      <p>
        Getting the size right is only half the battle. Here are a few more tips
        to make sure your photo is accepted:
      </p>

      <p>
        <strong>Lighting:</strong> Natural light works best. Stand near a window
        facing the light source. Avoid harsh shadows on your face or behind you.
      </p>

      <p>
        <strong>Background:</strong> Use a plain white wall or hang a white
        bedsheet. Avoid patterned backgrounds — they can cause rejection.
      </p>

      <p>
        <strong>Expression:</strong> Keep a neutral expression with mouth closed.
        Looking straight at the camera is mandatory.
      </p>

      <p>
        <strong>Glasses:</strong> UIDAI now recommends submitting photos without
        glasses to avoid glare issues during biometric verification.
      </p>

      <p>
        <strong>Attire:</strong> Avoid white clothing as it blends into the white
        background. Any other solid color works fine.
      </p>

      <hr />

      <h2>Common Mistakes to Avoid</h2>

      <p>
        After helping hundreds of users resize their photos correctly, here are
        the mistakes I see most often:
      </p>

      <p>
        <strong>Mistake 1: Using a mobile screenshot instead of the original photo</strong>
        <br />
        Screenshots reduce quality. Always use the original camera file.
      </p>

      <p>
        <strong>Mistake 2: Printing at the wrong DPI</strong>
        <br />
        If you are printing at home, make sure your printer is set to at least
        300 DPI. Digital submissions (online Aadhaar updates) only need 72 DPI.
      </p>

      <p>
        <strong>Mistake 3: Submitting a photo with a colored background</strong>
        <br />
        Some studios use blue or grey backgrounds. UIDAI specifically requires
        white or light grey. When in doubt, use the background color option in
        the Photo Resizer to set it to white.
      </p>

      <p>
        <strong>Mistake 4: Over-editing the photo</strong>
        <br />
        Heavy filters, skin smoothing, or brightness adjustments can make the
        photo look altered. UIDAI uses facial recognition, so the photo needs to
        match your actual appearance.
      </p>

      <hr />

      <h2>Updating Your Aadhaar Photo Online</h2>

      <p>
        If you want to update your existing Aadhaar photo without visiting a
        center, UIDAI&apos;s myAadhaar portal allows face authentication-based
        updates. Here is what you need:
      </p>

      <ol>
        <li>Visit myaadhaar.uidai.gov.in</li>
        <li>Log in with your Aadhaar number and OTP</li>
        <li>Navigate to &quot;Update Aadhaar Online&quot;</li>
        <li>Upload a photo that meets the size and quality requirements</li>
        <li>Complete face authentication using your device camera</li>
      </ol>

      <p>
        Note that the online update option may not be available in all states at
        all times. Check the UIDAI portal for current availability.
      </p>

      <hr />

      <h2>Frequently Asked Questions</h2>

      <p>
        <strong>Q: Can I use the same photo for Aadhaar and PAN card?</strong>
        <br />
        Yes. Both require 35mm × 35mm (square format), so the same photo works
        for both documents.
      </p>

      <p>
        <strong>Q: What if my photo is rejected at the Aadhaar center?</strong>
        <br />
        Most centers will let you take a photo on the spot using their webcam.
        However, having your own photo ready speeds up the process significantly.
      </p>

      <p>
        <strong>Q: Is it safe to resize photos online?</strong>
        <br />
        It depends on the tool. WorkUtilities processes everything in your
        browser — your photo never leaves your device. Be cautious with tools
        that require you to upload to a server, as your data could be stored or
        misused.
      </p>

      <p>
        <strong>Q: Can I resize a low-quality photo and expect good results?</strong>
        <br />
        Resizing improves the dimensions but not the quality. If the original
        photo is blurry or poorly lit, the resized version will be too. Always
        start with a clear, well-lit photo.
      </p>

      <p>
        <strong>Q: Does the digital photo size matter for printed copies?</strong>
        <br />
        For physical prints, the studio handles the DPI conversion. Just give
        them the millimeter dimensions — 35mm × 35mm — and they will handle the
        rest. The pixel dimensions matter only for digital submissions.
      </p>

      <hr />

      <h2>Conclusion</h2>

      <p>
        Getting your Aadhaar photo size right is a small thing that can save you
        a lot of frustration. The key numbers to remember:{" "}
        <strong>35mm × 35mm</strong>, square format, white background.
      </p>

      <p>
        If you need to resize your photo quickly without visiting a studio, the{" "}
        <Link href="/tools/photo-resizer">WorkUtilities Photo Resizer</Link>{" "}
        handles it in seconds — no signup, no upload, completely free.
      </p>

      <hr />

      <p>
        <em>
          Found this helpful? Share it with someone who is applying for Aadhaar
          for the first time.
        </em>
      </p>
    </article>
  );
}
