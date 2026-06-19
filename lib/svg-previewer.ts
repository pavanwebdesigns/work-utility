export type SvgBackground = "checker" | "white" | "dark";

export function sanitizeSvg(input: string): string {
  let svg = input.trim();

  svg = svg.replace(/<script[\s\S]*?<\/script>/gi, "");
  svg = svg.replace(/\son[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "");
  svg = svg.replace(/javascript:/gi, "");
  svg = svg.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");
  svg = svg.replace(/<object[\s\S]*?<\/object>/gi, "");
  svg = svg.replace(/<embed[\s\S]*?\/?>/gi, "");

  if (!/<svg[\s>]/i.test(svg)) {
    return "";
  }

  return svg;
}

export function prettifySvg(input: string): string {
  const sanitized = sanitizeSvg(input);
  if (!sanitized) return input.trim();

  const compact = sanitized.replace(/>\s+</g, "><").trim();
  let formatted = "";
  let indent = 0;
  const tokens = compact.split(/(?=<)|(?<=>)/g).filter(Boolean);

  for (const token of tokens) {
    if (token.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      formatted += `${"  ".repeat(indent)}${token}\n`;
    } else if (token.startsWith("<") && !token.endsWith("/>") && !token.includes("</")) {
      formatted += `${"  ".repeat(indent)}${token}\n`;
      if (!token.startsWith("<?") && !token.endsWith("/>")) indent += 1;
    } else {
      formatted += `${"  ".repeat(indent)}${token}\n`;
    }
  }

  return formatted.trim();
}

export function downloadSvg(content: string, filename = "image.svg"): void {
  const blob = new Blob([content], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export const DEFAULT_SVG_SAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="24" fill="#3B82F6"/>
  <circle cx="60" cy="60" r="28" fill="#ffffff"/>
</svg>`;
