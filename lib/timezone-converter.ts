export const COMMON_TIMEZONES = [
  { label: "New York (EST/EDT)", value: "America/New_York" },
  { label: "Los Angeles (PST/PDT)", value: "America/Los_Angeles" },
  { label: "Chicago (CST/CDT)", value: "America/Chicago" },
  { label: "London (GMT/BST)", value: "Europe/London" },
  { label: "Mumbai/Delhi (IST)", value: "Asia/Kolkata" },
  { label: "Dubai (GST)", value: "Asia/Dubai" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "Sydney (AEST/AEDT)", value: "Australia/Sydney" },
  { label: "Berlin (CET/CEST)", value: "Europe/Berlin" },
];

export function convertTime(date: Date, toTz: string): string {
  return date.toLocaleString("en-US", {
    timeZone: toTz,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getCurrentTimeInZone(tz: string): string {
  return new Date().toLocaleString("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function getTimezoneOffset(tz: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(now);
  const offsetPart = parts.find((p) => p.type === "timeZoneName");
  return offsetPart?.value || "";
}
