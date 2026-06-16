import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CURRENCY_DEFAULT_COOKIE = "wu-currency-default";
const CURRENCY_OVERRIDE_COOKIE = "wu-currency-override";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const hasOverride = request.cookies.has(CURRENCY_OVERRIDE_COOKIE);
  const hasDefault = request.cookies.has(CURRENCY_DEFAULT_COOKIE);

  if (!hasOverride && !hasDefault) {
    const country =
      request.geo?.country ??
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry");

    const currency = country === "IN" ? "INR" : "USD";
    response.cookies.set(CURRENCY_DEFAULT_COOKIE, currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
