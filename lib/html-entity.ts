const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "¢": "&cent;",
  "£": "&pound;",
  "¥": "&yen;",
  "€": "&euro;",
  "©": "&copy;",
  "®": "&reg;",
  "™": "&trade;",
};

export function encodeHTML(text: string): string {
  return text.replace(/[&<>"'¢£¥€©®™]/g, (c) => ENTITY_MAP[c] || c);
}

export function decodeHTML(text: string): string {
  if (typeof document === "undefined") {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

export function encodeHTMLNumeric(text: string): string {
  return text.replace(/[\u00A0-\u9999<>&]/g, (c) => "&#" + c.charCodeAt(0) + ";");
}

export const COMMON_ENTITIES = [
  { char: "&", entity: "&amp;" },
  { char: "<", entity: "&lt;" },
  { char: ">", entity: "&gt;" },
  { char: '"', entity: "&quot;" },
  { char: "'", entity: "&#39;" },
  { char: "©", entity: "&copy;" },
  { char: "®", entity: "&reg;" },
  { char: "€", entity: "&euro;" },
];
