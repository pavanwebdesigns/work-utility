/**
 * Base URL for the Railway PDF/API service.
 *
 * Browser calls go through the same-origin proxy at `/api/pdf-service/*`
 * so Vercel preview origins (`*.vercel.app`) are not blocked by Railway
 * CORS (which currently allows only `https://workutilities.com` and
 * `http://localhost:3000`).
 *
 * Server-side code talks to Railway directly via NEXT_PUBLIC_PDF_API_URL.
 */
export function getPublicApiBaseUrl(missingMessage = "API is not configured"): string {
  if (typeof window !== "undefined") {
    return "/api/pdf-service";
  }

  const baseUrl = process.env.NEXT_PUBLIC_PDF_API_URL;
  if (!baseUrl) {
    throw new Error(missingMessage);
  }
  return baseUrl.replace(/\/$/, "");
}
