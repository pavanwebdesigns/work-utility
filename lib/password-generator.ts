import zxcvbn from "zxcvbn";
import { WORDLIST } from "@/lib/wordlist";

export type GeneratorMode = "password" | "passphrase";

export type ZxcvbnScore = 0 | 1 | 2 | 3 | 4;

export type PasswordStrengthResult = {
  score: ZxcvbnScore;
  label: string;
  crackTime: string;
  colorClass: string;
  barClass: string;
};

export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  minNumbers: number;
  minSymbols: number;
};

export type PassphraseSeparator = "-" | "_" | " " | "." | "";

export type PassphraseOptions = {
  wordCount: number;
  separator: PassphraseSeparator;
  capitalize: boolean;
  includeNumber: boolean;
};

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*";
const AMBIGUOUS = "0Oo1lI|";

const SCORE_LABELS: Record<ZxcvbnScore, string> = {
  0: "Very Weak",
  1: "Weak",
  2: "Fair",
  3: "Strong",
  4: "Very Strong",
};

const SCORE_COLOR: Record<ZxcvbnScore, string> = {
  0: "text-red-400",
  1: "text-orange-400",
  2: "text-yellow-400",
  3: "text-lime-400",
  4: "text-emerald-400",
};

const SCORE_BAR: Record<ZxcvbnScore, string> = {
  0: "bg-red-500",
  1: "bg-orange-500",
  2: "bg-yellow-500",
  3: "bg-lime-500",
  4: "bg-emerald-500",
};

function getRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function pickRandomChar(charset: string): string {
  return charset[getRandomIndex(charset.length)];
}

function filterAmbiguous(charset: string, excludeAmbiguous: boolean): string {
  if (!excludeAmbiguous) return charset;
  return charset
    .split("")
    .filter((char) => !AMBIGUOUS.includes(char))
    .join("");
}

function buildCharset(options: PasswordOptions): string {
  let charset = "";
  if (options.uppercase) charset += UPPERCASE;
  if (options.lowercase) charset += LOWERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;
  return filterAmbiguous(charset, options.excludeAmbiguous);
}

function getCharsetForType(
  type: "uppercase" | "lowercase" | "numbers" | "symbols",
  options: PasswordOptions
): string {
  switch (type) {
    case "uppercase":
      return filterAmbiguous(UPPERCASE, options.excludeAmbiguous);
    case "lowercase":
      return filterAmbiguous(LOWERCASE, options.excludeAmbiguous);
    case "numbers":
      return filterAmbiguous(NUMBERS, options.excludeAmbiguous);
    case "symbols":
      return SYMBOLS;
  }
}

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = getRandomIndex(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ensureMinimumChars(
  password: string[],
  charset: string,
  options: PasswordOptions
): string[] {
  const result = [...password];
  let index = 0;

  const requirements: Array<{ enabled: boolean; count: number; type: keyof PasswordOptions | "numbers" | "symbols" }> = [
    { enabled: options.uppercase, count: 1, type: "uppercase" },
    { enabled: options.lowercase, count: 1, type: "lowercase" },
    { enabled: options.numbers, count: Math.max(1, options.minNumbers), type: "numbers" },
    { enabled: options.symbols, count: Math.max(1, options.minSymbols), type: "symbols" },
  ];

  for (const requirement of requirements) {
    if (!requirement.enabled) continue;
    const set = getCharsetForType(requirement.type as "uppercase" | "lowercase" | "numbers" | "symbols", options);
    if (!set) {
      throw new Error("Character set is empty after excluding ambiguous characters.");
    }
    for (let i = 0; i < requirement.count; i += 1) {
      result[index] = pickRandomChar(set);
      index += 1;
    }
  }

  for (let i = index; i < result.length; i += 1) {
    result[i] = pickRandomChar(charset);
  }

  return shuffle(result);
}

export function generatePassword(options: PasswordOptions): string {
  const length = Math.min(Math.max(options.length, 8), 128);
  const minNumbers = Math.min(Math.max(options.minNumbers, 0), 5);
  const minSymbols = Math.min(Math.max(options.minSymbols, 0), 5);

  const normalized: PasswordOptions = {
    ...options,
    length,
    minNumbers: options.numbers ? minNumbers : 0,
    minSymbols: options.symbols ? minSymbols : 0,
  };

  const charset = buildCharset(normalized);
  if (!charset) {
    throw new Error("Select at least one character type.");
  }

  const minimumRequired =
    (normalized.uppercase ? 1 : 0) +
    (normalized.lowercase ? 1 : 0) +
    (normalized.numbers ? normalized.minNumbers : 0) +
    (normalized.symbols ? normalized.minSymbols : 0);

  if (minimumRequired > length) {
    throw new Error(
      "Password length is too short for the minimum character requirements."
    );
  }

  const chars = Array.from({ length }, () => pickRandomChar(charset));
  return ensureMinimumChars(chars, charset, normalized).join("");
}

export function generatePasswords(
  options: PasswordOptions,
  count: number
): string[] {
  const total = Math.min(Math.max(count, 1), 20);
  return Array.from({ length: total }, () => generatePassword(options));
}

function pickRandomWord(): string {
  return WORDLIST[getRandomIndex(WORDLIST.length)];
}

function formatWord(word: string, capitalize: boolean): string {
  if (!capitalize) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generatePassphrase(options: PassphraseOptions): string {
  const wordCount = Math.min(Math.max(options.wordCount, 3), 8);
  const words = Array.from({ length: wordCount }, () =>
    formatWord(pickRandomWord(), options.capitalize)
  );

  let passphrase = words.join(options.separator);

  if (options.includeNumber) {
    const number = String(getRandomIndex(90) + 10);
    passphrase = options.separator
      ? `${passphrase}${options.separator}${number}`
      : `${passphrase}${number}`;
  }

  return passphrase;
}

export function analyzePasswordStrength(password: string): PasswordStrengthResult {
  const result = zxcvbn(password);
  const score = result.score as ZxcvbnScore;

  return {
    score,
    label: SCORE_LABELS[score],
    crackTime: String(
      result.crack_times_display.offline_slow_hashing_1e4_per_second
    ),
    colorClass: SCORE_COLOR[score],
    barClass: SCORE_BAR[score],
  };
}

export function formatTimeAgo(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  if (diffMs < 60_000) return "just now";
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hr ago`;
}
