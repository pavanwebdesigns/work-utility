export interface ParseOptions {
  hasHeader: boolean;
  delimiter: "," | ";" | "\t" | "|";
  trimValues: boolean;
}

export const DEFAULT_OPTIONS: ParseOptions = {
  hasHeader: true,
  delimiter: ",",
  trimValues: true,
};

export function parseCSV(
  csv: string,
  options: ParseOptions = DEFAULT_OPTIONS,
): {
  json: Record<string, string>[] | string[][];
  headers: string[];
  rowCount: number;
  colCount: number;
} {
  const lines = csv.trim().split("\n").filter(Boolean);
  if (lines.length === 0) {
    return { json: [], headers: [], rowCount: 0, colCount: 0 };
  }

  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === options.delimiter && !inQuotes) {
        result.push(options.trimValues ? current.trim() : current);
        current = "";
      } else {
        current += char;
      }
    }
    result.push(options.trimValues ? current.trim() : current);
    return result;
  };

  if (options.hasHeader) {
    const headers = parseRow(lines[0]);
    const rows = lines.slice(1).map((line) => {
      const values = parseRow(line);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] ?? "";
      });
      return obj;
    });
    return {
      json: rows,
      headers,
      rowCount: rows.length,
      colCount: headers.length,
    };
  }

  const rows = lines.map((line) => parseRow(line));
  return {
    json: rows,
    headers: [],
    rowCount: rows.length,
    colCount: rows[0]?.length ?? 0,
  };
}

export function detectDelimiter(csv: string): ParseOptions["delimiter"] {
  const firstLine = csv.split("\n")[0] || "";
  const counts = {
    ",": (firstLine.match(/,/g) || []).length,
    ";": (firstLine.match(/;/g) || []).length,
    "\t": (firstLine.match(/\t/g) || []).length,
    "|": (firstLine.match(/\|/g) || []).length,
  };
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as ParseOptions["delimiter"];
}
