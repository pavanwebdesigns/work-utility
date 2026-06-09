export interface AdminAnalyticsPayload {
  overview: {
    totalVisitors30d: number;
    totalPageviews30d: number;
    uniqueVisitorsToday: number;
    pageviewsToday: number;
  };
  topTools: Array<{
    name: string;
    path: string;
    pageviews: number;
    visitors: number;
    percent: number;
  }>;
  trafficOverTime: Array<{ date: string; visitors: number }>;
  referrers: Array<{ name: string; visitors: number; percent: number }>;
  devices: Array<{ name: string; visitors: number; percent: number }>;
  countries: Array<{ name: string; visitors: number; percent: number }>;
  lastUpdated: string;
}
