export type CaseType =
  | "upper"
  | "lower"
  | "title"
  | "sentence"
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"
  | "dot"
  | "path";

export function convertCase(text: string, type: CaseType): string {
  const words = text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-\.\/]+/g, " ")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  switch (type) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    case "sentence":
      return words.length
        ? words[0].charAt(0).toUpperCase() +
            words[0].slice(1) +
            (words.length > 1 ? " " + words.slice(1).join(" ") : "")
        : "";
    case "camel":
      return words
        .map((w, i) =>
          i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1),
        )
        .join("");
    case "pascal":
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
    case "snake":
      return words.join("_");
    case "kebab":
      return words.join("-");
    case "constant":
      return words.join("_").toUpperCase();
    case "dot":
      return words.join(".");
    case "path":
      return words.join("/");
    default:
      return text;
  }
}

export function getTextStats(text: string) {
  return {
    chars: text.length,
    words: text.trim().split(/\s+/).filter(Boolean).length,
    lines: text.split("\n").length,
  };
}
