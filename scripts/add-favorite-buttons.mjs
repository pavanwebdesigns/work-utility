import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TOOLS_DIR = path.join(ROOT, "app/tools");

const IMPORT_LINE =
  'import { FavoriteButton } from "@/components/FavoriteButton";';

function insertFavoriteButton(content, slug) {
  if (content.includes("FavoriteButton")) return content;

  if (!content.includes(IMPORT_LINE)) {
    const componentImport = content.match(
      /import .+ from "@\/components\/[^"]+";/g,
    );
    if (componentImport?.length) {
      const last = componentImport[componentImport.length - 1];
      content = content.replace(last, `${last}\n${IMPORT_LINE}`);
    } else {
      const firstImport = content.match(/^import .+;$/m);
      if (firstImport) {
        content = content.replace(
          firstImport[0],
          `${firstImport[0]}\n${IMPORT_LINE}`,
        );
      }
    }
  }

  const insertBlock = `            <div className="mt-4 flex justify-center">
              <FavoriteButton slug="${slug}" />
            </div>`;

  const patterns = [
    /(<p className="[^"]*max-w-m[dgl][^"]*text-content-secondary[^"]*">[\s\S]*?<\/p>)/,
    /(<p className="mx-auto mt-3[^"]*text-content-secondary[^"]*">[\s\S]*?<\/p>)/,
  ];

  for (const pattern of patterns) {
    if (pattern.test(content)) {
      return content.replace(pattern, `$1\n${insertBlock}`);
    }
  }

  console.warn(`No insertion point found for ${slug}`);
  return content;
}

function processFile(filePath, slug) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = insertFavoriteButton(original, slug);
  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log(`Updated: ${path.relative(ROOT, filePath)}`);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name === "page.tsx" || entry.name.endsWith("Client.tsx")) {
      const slug = path.basename(path.dirname(full));
      processFile(full, slug);
    }
  }
}

walk(TOOLS_DIR);
