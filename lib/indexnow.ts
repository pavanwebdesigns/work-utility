import { getSiteMapEntries } from "@/app/sitemap";

export const INDEXNOW_HOST = "workutilities.com";

export function getIndexNowUrls(): string[] {
  return getSiteMapEntries().map((entry) => entry.url);
}

export function getIndexNowKey(): string | undefined {
  return process.env.INDEXNOW_KEY?.trim();
}

export function getIndexNowKeyLocation(key: string): string {
  return `https://${INDEXNOW_HOST}/${key}.txt`;
}
