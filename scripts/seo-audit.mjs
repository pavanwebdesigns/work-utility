/**
 * Audits every URL in the local sitemap.
 * Start the production server first: npm run build && npm start
 */
const ORIGIN = process.env.SEO_AUDIT_ORIGIN ?? "http://localhost:3000";
const SITE = "https://workutilities.com";

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attr(html, pattern) {
  const match = html.match(pattern);
  return match ? decode(match[1]) : null;
}

function visibleText(html) {
  const withoutCode = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ");
  const text = decode(withoutCode.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
  return text.trim().split(/\s+/).filter(Boolean);
}

function robotsDirective(html) {
  const values = [];
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\bname=["']robots["']/i.test(tag) && !/\bname=["']googlebot["']/i.test(tag)) {
      continue;
    }
    const content = tag.match(/\bcontent=["']([^"']*)["']/i);
    if (content) values.push(content[1].toLowerCase());
  }
  return values.join(", ");
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()));
  return results;
}

const sitemapRes = await fetch(`${ORIGIN}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`Could not fetch ${ORIGIN}/sitemap.xml (${sitemapRes.status}). Is \`npm start\` running?`);
  process.exit(1);
}
const sitemapXml = await sitemapRes.text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
if (urls.length === 0) {
  console.error("Sitemap has no URLs.");
  process.exit(1);
}

const titles = new Map();
const errors = [];

await mapPool(urls, 8, async (url) => {
  let pathname;
  try {
    const parsed = new URL(url);
    if (parsed.origin !== SITE) {
      errors.push(`${url}: sitemap URL is not on ${SITE}`);
      return;
    }
    pathname = `${parsed.pathname}${parsed.search}`;
  } catch {
    errors.push(`${url}: invalid sitemap URL`);
    return;
  }

  const local = `${ORIGIN}${pathname}`;
  let response;
  try {
    response = await fetch(local, { redirect: "manual" });
  } catch (error) {
    errors.push(`${url}: ${error instanceof Error ? error.message : "request failed"}`);
    return;
  }

  if (response.status >= 300 && response.status < 400) {
    errors.push(`${url}: sitemap lists a redirect (${response.status})`);
    return;
  }
  if (response.status !== 200) {
    errors.push(`${url}: status ${response.status}`);
    return;
  }

  const html = await response.text();
  const robots = robotsDirective(html);
  if (/\bnoindex\b/.test(robots)) {
    errors.push(`${url}: sitemap lists a noindexed page`);
  }

  const canonical = attr(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    ?? attr(html, /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (canonical !== url) {
    errors.push(`${url}: canonical is ${canonical ?? "missing"}`);
  }

  const ogUrl = attr(html, /<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i)
    ?? attr(html, /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:url["']/i);
  if (ogUrl !== url) {
    errors.push(`${url}: og:url is ${ogUrl ?? "missing"}`);
  }

  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) {
    errors.push(`${url}: ${h1Count} <h1> tags`);
  }

  const words = visibleText(html);
  if (words.length < 300) {
    errors.push(`${url}: ${words.length} visible words`);
  }

  const title = attr(html, /<title>([^<]*)<\/title>/i) ?? "";
  if (!title) {
    errors.push(`${url}: missing title`);
  } else if (title.length > 60) {
    errors.push(`${url}: title is ${title.length} chars`);
  }

  const description = attr(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
    ?? attr(html, /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)
    ?? "";
  if (!description) {
    errors.push(`${url}: missing description`);
  } else if (description.length > 160) {
    errors.push(`${url}: description is ${description.length} chars`);
  }

  if (title) {
    const seen = titles.get(title) ?? [];
    seen.push(url);
    titles.set(title, seen);
  }
});

for (const [title, pages] of titles) {
  if (pages.length < 2) continue;
  errors.push(`duplicate title "${title}": ${pages.join(", ")}`);
}

const buckets = new Map();
for (const error of errors) {
  const rule = error.includes(": ") ? error.slice(error.indexOf(": ") + 2) : error;
  const key = rule
    .replace(/\d+/g, "N")
    .replace(/https?:\/\/\S+/g, "URL")
    .replace(/"[^"]+"/g, '"…"');
  buckets.set(key, (buckets.get(key) ?? 0) + 1);
}

console.log(`SEO audit — ${urls.length} URLs from ${ORIGIN}/sitemap.xml`);
console.log(`Errors: ${errors.length}`);
if (buckets.size > 0) {
  console.log("By check:");
  for (const [key, count] of [...buckets.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${count}  ${key}`);
  }
  console.log("Examples:");
  const shown = new Map();
  for (const error of errors) {
    const rule = error.includes(": ") ? error.slice(error.indexOf(": ") + 2) : error;
    const key = rule
      .replace(/\d+/g, "N")
      .replace(/https?:\/\/\S+/g, "URL")
      .replace(/"[^"]+"/g, '"…"');
    const count = shown.get(key) ?? 0;
    if (count >= 3) continue;
    shown.set(key, count + 1);
    console.log(`  ${error}`);
  }
}

if (errors.length > 0) {
  process.exit(1);
}
