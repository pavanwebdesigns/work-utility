/**
 * Writes lib/content-dates.json from git history.
 * Run locally and commit the JSON. Vercel's clone may not have history.
 *
 * Skips SHAs listed in scripts/content-dates-ignore.txt (refactor-only commits
 * such as ToolShell migrations or robots-helper layout wraps).
 *
 * Blog posts:
 *   publishedAt = author date of the first non-ignored commit that added the file
 *   updatedAt   = author date of the newest non-ignored commit that changed it
 * Tools, photo landings, and other sitemap pages:
 *   lastmod = committer date of the newest non-ignored commit that changed that path
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

function git(args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
  }).trim();
}

function requireDate(value, label) {
  if (!value) {
    throw new Error(`No git history for ${label}. Refusing to invent a date.`);
  }
  return value;
}

const ignorePrefixes = readFileSync(
  path.join(root, "scripts/content-dates-ignore.txt"),
  "utf8",
)
  .split("\n")
  .map((line) => line.replace(/#.*$/, "").trim())
  .filter(Boolean);

function isIgnored(hash) {
  return ignorePrefixes.some(
    (prefix) => hash.startsWith(prefix) || prefix.startsWith(hash),
  );
}

/** Walk `git log --format="%H <date>"` and return the newest non-ignored date. */
function newestNonIgnoredDate(dateToken, filePath, extraArgs = []) {
  const output = git([
    "log",
    ...extraArgs,
    `--format=%H ${dateToken}`,
    "--",
    filePath,
  ]);
  if (!output) {
    return "";
  }
  for (const line of output.split("\n")) {
    const hash = line.slice(0, 40);
    const date = line.slice(41).trim();
    if (!hash || !date) continue;
    if (isIgnored(hash)) continue;
    return date;
  }
  return "";
}

function lastCommit(dateToken, filePath) {
  return requireDate(
    newestNonIgnoredDate(dateToken, filePath),
    filePath,
  );
}

function latestOf(dateToken, paths) {
  let latest = "";
  for (const filePath of paths) {
    const iso = lastCommit(dateToken, filePath);
    if (iso > latest) latest = iso;
  }
  return latest;
}

const contentDir = path.join(root, "app/blog/content");
const contentFiles = readdirSync(contentDir).filter((name) => name.endsWith(".tsx"));
const postsSource = readFileSync(path.join(root, "app/blog/posts.ts"), "utf8");
const postSlugs = [...postsSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

const posts = {};
for (const slug of postSlugs.sort()) {
  const filePath = `app/blog/content/${slug}.tsx`;
  if (!contentFiles.includes(`${slug}.tsx`)) {
    throw new Error(`Blog post "${slug}" has no content file at ${filePath}`);
  }
  const publishedAt = requireDate(
    newestNonIgnoredDate("%aI", filePath, ["--diff-filter=A"]),
    `${filePath} (added)`,
  );
  const updatedAt = lastCommit("%aI", filePath);
  posts[slug] = { publishedAt, updatedAt };
}

const extraContent = contentFiles.filter((name) => !(name.replace(/\.tsx$/, "") in posts));
if (extraContent.length > 0) {
  throw new Error(
    `Content files are not in app/blog/posts.ts: ${extraContent.join(", ")}`,
  );
}

const lastmod = {};

const toolRoot = path.join(root, "app/tools");
for (const name of readdirSync(toolRoot).sort()) {
  const folder = path.join(toolRoot, name);
  if (!statSync(folder).isDirectory()) continue;
  if (!existsSync(path.join(folder, "page.tsx"))) continue;
  lastmod[`/tools/${name}`] = lastCommit("%cI", `app/tools/${name}`);
}

const guides = readFileSync(path.join(root, "lib/photo-size-guides.ts"), "utf8");
const landingPaths = [...guides.matchAll(/path:\s*"(\/[^"]+)"/g)].map((match) => match[1]);
for (const landingPath of [...new Set(landingPaths)].sort()) {
  lastmod[landingPath] = lastCommit("%cI", `app${landingPath}`);
}

const staticPages = {
  "/": ["app/page.tsx"],
  "/tools": ["app/tools/page.tsx"],
  "/about": ["app/about"],
  "/privacy": ["app/privacy"],
  "/terms": ["app/terms"],
  "/contact": ["app/contact"],
  "/blog": ["app/blog/page.tsx", "app/blog/posts.ts"],
};

for (const [pathname, paths] of Object.entries(staticPages)) {
  lastmod[pathname] = latestOf("%cI", paths);
}

const newestPost = Object.values(posts)
  .map((row) => row.updatedAt)
  .sort()
  .at(-1);
if (newestPost && newestPost > lastmod["/blog"]) {
  lastmod["/blog"] = newestPost;
}

const sortedLastmod = Object.fromEntries(
  Object.entries(lastmod).sort(([a], [b]) => a.localeCompare(b)),
);

const output = {
  posts,
  lastmod: sortedLastmod,
};

writeFileSync(
  path.join(root, "lib/content-dates.json"),
  `${JSON.stringify(output, null, 2)}\n`,
);

console.log(
  `Wrote lib/content-dates.json (${Object.keys(posts).length} posts, ${Object.keys(sortedLastmod).length} lastmod paths)`,
);
console.log(`Ignored ${ignorePrefixes.length} refactor SHA prefixes`);
