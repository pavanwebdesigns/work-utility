export type JsonToCsvResult = {
  csv: string;
  headers: string[];
  rowCount: number;
  warnings: string[];
};

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function flattenValue(value: unknown, prefix: string): Record<string, string> {
  if (value === null || value === undefined) {
    return { [prefix]: "" };
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return { [prefix]: "" };

    const flattened: Record<string, string> = {};
    for (const [key, nested] of entries) {
      const nextKey = `${prefix}.${key}`;
      if (
        nested !== null &&
        typeof nested === "object" &&
        !Array.isArray(nested)
      ) {
        Object.assign(flattened, flattenValue(nested, nextKey));
      } else if (Array.isArray(nested)) {
        flattened[nextKey] = JSON.stringify(nested);
      } else {
        flattened[nextKey] =
          nested === null || nested === undefined ? "" : String(nested);
      }
    }
    return flattened;
  }

  if (Array.isArray(value)) {
    return { [prefix]: JSON.stringify(value) };
  }

  return { [prefix]: String(value) };
}

function flattenRow(row: Record<string, unknown>): {
  flat: Record<string, string>;
  warnings: string[];
} {
  const flat: Record<string, string> = {};
  const warnings: string[] = [];

  for (const [key, value] of Object.entries(row)) {
    if (value === null || value === undefined) {
      flat[key] = "";
      continue;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      const nestedKeys = Object.keys(value as Record<string, unknown>);
      const hasDeepNesting = nestedKeys.some((nestedKey) => {
        const nestedValue = (value as Record<string, unknown>)[nestedKey];
        return (
          nestedValue !== null &&
          typeof nestedValue === "object" &&
          !Array.isArray(nestedValue)
        );
      });

      if (hasDeepNesting) {
        warnings.push(
          `Field "${key}" contains nested objects beyond one level — flattened with dot notation.`
        );
      } else {
        warnings.push(
          `Field "${key}" is a nested object — flattened to columns like "${key}.subfield".`
        );
      }

      Object.assign(flat, flattenValue(value, key));
      continue;
    }

    if (Array.isArray(value)) {
      flat[key] = JSON.stringify(value);
      warnings.push(
        `Field "${key}" is an array — stored as JSON text in one CSV column.`
      );
      continue;
    }

    flat[key] = String(value);
  }

  return { flat, warnings };
}

export function convertJsonToCsv(input: string): JsonToCsvResult | { error: string } {
  if (!input.trim()) {
    return { error: "Paste a JSON array of objects to convert." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    return {
      error:
        "Invalid JSON. Provide an array of objects, e.g. [{\"name\":\"Alice\",\"email\":\"a@example.com\"}].",
    };
  }

  if (!Array.isArray(parsed)) {
    return {
      error:
        "JSON must be an array of objects. Each object becomes one CSV row.",
    };
  }

  if (parsed.length === 0) {
    return { error: "The JSON array is empty — add at least one object." };
  }

  const rows: Record<string, string>[] = [];
  const warnings = new Set<string>();

  for (let i = 0; i < parsed.length; i++) {
    const item = parsed[i];
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      return {
        error: `Row ${i + 1} is not a plain object. Each array item must be an object with consistent keys.`,
      };
    }
    const { flat, warnings: rowWarnings } = flattenRow(
      item as Record<string, unknown>
    );
    rowWarnings.forEach((w) => warnings.add(w));
    rows.push(flat);
  }

  const headerSet = new Set<string>();
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => headerSet.add(key));
  });
  const headers = Array.from(headerSet);

  const lines = [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCsvValue(row[header] ?? "")).join(",")
    ),
  ];

  return {
    csv: lines.join("\n"),
    headers,
    rowCount: rows.length,
    warnings: Array.from(warnings),
  };
}

export const EXAMPLE_JSON_TO_CSV = `[
  {"name": "Alice", "email": "alice@example.com", "city": "Mumbai"},
  {"name": "Bob", "email": "bob@example.com", "city": "Delhi"},
  {"name": "Carol", "email": "carol@example.com", "city": "Bangalore"}
]`;
