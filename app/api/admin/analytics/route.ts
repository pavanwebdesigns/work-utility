import { NextResponse } from "next/server";
import {
  fetchAdminAnalytics,
  verifyAdminPassword,
} from "@/lib/vercel-analytics-api";

function getPasswordFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }
  return null;
}

export async function GET(request: Request) {
  const password = getPasswordFromRequest(request);

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
