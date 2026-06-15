export type NumberBase = "binary" | "decimal" | "hex" | "octal";

export function convert(
  value: string,
  from: NumberBase,
): {
  binary: string;
  decimal: string;
  hex: string;
  octal: string;
} {
  let decimal: number;

  switch (from) {
    case "binary":
      decimal = parseInt(value, 2);
      break;
    case "decimal":
      decimal = parseInt(value, 10);
      break;
    case "hex":
      decimal = parseInt(value, 16);
      break;
    case "octal":
      decimal = parseInt(value, 8);
      break;
    default:
      decimal = 0;
  }

  if (isNaN(decimal)) {
    throw new Error("Invalid number for the selected base");
  }

  return {
    binary: decimal.toString(2),
    decimal: decimal.toString(10),
    hex: decimal.toString(16).toUpperCase(),
    octal: decimal.toString(8),
  };
}

export function validateInput(value: string, base: NumberBase): boolean {
  if (!value) return true;
  const patterns = {
    binary: /^[01]+$/,
    decimal: /^[0-9]+$/,
    hex: /^[0-9A-Fa-f]+$/,
    octal: /^[0-7]+$/,
  };
  return patterns[base].test(value);
}
