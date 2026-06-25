export type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
  birthDayOfWeek: string;
  isBirthdayToday: boolean;
};

export function parseDateInput(value: string): Date | null {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function calculateAge(
  dateOfBirth: Date,
  referenceDate: Date = new Date()
): AgeResult | null {
  const dob = startOfDay(dateOfBirth);
  const today = startOfDay(referenceDate);

  if (dob > today) {
    return null;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += daysInPreviousMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

  if (nextBirthday < today) {
    nextBirthday = new Date(today.getFullYear() + 1, dob.getMonth(), dob.getDate());
  }

  const isBirthdayToday =
    today.getMonth() === dob.getMonth() && today.getDate() === dob.getDate();

  const nextBirthdayDays = isBirthdayToday
    ? 0
    : Math.round(
        (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

  const totalDays = Math.floor(
    (today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  const nextBirthdayDate = nextBirthday.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const birthDayOfWeek = dob.toLocaleDateString("en-IN", { weekday: "long" });

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    nextBirthdayDays,
    nextBirthdayDate,
    birthDayOfWeek,
    isBirthdayToday,
  };
}
