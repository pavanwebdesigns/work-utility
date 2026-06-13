const VERCEL_API = "https://api.vercel.com";
const VERCEL_WEB_API = "https://vercel.com/api";

export interface VercelOverview {
  total: number;
  devices: number;
}

export interface VercelTimeseriesPoint {
  key: string;
  total: number;
  devices: number;
}

interface TimeseriesResponse {
  data: {
    groups: Record<string, VercelTimeseriesPoint[]>;
  };
}

export interface BreakdownRow {
  key: string;
  pageviews: number;
  visitors: number;
}

import type { AdminAnalyticsPayload } from "@/lib/admin-analytics-types";

export type { AdminAnalyticsPayload };

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function toIso(date: Date): string {
  return date.toISOString();
}

function startOfUtcDay(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

async function vercelFetch<T>(
  base: string,
  path: string,
  token: string,
  query: Record<string, string | undefined>
): Promise<T> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value) params.set(key, value);
  }

  const url = `${base}${path}?${params.toString()}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const body = await response.text();

  if (!response.ok) {
    let message = body;
    try {
      const parsed = JSON.parse(body) as {
        error?: { message?: string; code?: string };
      };
      message = parsed.error?.message ?? body;
    } catch {
      // keep raw body
    }
    throw new Error(message || `Vercel API error (${response.status})`);
  }

  return JSON.parse(body) as T;
}

async function getTeamId(token: string, projectId: string): Promise<string> {
  const configuredTeamId = process.env.VERCEL_TEAM_ID;
  if (configuredTeamId) return configuredTeamId;

  const project = await vercelFetch<{ accountId?: string }>(
    VERCEL_API,
    `/v9/projects/${projectId}`,
    token,
    {}
  );

  if (!project.accountId) {
    throw new Error("Could not resolve Vercel team ID for this project.");
  }

  return project.accountId;
}

async function fetchOverview(
  token: string,
  projectId: string,
  teamId: string,
  from: Date,
  to: Date
): Promise<VercelOverview> {
  return vercelFetch<VercelOverview>(
    VERCEL_WEB_API,
    "/web-analytics/v2/overview",
    token,
    {
      projectId,
      teamId,
      from: toIso(from),
      to: toIso(to),
      environment: "production",
    }
  );
}

async function fetchTimeseries(
  token: string,
  projectId: string,
  teamId: string,
  from: Date,
  to: Date,
  groupBy?: string
): Promise<TimeseriesResponse> {
  return vercelFetch<TimeseriesResponse>(
    VERCEL_WEB_API,
    "/web-analytics/v2/timeseries",
    token,
    {
      projectId,
      teamId,
      from: toIso(from),
      to: toIso(to),
      environment: "production",
      groupBy,
    }
  );
}

function aggregateBreakdown(
  groups: Record<string, VercelTimeseriesPoint[]>,
  excludeKeys: string[] = ["all"]
): BreakdownRow[] {
  return Object.entries(groups)
    .filter(([key]) => !excludeKeys.includes(key))
    .map(([key, points]) => ({
      key,
      pageviews: points.reduce((sum, point) => sum + point.total, 0),
      visitors: points.reduce((sum, point) => sum + point.devices, 0),
    }))
    .sort((a, b) => b.pageviews - a.pageviews);
}

function withPercent<T extends { visitors: number }>(
  rows: T[],
  totalVisitors: number
): Array<T & { percent: number }> {
  return rows.map((row) => ({
    ...row,
    percent: totalVisitors > 0 ? (row.visitors / totalVisitors) * 100 : 0,
  }));
}

function formatReferrer(key: string): string {
  if (!key || key === "(none)" || key === "direct") return "Direct";
  try {
    const host = new URL(key.startsWith("http") ? key : `https://${key}`).hostname
      .replace(/^www\./, "")
      .toLowerCase();

    if (host.includes("google.")) return "Google";
    if (host.includes("bing.")) return "Bing";
    if (host.includes("facebook.") || host === "fb.com") return "Facebook";
    if (host.includes("twitter.") || host === "t.co" || host === "x.com")
      return "X / Twitter";
    if (host.includes("linkedin.")) return "LinkedIn";
    if (host.includes("instagram.")) return "Instagram";

    return host;
  } catch {
    return key;
  }
}

function formatDevice(key: string): string {
  const normalized = key.toLowerCase();
  if (normalized.includes("mobile") || normalized === "phone") return "Mobile";
  if (normalized.includes("tablet")) return "Tablet";
  if (normalized.includes("desktop")) return "Desktop";
  return key || "Unknown";
}

