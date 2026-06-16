export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export function testRegex(
  pattern: string,
  flags: string,
  testString: string,
): {
  matches: RegexMatch[];
  isValid: boolean;
  error?: string;
} {
  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];

    if (flags.includes("g")) {
      let match: RegExpExecArray | null;
      while ((match = regex.exec(testString)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });
        if (match[0] === "") regex.lastIndex++;
      }
    } else {
      const match = regex.exec(testString);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });
      }
    }

    return { matches, isValid: true };
  } catch (e) {
    return { matches: [], isValid: false, error: (e as Error).message };
  }
}

export const COMMON_PATTERNS = [
  { label: "Email", pattern: "[\\w.-]+@[\\w.-]+\\.\\w+" },
  { label: "URL", pattern: "https?:\\/\\/[\\w.-]+\\.[a-z]{2,}[\\w\\/.-]*" },
  {
    label: "Phone (US)",
    pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
  },
  { label: "Indian Phone", pattern: "[6-9]\\d{9}" },
  { label: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  { label: "Hex Color", pattern: "#[0-9A-Fa-f]{6}" },
];
