import Link from "next/link";

export default function HowToCreateStrongPasswordGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        Shreya got a call from her bank at 7 AM. &quot;Ma&apos;am, there have
        been 3 failed login attempts on your net banking account.&quot; Her
        password was &quot;Shreya2001&quot; — her name and birth year. She had
        been using it for 11 accounts. She changed all of them that morning. The
        process took 3 hours and 20 minutes because she had never thought about
        this before.
      </p>

      <p>
        Indians are among the most targeted users for credential stuffing attacks
        — because we reuse simple passwords across Gmail, HDFC net banking,
        Instagram, and company VPN. One leak compromises everything.
      </p>

      <hr />

      <h2>Why Indians Are Easy Targets</h2>

      <p>Most common passwords in India:</p>

      <ul>
        <li>Names + birth year — &quot;Rahul1995&quot;, &quot;Priya2000&quot;</li>
        <li>&quot;123456&quot; and &quot;password&quot; — still top 10 globally</li>
        <li>&quot;India@123&quot; — meets bank rules but easily guessed</li>
        <li>Same password for all 15 accounts — one breach, total loss</li>
      </ul>

      <hr />

      <h2>What Makes a Password Strong?</h2>

      <ul>
        <li>
          <strong>Length</strong> — minimum 12 characters, ideally 16+
        </li>
        <li>
          <strong>Mix</strong> — uppercase, lowercase, numbers, symbols
        </li>
        <li>
          <strong>No personal info</strong> — no name, birthday, phone number, city
        </li>
        <li>
          <strong>Unique per account</strong> — different password for every site
        </li>
      </ul>

      <hr />

      <h2>Worst Passwords Indians Use (And Why They Fail)</h2>

      <p>
        <strong>&quot;Shreya2001&quot;</strong> — cracked in seconds by dictionary
        attack combining common names + years.
      </p>

      <p>
        <strong>&quot;India@123&quot;</strong> — meets HDFC/SBI complexity rules
        but appears in every leaked password database.
      </p>

      <p>
        <strong>Phone number as password</strong> — publicly available on Truecaller.
        Never.
      </p>

      <hr />

      <h2>How to Create a Password You Can Remember</h2>

      <h3>Passphrase Method</h3>

      <p>
        Pick 4 random words + number + symbol:{" "}
        <strong>&quot;MyDogLovesBiryani@2025!&quot;</strong>
      </p>

      <p>
        Easy to remember, hard to crack. 28 characters. Meets every bank and
        corporate policy.
      </p>

      <hr />

      <h2>Password Manager Recommendation</h2>

      <p>
        Use Bitwarden (free) or Google Password Manager. Store unique 16-character
        passwords for every account. Remember one master password only. Never
        write passwords in Notes app or WhatsApp chat.
      </p>

      <hr />

      <h2>Check If Your Password Was Leaked</h2>

      <p>
        Visit haveibeenpwned.com — enter your email. If your accounts appear in
        known breaches, change those passwords immediately. Enable 2FA on Gmail,
        net banking, and social media.
      </p>

      <p>
        Generate strong passwords instantly with our{" "}
        <Link href="/tools/password-generator">Password Generator</Link>. Secure
        your WiFi with a QR code using{" "}
        <Link href="/tools/qr-code-generator">QR Code Generator</Link>.
      </p>

      <hr />

      <p>
        <Link href="/tools/password-generator">
          Generate a Strong Password Now →
        </Link>
      </p>
    </article>
  );
}
