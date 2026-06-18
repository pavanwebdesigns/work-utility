const KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER",
  "CROSS", "ON", "AND", "OR", "NOT", "IN", "IS", "NULL", "AS", "ORDER", "BY",
  "GROUP", "HAVING", "LIMIT", "OFFSET", "INSERT", "INTO", "VALUES", "UPDATE",
  "SET", "DELETE", "CREATE", "TABLE", "ALTER", "DROP", "INDEX", "VIEW",
  "UNION", "ALL", "DISTINCT", "CASE", "WHEN", "THEN", "ELSE", "END", "BETWEEN",
  "LIKE", "EXISTS", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "DEFAULT",
  "ASC", "DESC", "WITH", "OVER", "PARTITION", "CAST", "COUNT", "SUM", "AVG",
]);

const MAJOR_CLAUSES = new Set([
  "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "CROSS",
  "GROUP", "HAVING", "ORDER", "LIMIT", "INSERT", "INTO", "VALUES", "UPDATE",
  "SET", "DELETE", "CREATE", "ALTER", "DROP", "UNION", "WITH",
]);

type Token = { type: "word" | "string" | "other"; value: string };

function tokenize(sql: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i];
    if (ch === "'" || ch === '"') {
      const quote = ch;
      let value = ch;
      i++;
      while (i < sql.length) {
        value += sql[i];
        if (sql[i] === quote && sql[i - 1] !== "\\") break;
        i++;
      }
      i++;
      tokens.push({ type: "string", value });
      continue;
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let value = ch;
      i++;
      while (i < sql.length && /[a-zA-Z0-9_]/.test(sql[i])) {
        value += sql[i++];
      }
      tokens.push({ type: "word", value });
      continue;
    }
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    let value = ch;
    i++;
    while (i < sql.length && !/[a-zA-Z_'" \t\n\r]/.test(sql[i])) {
      value += sql[i++];
    }
    tokens.push({ type: "other", value });
  }
  return tokens;
}

export function formatSQL(sql: string): string {
  const tokens = tokenize(sql.trim());
  if (tokens.length === 0) return "";

  const lines: string[] = [];
  let current = "";
  let indent = 0;
  const indentStr = "  ";

  const flush = () => {
    if (current.trim()) lines.push(indentStr.repeat(indent) + current.trim());
    current = "";
  };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const upper =
      token.type === "word" ? token.value.toUpperCase() : token.value;

    if (token.type === "word" && KEYWORDS.has(upper)) {
      if (MAJOR_CLAUSES.has(upper)) {
        flush();
        if (upper === "AND" || upper === "OR") {
          current = upper + " ";
        } else if (upper === "ON" || upper === "SET" || upper === "VALUES") {
          current = upper + " ";
        } else {
          lines.push(indentStr.repeat(Math.max(indent, 0)) + upper);
          if (upper === "WHERE" || upper === "HAVING") indent = 1;
          else if (upper === "SELECT") indent = 0;
        }
      } else if (upper === "AND" || upper === "OR") {
        flush();
        indent = 1;
        current = upper + " ";
      } else {
        current += upper + " ";
      }
    } else {
      current +=
        (token.type === "word" ? token.value : token.value) +
        (token.type === "other" && token.value === "," ? "" : " ");
    }
  }
  flush();

  return lines.join("\n").replace(/ +\n/g, "\n").trim();
}

export function minifySQL(sql: string): string {
  const tokens = tokenize(sql.trim());
  return tokens
    .map((t) => (t.type === "word" ? t.value : t.value))
    .join(" ")
    .replace(/\s+([,();=])/g, "$1")
    .replace(/([(,;=])\s+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
