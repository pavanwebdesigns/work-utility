import { marked } from "marked";

export function convertMarkdownToHtml(markdown: string): string {
  const result = marked.parse(markdown, { async: false });
  return typeof result === "string" ? result : "";
}

export function getMarkdownStats(markdown: string): {
  words: number;
  characters: number;
  lines: number;
} {
  return {
    words: markdown.trim().split(/\s+/).filter(Boolean).length,
    characters: markdown.length,
    lines: markdown.split("\n").length,
  };
}
