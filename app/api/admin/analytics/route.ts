import { NextResponse } from "next/server";
import { requireAdminBearer } from "@/lib/admin-auth";
import { fetchAdminAnalytics } from "@/lib/vercel-analytics-api";

export async function GET(request: Request) {
  // Handler-level auth (middleware does not cover /api/admin/*).
  const unauthorized = requireAdminBearer(request);
  if (unauthorized) return unauthorized;

  try {
    const data = await fetchAdminAnalytics();
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load analytics";

    return NextResponse.json(
      {
        error:
          message.includes("web_analytics_not_enabled") ||
          message.includes("Web Analytics is not enabled")
            ? "Web Analytics is not enabled or has no data yet. Enable @vercel/analytics on the site and deploy to production."
            : "Could not load analytics",
        details: message,
      },
      { status: 502 }
    );
  }
}