const TOOL_PATH_NAMES: Record<string, string> = {
  "/tools/pdf-compress": "PDF Compress",
  "/tools/pdf-merge": "PDF Merge",
  "/tools/pdf-split": "PDF Split",
  "/tools/pdf-unlock": "Remove PDF Password",
  "/tools/pdf-to-jpg": "PDF to JPG",
  "/tools/pdf-to-word": "PDF to Word",
  "/tools/word-to-pdf": "Word to PDF",
  "/tools/image-compress": "Image Compress",
  "/tools/image-converter": "Image to JPG/PNG",
  "/tools/bg-remove": "Background Remover",
  "/tools/photo-resizer": "Photo Resizer",
  "/tools/image-to-pdf": "Image to PDF",
  "/tools/word-counter": "Word Counter",
  "/tools/age-calculator": "Age Calculator",
  "/tools/qr-code-generator": "QR Code Generator",
  "/tools/emi-calculator": "EMI Calculator",
  "/tools/gst-calculator": "GST Calculator",
  "/tools/salary-hike-calculator": "Salary Hike Calculator",
  "/tools/cgpa-to-percentage": "CGPA to Percentage",
  "/tools/ctc-calculator": "CTC to In-Hand Salary",
  "/tools/fd-calculator": "FD Calculator",
};

function getToolName(path: string): string {
  return TOOL_PATH_NAMES[path] ?? path;
}

export async function fetchAdminAnalytics(): Promise<AdminAnalyticsPayload> {
  const token = getEnv("VERCEL_API_TOKEN");
  const projectId = getEnv("VERCEL_PROJECT_ID");
  const teamId = await getTeamId(token, projectId);

  const now = new Date();
  const from30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const fromToday = startOfUtcDay(now);

  const [
    overview30d,
    overviewToday,
    timeseriesAll,
    timeseriesPaths,
    timeseriesReferrers,
    timeseriesDevices,
    timeseriesCountries,
  ] = await Promise.all([
    fetchOverview(token, projectId, teamId, from30d, now),
    fetchOverview(token, projectId, teamId, fromToday, now),
    fetchTimeseries(token, projectId, teamId, from30d, now),
    fetchTimeseries(token, projectId, teamId, from30d, now, "path"),
    fetchTimeseries(token, projectId, teamId, from30d, now, "referrer"),
    fetchTimeseries(token, projectId, teamId, from30d, now, "device_type"),
    fetchTimeseries(token, projectId, teamId, from30d, now, "country"),
  ]);

  const dailyPoints = timeseriesAll.data.groups.all ?? [];
  const trafficOverTime = dailyPoints
    .map((point) => ({
      date: point.key.slice(0, 10),
      visitors: point.devices,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const pathRows = aggregateBreakdown(timeseriesPaths.data.groups).filter((row) =>
    row.key.startsWith("/tools/")
  );

  const totalToolPageviews = pathRows.reduce((sum, row) => sum + row.pageviews, 0);

  const topTools = pathRows.map((row) => ({
    name: getToolName(row.key),
    path: row.key,
    pageviews: row.pageviews,
    visitors: row.visitors,
    percent:
      totalToolPageviews > 0 ? (row.pageviews / totalToolPageviews) * 100 : 0,
  }));

  const referrerRows = aggregateBreakdown(timeseriesReferrers.data.groups);
  const referrerTotal = referrerRows.reduce((sum, row) => sum + row.visitors, 0);
  const referrers = withPercent(
    referrerRows.slice(0, 8).map((row) => ({
      name: formatReferrer(row.key),
      visitors: row.visitors,
    })),
    referrerTotal
  );

  const deviceRows = aggregateBreakdown(timeseriesDevices.data.groups);
  const deviceTotal = deviceRows.reduce((sum, row) => sum + row.visitors, 0);
  const devices = withPercent(
    deviceRows.map((row) => ({
      name: formatDevice(row.key),
      visitors: row.visitors,
    })),
    deviceTotal
  );

  const countryRows = aggregateBreakdown(timeseriesCountries.data.groups);
  const countryTotal = countryRows.reduce((sum, row) => sum + row.visitors, 0);
  const countries = withPercent(
    countryRows.slice(0, 5).map((row) => ({
      name: row.key || "Unknown",
      visitors: row.visitors,
    })),
    countryTotal
  );

  return {
    overview: {
      totalVisitors30d: overview30d.devices,
      totalPageviews30d: overview30d.total,
      uniqueVisitorsToday: overviewToday.devices,
      pageviewsToday: overviewToday.total,
    },
    topTools,
    trafficOverTime,
    referrers,
    devices,
    countries,
    lastUpdated: now.toISOString(),
  };
}

export function verifyAdminPassword(password: string | null | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  return password === expected;
}
