import { timingSafeEqual } from "node:crypto";

/**
 * Admin API auth — password gate for `/api/admin/*`.
 *
 * Protection is enforced **inside each route handler** (not middleware):
 * - `POST /api/admin/auth` — body `{ password }` checked with `verifyAdminPassword`
 * - `GET /api/admin/analytics` — `Authorization: Bearer <password>` checked the same way
 *
 * Middleware does not protect `/api/admin/*` (currency middleware only matches
 * a fixed list of calculator tool paths). Never rely on middleware alone here.
 */
export function verifyAdminPassword(
  password: string | null | undefined,
): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;

  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(password);
  if (expectedBuf.length !== providedBuf.length) return false;

  try {
    return timingSafeEqual(expectedBuf, providedBuf);
  } catch {
    return false;
  }
}

/** Extract Bearer token from an Authorization header, if present. */
export function getBearerPassword(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7).trim() || null;
  }
  return null;
}

/**
 * Shared guard for admin route handlers. Returns a 401 Response when the
 * Bearer password is missing or wrong; otherwise null (caller may proceed).
 */
export function requireAdminBearer(request: Request): Response | null {
  if (!verifyAdminPassword(getBearerPassword(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
