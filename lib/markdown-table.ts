export type ColumnAlignment = "left" | "center" | "right";

export type TableCell = string;

export function createEmptyGrid(
  cols: number,
  rows: number,
): TableCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ""),
  );
}

export function alignmentSeparator(align: ColumnAlignment): string {
  if (align === "center") return ":---:";
  if (align === "right") return "---:";
  return "---";
}

export function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").trim();
}

export function generateMarkdownTable(
  grid: TableCell[][],
  alignments: ColumnAlignment[],
): string {
  if (grid.length === 0 || grid[0].length === 0) return "";

  const cols = grid[0].length;
  const header = grid[0];
  const body = grid.slice(1);

  const headerRow = `| ${header.map((c) => escapeCell(c) || " ").join(" | ")} |`;
  const separatorRow = `| ${alignments
    .slice(0, cols)
    .map((a) => alignmentSeparator(a))
    .join(" | ")} |`;
  const bodyRows = body.map(
    (row) =>
      `| ${row
        .slice(0, cols)
        .map((c) => escapeCell(c) || " ")
        .join(" | ")} |`,
  );

  return [headerRow, separatorRow, ...bodyRows].join("\n");
}

export function generateHtmlTable(grid: TableCell[][]): string {
  if (grid.length === 0 || grid[0].length === 0) return "";

  const header = grid[0];
  const body = grid.slice(1);
  const cols = header.length;

  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const th = header
    .map((c) => `    <th>${escapeHtml(c)}</th>`)
    .join("\n");
  const rows = body
    .map((row) => {
      const tds = row
        .slice(0, cols)
        .map((c) => `      <td>${escapeHtml(c)}</td>`)
        .join("\n");
      return `    <tr>\n${tds}\n    </tr>`;
    })
    .join("\n");

  return `<table>
  <thead>
    <tr>
${th}
    </tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>`;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((ch === "," || ch === "\t") && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseCsvToGrid(text: string): TableCell[][] | null {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0);

  if (lines.length === 0) return null;

  const rows = lines.map(parseCsvLine);
  const maxCols = Math.max(...rows.map((r) => r.length));
  if (maxCols === 0) return null;

  return rows.map((row) => {
    const padded = [...row];
    while (padded.length < maxCols) padded.push("");
    return padded;
  });
}

export const DEFAULT_TABLE_GRID: TableCell[][] = [
  ["Name", "Age", "City"],
  ["Alice", "30", "Mumbai"],
  ["Bob", "25", "Delhi"],
];

export const DEFAULT_ALIGNMENTS: ColumnAlignment[] = ["left", "left", "left"];
