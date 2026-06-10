import { NextResponse } from "next/server";
import {
  getIndexNowKey,
  getIndexNowKeyLocation,
  INDEXNOW_HOST,
  INDEXNOW_URLS,
} from "@/lib/indexnow";

export async function POST() {
  const key = getIndexNowKey();

  if (!key) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_KEY is not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key,
        keyLocation: getIndexNowKeyLocation(key),
        urlList: INDEXNOW_URLS,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "IndexNow submission failed",
          status: response.status,
          detail: text || undefined,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      ok: true,
      submitted: INDEXNOW_URLS.length,
      status: response.status,
      detail: text || "Accepted",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "IndexNow request failed";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}
