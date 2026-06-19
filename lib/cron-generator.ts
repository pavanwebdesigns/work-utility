export type CronFields = {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
};

export type CronPreset = {
  id: string;
  label: string;
  expression: string;
  fields: CronFields;
};

export const DEFAULT_CRON_FIELDS: CronFields = {
  minute: "0",
  hour: "9",
  dayOfMonth: "*",
  month: "*",
  dayOfWeek: "1-5",
};

export const CRON_PRESETS: CronPreset[] = [
  {
    id: "every-minute",
    label: "Every minute",
    expression: "* * * * *",
    fields: { minute: "*", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" },
  },
  {
    id: "every-hour",
    label: "Every hour",
    expression: "0 * * * *",
    fields: { minute: "0", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" },
  },
  {
    id: "daily-midnight",
    label: "Every day at midnight",
    expression: "0 0 * * *",
    fields: { minute: "0", hour: "0", dayOfMonth: "*", month: "*", dayOfWeek: "*" },
  },
  {
    id: "weekday-9am",
    label: "Every weekday at 9 AM",
    expression: "0 9 * * 1-5",
    fields: { minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "1-5" },
  },
  {
    id: "sunday-midnight",
    label: "Every Sunday at midnight",
    expression: "0 0 * * 0",
    fields: { minute: "0", hour: "0", dayOfMonth: "*", month: "*", dayOfWeek: "0" },
  },
  {
    id: "first-of-month",
    label: "First day of month at midnight",
    expression: "0 0 1 * *",
    fields: { minute: "0", hour: "0", dayOfMonth: "1", month: "*", dayOfWeek: "*" },
  },
];

export function fieldsToExpression(fields: CronFields): string {
  return `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
}

export function parseCronExpression(expression: string): CronFields | null {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  if (![minute, hour, dayOfMonth, month, dayOfWeek].every(Boolean)) return null;
  return { minute, hour, dayOfMonth, month, dayOfWeek };
}

function describeField(
  value: string,
  everyLabel: string,
  labels?: Record<string, string>,
): string {
  if (value === "*") return everyLabel;
  if (labels?.[value]) return labels[value];
  if (value.includes("/")) {
    const [base, step] = value.split("/");
    if (base === "*") return `every ${step}`;
  }
  if (value.includes("-")) return value.replace("-", " to ");
  if (value.includes(",")) return value.split(",").join(", ");
  return value;
}

const WEEKDAYS: Record<string, string> = {
  "0": "Sunday",
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
  "7": "Sunday",
};

export function describeCron(fields: CronFields): string {
  const preset = CRON_PRESETS.find(
    (p) => p.expression === fieldsToExpression(fields),
  );
  if (preset) return preset.label;

  const minute = describeField(fields.minute, "every minute");
  const hour = describeField(fields.hour, "every hour");
  const dom = describeField(fields.dayOfMonth, "every day");
  const month = describeField(fields.month, "every month");
  const dow = describeField(fields.dayOfWeek, "every day of week", WEEKDAYS);

  if (
    fields.minute === "0" &&
    fields.hour !== "*" &&
    fields.dayOfMonth === "*" &&
    fields.month === "*" &&
    fields.dayOfWeek === "1-5"
  ) {
    return `Every weekday at ${fields.hour}:00`;
  }

  if (
    fields.minute !== "*" &&
    fields.hour !== "*" &&
    fields.dayOfMonth === "*" &&
    fields.month === "*" &&
    fields.dayOfWeek === "*"
  ) {
    return `At ${fields.hour.padStart(2, "0")}:${fields.minute.padStart(2, "0")} every day`;
  }

  return `Minute: ${minute}; Hour: ${hour}; Day: ${dom}; Month: ${month}; Weekday: ${dow}`;
}

function matchesField(value: number, field: string, min: number): boolean {
  if (field === "*") return true;

  for (const part of field.split(",")) {
    if (part.includes("/")) {
      const [base, stepStr] = part.split("/");
      const step = Number(stepStr);
      const start = base === "*" ? min : Number(base);
      if (step > 0 && value >= start && (value - start) % step === 0) return true;
      continue;
    }
    if (part.includes("-")) {
      const [a, b] = part.split("-").map(Number);
      if (value >= a && value <= b) return true;
      continue;
    }
    if (Number(part) === value) return true;
  }

  return false;
}

export function getNextCronRuns(
  fields: CronFields,
  count = 5,
  from = new Date(),
): Date[] {
  const runs: Date[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  let guard = 0;
  while (runs.length < count && guard < 525600) {
    guard += 1;
    const minute = cursor.getMinutes();
    const hour = cursor.getHours();
    const dom = cursor.getDate();
    const month = cursor.getMonth() + 1;
    const dow = cursor.getDay();

    if (
      matchesField(minute, fields.minute, 0) &&
      matchesField(hour, fields.hour, 0) &&
      matchesField(dom, fields.dayOfMonth, 1) &&
      matchesField(month, fields.month, 1) &&
      matchesField(dow, fields.dayOfWeek, 0)
    ) {
      runs.push(new Date(cursor));
    }

    cursor.setMinutes(cursor.getMinutes() + 1);
  }

  return runs;
}

export function formatCronRunDate(date: Date): string {
  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
