export type NoticePeriodResult = {
  resignationDate: Date;
  lastWorkingDay: Date;
  daysRemaining: number;
  weeksRemaining: number;
  noticeDays: number;
  calendarDays: Date[];
};

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function addCalendarDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addWorkingDays(start: Date, workingDays: number): Date {
  const result = new Date(start);
  let added = 0;

  while (added < workingDays) {
    result.setDate(result.getDate() + 1);
    if (!isWeekend(result)) {
      added += 1;
    }
  }

  return result;
}

function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function differenceInCalendarDays(from: Date, to: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round(
    (startOfDay(to).getTime() - startOfDay(from).getTime()) / msPerDay
  );
}

function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date(year, month, 1);

  while (cursor.getMonth() === month) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

export function calculateNoticePeriod(
  resignationDateInput: string,
  noticeDays: number,
  workingDaysOnly: boolean
): NoticePeriodResult | null {
  if (!resignationDateInput || noticeDays <= 0) return null;

  const resignationDate = startOfDay(new Date(resignationDateInput));
  if (Number.isNaN(resignationDate.getTime())) return null;

  const lastWorkingDay = workingDaysOnly
    ? addWorkingDays(resignationDate, noticeDays)
    : addCalendarDays(resignationDate, noticeDays);

  const today = startOfDay(new Date());
  const daysRemaining = Math.max(0, differenceInCalendarDays(today, lastWorkingDay));
  const weeksRemaining = daysRemaining / 7;

  const calendarDays = getMonthDays(
    resignationDate.getFullYear(),
    resignationDate.getMonth()
  );

  if (lastWorkingDay.getMonth() !== resignationDate.getMonth()) {
    calendarDays.push(
      ...getMonthDays(lastWorkingDay.getFullYear(), lastWorkingDay.getMonth())
    );
  }

  return {
    resignationDate,
    lastWorkingDay,
    daysRemaining,
    weeksRemaining,
    noticeDays,
    calendarDays,
  };
}

export function calculateNoticeBuyout(
  monthlySalary: number,
  daysRemaining: number
): number | null {
  if (monthlySalary <= 0 || daysRemaining <= 0) return null;
  const dailySalary = monthlySalary / 30;
  return dailySalary * daysRemaining;
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const value = startOfDay(date).getTime();
  return value >= startOfDay(start).getTime() && value <= startOfDay(end).getTime();
}

export function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}
