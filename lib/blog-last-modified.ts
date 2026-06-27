const MONTH_INDEX: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

/** Parse `lastUpdated` from posts.ts (e.g. "June 2026") for sitemap lastmod. */
export function parseBlogLastUpdated(lastUpdated: string): Date {
  const match = lastUpdated.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) {
    return new Date();
  }

  const month = MONTH_INDEX[match[1].toLowerCase()];
  const year = Number.parseInt(match[2], 10);
  if (month === undefined || Number.isNaN(year)) {
    return new Date();
  }

  // Month/year only — use the 1st of that month (UTC) as lastmod.
  return new Date(Date.UTC(year, month, 1));
}
