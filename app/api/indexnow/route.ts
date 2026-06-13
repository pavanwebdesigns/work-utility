import { NextResponse } from "next/server";
import {
  getIndexNowKey,
  getIndexNowKeyLocation,
  getIndexNowUrls,
  INDEXNOW_HOST,
} from "@/lib/indexnow";

export async function POST() {
  const key = getIndexNowKey();

  if (!key) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_KEY is not configured" },
      { status: 500 },
    );
  }

  const urlList = getIndexNowUrls();

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
        urlList,
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
      submitted: urlList.length,
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
