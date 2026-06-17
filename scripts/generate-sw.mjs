import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

function getBuildVersion() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 12);
  }

  const stamp = Date.now().toString(36);
  return createHash("sha256").update(stamp).digest("hex").slice(0, 12);
}

const version = getBuildVersion();
const template = readFileSync(join(root, "sw.template.js"), "utf8");
const sw = template.replaceAll("__BUILD_VERSION__", version);

writeFileSync(join(root, "..", "public", "sw.js"), sw);
writeFileSync(
  join(root, "..", "public", "sw-version.json"),
  JSON.stringify({ version }, null, 2),
);

console.log(`Generated service worker (version: ${version})`);
