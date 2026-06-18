export type DaysBetweenResult = {
  totalDays: number;
  absoluteDays: number;
  years: number;
  months: number;
  days: number;
  isSameDay: boolean;
  relativeToToday: string | null;
};

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

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

function calendarDifference(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPreviousMonth = new Date(
      end.getFullYear(),
      end.getMonth(),
      0,
    ).getDate();
    days += daysInPreviousMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export function calculateDaysBetween(
  startDate: Date,
  endDate: Date,
  today: Date = new Date(),
): DaysBetweenResult {
  const start = startOfDay(startDate);
  const end = startOfDay(endDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.round((end.getTime() - start.getTime()) / msPerDay);
  const absoluteDays = Math.abs(totalDays);

  const earlier = totalDays >= 0 ? start : end;
  const later = totalDays >= 0 ? end : start;
  const breakdown = calendarDifference(earlier, later);

  const todayStart = startOfDay(today);
  let relativeToToday: string | null = null;

  if (end.getTime() === todayStart.getTime()) {
    relativeToToday = "End date is today";
  } else if (end > todayStart) {
    const daysUntil = Math.round(
      (end.getTime() - todayStart.getTime()) / msPerDay,
    );
    relativeToToday = `${daysUntil} day${daysUntil === 1 ? "" : "s"} from now`;
  } else if (end < todayStart) {
    const daysAgo = Math.round(
      (todayStart.getTime() - end.getTime()) / msPerDay,
    );
    relativeToToday = `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  }

  return {
    totalDays,
    absoluteDays,
    years: breakdown.years,
    months: breakdown.months,
    days: breakdown.days,
    isSameDay: totalDays === 0,
    relativeToToday,
  };
}
