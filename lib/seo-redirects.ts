import { readFileSync } from "fs";
import path from "path";

/** Permanent path redirects in next.config.mjs. Header-based rules are ignored. */
export function permanentRedirectPaths(): Set<string> {
  const file = path.join(process.cwd(), "next.config.mjs");
  const text = readFileSync(file, "utf8");
  const start = text.indexOf("redirects()");
  const headerStart = text.indexOf("headers()", start);
  const slice = text.slice(start, headerStart === -1 ? undefined : headerStart);
  const paths = new Set<string>();

  const pattern = /\{\s*source:\s*"([^"]+)"([\s\S]*?)\n\s*\}/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(slice)) !== null) {
    const source = match[1];
    const body = match[2];
    if (/\bhas\s*:/.test(body)) continue;
    if (!/permanent:\s*true/.test(body)) continue;
    if (source.includes(":") || source.includes("*")) continue;
    paths.add(source);
  }

  return paths;
}
