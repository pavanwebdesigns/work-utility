export function formatJSON(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
}

export function minifyJSON(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function validateJSON(input: string): {
  valid: boolean;
  error?: string;
} {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}

export function countJSON(input: string): {
  keys: number;
  values: number;
  arrays: number;
  objects: number;
} {
  try {
    const parsed = JSON.parse(input);
    let keys = 0;
    let values = 0;
    let arrays = 0;
    let objects = 0;

    const traverse = (obj: unknown): void => {
      if (Array.isArray(obj)) {
        arrays++;
        obj.forEach(traverse);
      } else if (obj && typeof obj === "object") {
        objects++;
        Object.entries(obj as Record<string, unknown>).forEach(([, v]) => {
          keys++;
          values++;
          traverse(v);
        });
      }
    };
    traverse(parsed);
    return { keys, values, arrays, objects };
  } catch {
    return { keys: 0, values: 0, arrays: 0, objects: 0 };
  }
}
