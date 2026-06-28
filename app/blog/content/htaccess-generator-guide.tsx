import Link from "next/link";

const faqs = [
  {
    question: "What is an .htaccess file?",
    answer:
      "An .htaccess file is a directory-level configuration file used on Apache web servers. It lets you configure URL redirects, browser caching, GZIP compression, custom error pages, and access controls for a specific directory, without needing to modify the main server configuration.",
  },
  {
    question: "Does .htaccess work on Nginx?",
    answer:
      "No — .htaccess is specific to Apache servers. Nginx uses server-block configuration files instead. If your hosting uses Nginx (common on modern cloud hosting), .htaccess rules will be ignored. Check with your host which web server they use.",
  },
  {
    question: "How do I redirect HTTP to HTTPS using .htaccess?",
    answer:
      'Add these lines to your .htaccess file: "RewriteEngine On / RewriteCond %{HTTPS} off / RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]". This permanently redirects all HTTP requests to HTTPS using a 301 redirect.',
  },
  {
    question: "Will incorrect .htaccess rules break my site?",
    answer:
      "Yes — a syntax error in .htaccess can cause a 500 Internal Server Error for your entire site or directory. Always back up your existing .htaccess before making changes, and test changes on a staging environment first. Most errors come from incorrect RewriteRule syntax or unclosed tags.",
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

export default function HtaccessGeneratorGuideContent() {
  return (
    <article className="prose-custom">
      <p>
        An <strong>.htaccess</strong> file controls Apache server behavior for a
        specific directory — redirects, caching, compression, error pages, and
        security. Use our free{" "}
        <Link href="/tools/htaccess-generator">.htaccess Generator</Link> to build
        rules with live preview and download. Part of our{" "}
        <Link href="/blog/complete-developer-tools-guide">
          Complete Developer Tools Guide
        </Link>
        .
      </p>

      <hr />

      <h2>What Is .htaccess?</h2>
      <p>
        A plain-text configuration file placed in your website&apos;s document root
        (or any subdirectory). Apache reads it on every request to that directory.
        It controls redirects, caching headers, compression, custom error pages,
        IP blocking, and file protection — without needing server admin access.
      </p>

      <hr />

      <h2>HTTPS Redirect with .htaccess</h2>
      <p>
        The single most important rule in 2026 — force all HTTP traffic to HTTPS
        with a permanent 301 redirect. This protects user data, improves SEO, and
        is required for modern browser features. Our generator creates the correct
        RewriteRule syntax automatically.
      </p>

      <hr />

      <h2>WWW vs Non-WWW</h2>
      <p>
        Choose one canonical URL format and redirect the other. Google treats www
        and non-www as separate sites if both are accessible. Pick based on
        branding preference — there is no SEO advantage to either, but consistency
        matters.
      </p>

      <hr />

      <h2>Browser Caching — mod_expires</h2>
      <p>
        Set cache expiry headers for static assets (images, CSS, JS) so repeat
        visitors load faster. Typical settings: images for 1 year, CSS/JS for 1
        month. Requires Apache <code>mod_expires</code> module enabled.
      </p>

      <hr />

      <h2>GZIP Compression — mod_deflate</h2>
      <p>
        Compress HTML, CSS, JavaScript, and JSON before sending to the browser —
        typically reducing transfer size by 60–80%. Requires{" "}
        <code>mod_deflate</code> enabled on your server.
      </p>

      <hr />

      <h2>Security Rules</h2>
      <p>
        Block specific IP addresses, disable directory listing (<code>Options -Indexes</code>
        ), and protect sensitive files like <code>.env</code> and{" "}
        <code>config.php</code> from direct web access. These are basic but
        essential security measures for any Apache-hosted site.
      </p>

      <hr />

      <h2>When .htaccess Won&apos;t Work</h2>
      <p>
        <strong>Nginx servers do not use .htaccess.</strong> If your hosting runs
        Nginx (common on Vercel, Netlify, and many cloud providers), you need
        server-block configuration instead. Always check with your host which web
        server they use before deploying .htaccess rules.
      </p>

      <hr />

      <h2>Frequently Asked Questions</h2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <hr />

      <h2>Related Tools & Guides</h2>
      <ul>
        <li>
          <Link href="/tools/robots-txt-generator">robots.txt Generator</Link>
        </li>
        <li>
          <Link href="/blog/robots-txt-generator-guide">
            robots.txt Generator Guide
          </Link>
        </li>
        <li>
          <Link href="/blog/complete-developer-tools-guide">
            Complete Developer Tools Guide
          </Link>
        </li>
      </ul>

      <hr />

      <p>
        <Link href="/tools/htaccess-generator">Generate .htaccess Free →</Link>
      </p>
    </article>
  );
}
