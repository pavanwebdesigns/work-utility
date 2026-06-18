export type LeapYearResult = {
  year: number;
  isLeapYear: boolean;
  explanation: string;
  nextLeapYear: number;
  previousLeapYear: number;
};

export function isLeapYear(year: number): boolean {
  if (!Number.isInteger(year)) return false;
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}

export function getLeapYearExplanation(year: number): string {
  if (isLeapYear(year)) {
    if (year % 400 === 0) {
      return `${year} is a leap year because it's divisible by 400.`;
    }
    return `${year} is a leap year because it's divisible by 4.`;
  }

  if (year % 100 === 0) {
    return `${year} is NOT a leap year — divisible by 100 but not by 400.`;
  }

  return `${year} is NOT a leap year — not divisible by 4.`;
}

export function findNextLeapYear(year: number): number {
  let candidate = year + 1;
  while (!isLeapYear(candidate)) {
    candidate += 1;
  }
  return candidate;
}

export function findPreviousLeapYear(year: number): number {
  let candidate = year - 1;
  while (!isLeapYear(candidate)) {
    candidate -= 1;
  }
  return candidate;
}

export function checkLeapYear(year: number): LeapYearResult | null {
  if (!Number.isInteger(year) || year < 1 || year > 9999) {
    return null;
  }

  return {
    year,
    isLeapYear: isLeapYear(year),
    explanation: getLeapYearExplanation(year),
    nextLeapYear: findNextLeapYear(year),
    previousLeapYear: findPreviousLeapYear(year),
  };
}
