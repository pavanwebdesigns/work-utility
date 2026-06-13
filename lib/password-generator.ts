export type PasswordStrength = "Weak" | "Medium" | "Strong" | "Very Strong";

export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  count: number;
};

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?";
const AMBIGUOUS = "0O1lI";

function buildCharset(options: PasswordOptions): string {
  let charset = "";

  if (options.uppercase) charset += UPPERCASE;
  if (options.lowercase) charset += LOWERCASE;
  if (options.numbers) charset += NUMBERS;
  if (options.symbols) charset += SYMBOLS;

  if (options.excludeAmbiguous) {
    charset = charset
      .split("")
      .filter((char) => !AMBIGUOUS.includes(char))
      .join("");
  }

  return charset;
}

function getRandomIndex(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function pickRandomChar(charset: string): string {
  return charset[getRandomIndex(charset.length)];
}

function ensureRequiredChars(password: string[], options: PasswordOptions): string[] {
  const requiredSets: string[] = [];

  if (options.uppercase) {
    requiredSets.push(
      options.excludeAmbiguous
        ? UPPERCASE.replace(/[O]/g, "")
        : UPPERCASE
    );
  }
  if (options.lowercase) {
    requiredSets.push(
      options.excludeAmbiguous
        ? LOWERCASE.replace(/[l]/g, "")
        : LOWERCASE
    );
  }
  if (options.numbers) {
    requiredSets.push(
      options.excludeAmbiguous
        ? NUMBERS.replace(/[01]/g, "")
        : NUMBERS
    );
  }
  if (options.symbols) {
    requiredSets.push(SYMBOLS);
  }

  requiredSets.forEach((set, index) => {
    if (set.length > 0) {
      password[index] = pickRandomChar(set);
    }
  });

  return password;
}

export function generatePassword(options: PasswordOptions): string {
  const charset = buildCharset(options);
  if (!charset) {
    throw new Error("Select at least one character type.");
  }

  const chars = Array.from({ length: options.length }, () => pickRandomChar(charset));
  ensureRequiredChars(chars, options);

  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = getRandomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

export function generatePasswords(options: PasswordOptions): string[] {
  const count = Math.min(Math.max(options.count, 1), 10);
  return Array.from({ length: count }, () => generatePassword(options));
}

export function getPasswordStrength(
  password: string,
  options: PasswordOptions
): PasswordStrength {
  let score = 0;

  if (password.length >= 12) score += 2;
  else if (password.length >= 10) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const enabledTypes = [
    options.lowercase,
    options.uppercase,
    options.numbers,
    options.symbols,
  ].filter(Boolean).length;

  if (enabledTypes >= 3) score += 1;
  if (password.length >= 16 && enabledTypes >= 4) score += 1;

  if (score <= 2) return "Weak";
  if (score <= 4) return "Medium";
  if (score <= 6) return "Strong";
  return "Very Strong";
}

export function getStrengthColor(strength: PasswordStrength): string {
  switch (strength) {
    case "Weak":
      return "text-tool-pdf";
    case "Medium":
      return "text-tool-photo";
    case "Strong":
      return "text-brand-blue";
    case "Very Strong":
      return "text-tool-convert";
  }
}
