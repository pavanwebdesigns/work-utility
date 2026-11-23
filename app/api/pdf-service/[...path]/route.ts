import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
/** Large PDF uploads; keep under Vercel hobby / plan limits. */
export const maxDuration = 60;

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

function getUpstreamBase(): string | null {
  const base = process.env.NEXT_PUBLIC_PDF_API_URL?.trim();
  if (!base) return null;
  return base.replace(/\/$/, "");
}

async function proxyRequest(
  request: NextRequest,
  context: RouteContext,
): Promise<Response> {
  const upstreamBase = getUpstreamBase();
  if (!upstreamBase) {
    return NextResponse.json(
      { detail: "PDF API is not configured" },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  if (!path?.length) {
    return NextResponse.json({ detail: "Missing upstream path" }, { status: 400 });
  }

  // Prevent path traversal / absolute-URL smuggling into the upstream host.
  if (path.some((segment) => segment === ".." || segment.includes("://"))) {
    return NextResponse.json({ detail: "Invalid path" }, { status: 400 });
  }

  const incoming = new URL(request.url);
  const target = `${upstreamBase}/${path.map(encodeURIComponent).join("/")}${incoming.search}`;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const accept = request.headers.get("accept");
  if (accept) headers.set("accept", accept);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  let upstream: Response;
  try {
    upstream = await fetch(target, init);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upstream request failed";
    return NextResponse.json({ detail: message }, { status: 502 });
  }

  const responseHeaders = new Headers();
  const passThrough = [
    "content-type",
    "content-disposition",
    "content-length",
    "cache-control",
    "x-original-size",
    "x-compressed-size",
    "x-cache-age",
    "x-conversion-method",
  ];
  for (const name of passThrough) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function OPTIONS() {
  // Same-origin browser calls do not need CORS; answer preflight cleanly anyway.
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, accept",
      "Access-Control-Max-Age": "600",
    },
  });
}
