const ROMAN_VALUES: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const ROMAN_SYMBOL_VALUES: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export function numberToRoman(value: number): string | null {
  if (!Number.isInteger(value) || value < 1 || value > 3999) {
    return null;
  }

  let remaining = value;
  let result = "";

  for (const [amount, symbol] of ROMAN_VALUES) {
    while (remaining >= amount) {
      result += symbol;
      remaining -= amount;
    }
  }

  return result;
}

export function romanToNumber(input: string): number | null {
  const roman = input.trim().toUpperCase();
  if (!roman || !/^[IVXLCDM]+$/.test(roman)) {
    return null;
  }

  let total = 0;
  for (let index = 0; index < roman.length; index += 1) {
    const current = ROMAN_SYMBOL_VALUES[roman[index]];
    const next = ROMAN_SYMBOL_VALUES[roman[index + 1]];

    if (!current) return null;

    if (next && current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  const roundTrip = numberToRoman(total);
  if (!roundTrip || roundTrip !== roman) {
    return null;
  }

  return total;
}
