export type ParsedTimestamp = {
  milliseconds: number;
  seconds: number;
  unit: "seconds" | "milliseconds";
};

export type FormattedTimestamps = {
  utc: string;
  local: string;
  timezone: string;
};

export function getCurrentTimestamps(): { seconds: number; milliseconds: number } {
  const milliseconds = Date.now();
  return {
    milliseconds,
    seconds: Math.floor(milliseconds / 1000),
  };
}

export function parseTimestampInput(raw: string): ParsedTimestamp | null {
  const trimmed = raw.trim();
  if (!/^-?\d+$/.test(trimmed)) return null;

  const value = Number(trimmed);
  if (!Number.isFinite(value)) return null;

  if (trimmed.length <= 10) {
    return {
      seconds: value,
      milliseconds: value * 1000,
      unit: "seconds",
    };
  }

  return {
    milliseconds: value,
    seconds: Math.floor(value / 1000),
    unit: "milliseconds",
  };
}

export function formatTimestampDates(ms: number): FormattedTimestamps | null {
  if (!Number.isFinite(ms)) return null;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return null;

  const utc = date.toLocaleString("en-US", {
    timeZone: "UTC",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });

  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Local";

  const local = date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });

  return { utc, local, timezone };
}

export function dateInputToTimestamps(value: string): {
  seconds: number;
  milliseconds: number;
} | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const milliseconds = date.getTime();
  return {
    milliseconds,
    seconds: Math.floor(milliseconds / 1000),
  };
}

export function getLocalDatetimeInputValue(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
