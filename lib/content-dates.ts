import dates from "./content-dates.json";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type PostDates = {
  publishedAt: string;
  updatedAt: string;
};

export function getPostDates(slug: string): PostDates {
  const row = dates.posts[slug as keyof typeof dates.posts] as PostDates | undefined;
  if (!row?.publishedAt || !row.updatedAt) {
    throw new Error(`Missing git dates for blog post "${slug}"`);
  }
  return row;
}

export function getLastModified(pathname: string): Date {
  const iso = dates.lastmod[pathname as keyof typeof dates.lastmod];
  if (!iso) {
    throw new Error(`Missing git lastmod for "${pathname}"`);
  }
  return new Date(iso);
}

/** `d MMM yyyy` from the calendar date stored in the git timestamp. */
export function formatContentDate(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    throw new Error(`Invalid content date "${iso}"`);
  }
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) {
    throw new Error(`Invalid content date "${iso}"`);
  }
  return `${Number(match[3])} ${month} ${match[1]}`;
}

export function sameContentDay(a: string, b: string): boolean {
  return a.slice(0, 10) === b.slice(0, 10);
}
