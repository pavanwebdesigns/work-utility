export type StatusCategory = "1xx" | "2xx" | "3xx" | "4xx" | "5xx";

export interface StatusCode {
  code: number;
  name: string;
  category: StatusCategory;
  description: string;
  whenYoullSeeThis: string;
  commonCauses: string[];
  whatToDo: string;
  codeExample?: string;
}

export const HTTP_STATUS_CODES: StatusCode[] = [
  {
    code: 100,
    name: "Continue",
    category: "1xx",
    description: "The server has received the request headers and the client should proceed to send the body.",
    whenYoullSeeThis: "Large file uploads or when the client wants to check if the server will accept a request before sending a large payload.",
    commonCauses: ["Client sent Expect: 100-continue header", "Upload pre-check before POST body"],
    whatToDo: "Send the request body if you receive 100 Continue. Most browsers handle this automatically.",
  },
  {
    code: 101,
    name: "Switching Protocols",
    category: "1xx",
    description: "The server is switching protocols as requested by the client.",
    whenYoullSeeThis: "WebSocket handshake upgrades from HTTP to WebSocket protocol.",
    commonCauses: ["WebSocket connection upgrade", "Protocol negotiation"],
    whatToDo: "Expected during WebSocket setup — no action needed if upgrade succeeds.",
  },
  {
    code: 200,
    name: "OK",
    category: "2xx",
    description: "The request succeeded.",
    whenYoullSeeThis: "Successful GET, PUT, PATCH, or POST that returns data. The most common success response.",
    commonCauses: ["Resource fetched successfully", "Update applied", "Action completed"],
    whatToDo: "Parse the response body. Check response.status === 200 before using data.",
    codeExample: "const res = await fetch('/api/users');\nif (res.status === 200) { const data = await res.json(); }",
  },
  {
    code: 201,
    name: "Created",
    category: "2xx",
    description: "A new resource was successfully created.",
    whenYoullSeeThis: "POST requests that create a new record — REST APIs return 201 with a Location header pointing to the new resource.",
    commonCauses: ["New user registered", "New record inserted", "Resource created via POST"],
    whatToDo: "Read the Location header for the new resource URL. Parse response body for the created object ID.",
  },
  {
    code: 204,
    name: "No Content",
    category: "2xx",
    description: "The request succeeded but there is no response body.",
    whenYoullSeeThis: "Successful DELETE requests or PUT/PATCH updates where no data needs to be returned.",
    commonCauses: ["DELETE succeeded", "Update with no return payload", "Action completed silently"],
    whatToDo: "Do not call response.json() — there is no body. Treat as success if status is 204.",
  },
  {
    code: 206,
    name: "Partial Content",
    category: "2xx",
    description: "The server is delivering only part of the resource due to a range request.",
    whenYoullSeeThis: "Video streaming, resumable downloads, or byte-range requests on large files.",
    commonCauses: ["Range header in request", "Video player seeking", "Chunked file download"],
    whatToDo: "Check Content-Range header. Combine chunks if building a full file client-side.",
  },
  {
    code: 301,
    name: "Moved Permanently",
    category: "3xx",
    description: "The resource has permanently moved to a new URL.",
    whenYoullSeeThis: "Old URLs redirected to new ones. Search engines transfer SEO authority to the new URL.",
    commonCauses: ["Domain migration", "URL structure change", "HTTP to HTTPS redirect"],
    whatToDo: "Update your links to the new URL. Browsers cache 301 redirects — clear cache if testing.",
  },
  {
    code: 302,
    name: "Found",
    category: "3xx",
    description: "The resource is temporarily at a different URL.",
    whenYoullSeeThis: "Temporary redirects, login flows, or post-form redirects.",
    commonCauses: ["Temporary maintenance redirect", "Login redirect", "Legacy redirect behavior"],
    whatToDo: "Follow the Location header. Do not cache — the redirect is temporary.",
  },
  {
    code: 304,
    name: "Not Modified",
    category: "3xx",
    description: "The cached version is still valid — no body is sent.",
    whenYoullSeeThis: "Conditional GET requests with If-None-Match or If-Modified-Since headers.",
    commonCauses: ["Browser cache validation", "ETag match", "CDN cache hit"],
    whatToDo: "Use your cached copy. No network body to parse.",
  },
  {
    code: 307,
    name: "Temporary Redirect",
    category: "3xx",
    description: "Temporary redirect that preserves the original HTTP method.",
    whenYoullSeeThis: "API redirects where POST must stay POST (unlike 302 which may change to GET).",
    commonCauses: ["Temporary URL change", "Load balancer redirect", "OAuth callback redirect"],
    whatToDo: "Re-send the request to the Location URL with the same HTTP method.",
  },
  {
    code: 308,
    name: "Permanent Redirect",
    category: "3xx",
    description: "Permanent redirect that preserves the original HTTP method.",
    whenYoullSeeThis: "Permanent API endpoint moves where method must be preserved (POST stays POST).",
    commonCauses: ["API version migration", "Permanent endpoint rename"],
    whatToDo: "Update client code to use the new URL permanently. Method is preserved.",
  },
  {
    code: 400,
    name: "Bad Request",
    category: "4xx",
    description: "The server cannot process the request due to a client error.",
    whenYoullSeeThis: "Malformed JSON, missing required headers, invalid query parameters, or syntax errors in the request.",
    commonCauses: ["Invalid JSON body", "Missing Content-Type", "Malformed query string"],
    whatToDo: "Validate request format before sending. Read the error response body for specific field errors.",
  },
  {
    code: 401,
    name: "Unauthorized",
    category: "4xx",
    description: "Authentication is required and has failed or not been provided.",
    whenYoullSeeThis: "Missing or expired JWT/API token, not logged in, or invalid credentials.",
    commonCauses: ["No Authorization header", "Expired access token", "Invalid API key"],
    whatToDo: "Check your auth token. Refresh the token or redirect to login. 401 = not authenticated.",
    codeExample: "// 401 = no valid token\nif (res.status === 401) { redirectToLogin(); }",
  },
  {
    code: 403,
    name: "Forbidden",
    category: "4xx",
    description: "The server understood the request but refuses to authorize it.",
    whenYoullSeeThis: "Logged in but lacking permission — wrong role, insufficient privileges, or resource access denied.",
    commonCauses: ["Wrong user role", "Insufficient permissions", "IP blocked or geo-restricted"],
    whatToDo: "Check user roles and permissions. 403 = authenticated but not authorized. Different from 401!",
    codeExample: "// 403 = authenticated but no permission\nif (res.status === 403) { showAccessDenied(); }",
  },
  {
    code: 404,
    name: "Not Found",
    category: "4xx",
    description: "The requested resource does not exist.",
    whenYoullSeeThis: "Wrong URL, deleted resource, typo in API path, or route not registered on the server.",
    commonCauses: ["Typo in URL", "Resource deleted", "Route not defined", "Wrong API version"],
    whatToDo: "Verify the URL path and resource ID. Check if the resource was deleted or moved.",
    codeExample: "if (res.status === 404) { showNotFound(); }",
  },
  {
    code: 405,
    name: "Method Not Allowed",
    category: "4xx",
    description: "The HTTP method is not supported for this endpoint.",
    whenYoullSeeThis: "Sending POST to a GET-only endpoint, or using DELETE where only PATCH is allowed.",
    commonCauses: ["Wrong HTTP method", "API only supports GET", "CORS preflight mismatch"],
    whatToDo: "Check the Allow header for supported methods. Use the correct HTTP verb.",
  },
  {
    code: 408,
    name: "Request Timeout",
    category: "4xx",
    description: "The server timed out waiting for the request.",
    whenYoullSeeThis: "Slow client sending a large body, or server closed idle connection.",
    commonCauses: ["Slow upload", "Idle connection timeout", "Network interruption"],
    whatToDo: "Retry the request. For large uploads, use chunked transfer or resumable upload.",
  },
  {
    code: 409,
    name: "Conflict",
    category: "4xx",
    description: "The request conflicts with the current state of the resource.",
    whenYoullSeeThis: "Duplicate email on signup, version conflict on concurrent updates, or resource already exists.",
    commonCauses: ["Duplicate unique field", "Optimistic locking conflict", "Concurrent edit"],
    whatToDo: "Read the conflict details. Refresh data and retry, or resolve the duplicate.",
  },
  {
    code: 410,
    name: "Gone",
    category: "4xx",
    description: "The resource existed but has been permanently removed.",
    whenYoullSeeThis: "Deliberately deleted content that should not return — stronger signal than 404 for SEO.",
    commonCauses: ["Permanently deleted resource", "Deprecated endpoint removed"],
    whatToDo: "Remove links to this resource. Unlike 404, 410 tells search engines to de-index.",
  },
  {
    code: 413,
    name: "Payload Too Large",
    category: "4xx",
    description: "The request body exceeds the server's size limit.",
    whenYoullSeeThis: "File uploads exceeding server limit, or POST body too large for API gateway.",
    commonCauses: ["File too large", "Request body exceeds nginx/client limit", "API payload cap"],
    whatToDo: "Reduce payload size, compress data, or use chunked/multipart upload.",
  },
  {
    code: 414,
    name: "URI Too Long",
    category: "4xx",
    description: "The request URL exceeds the server's length limit.",
    whenYoullSeeThis: "Too many query parameters, or excessively long GET URLs.",
    commonCauses: ["Long query string", "Too many filter params", "Encoded data in URL"],
    whatToDo: "Move data from query string to POST body. Shorten or paginate parameters.",
  },
  {
    code: 415,
    name: "Unsupported Media Type",
    category: "4xx",
    description: "The request Content-Type is not supported by the server.",
    whenYoullSeeThis: "Sending XML to a JSON-only API, or wrong Content-Type header on upload.",
    commonCauses: ["Wrong Content-Type header", "Server expects application/json", "Unsupported file format"],
    whatToDo: "Set Content-Type to what the API expects (usually application/json).",
  },
  {
    code: 422,
    name: "Unprocessable Entity",
    category: "4xx",
    description: "The request is well-formed but contains semantic errors.",
    whenYoullSeeThis: "Validation errors — valid JSON but business rules fail (negative age, invalid email format accepted by syntax but rejected by rules).",
    commonCauses: ["Field validation failed", "Business rule violation", "Invalid enum value"],
    whatToDo: "Read validation errors in response body. Fix field values and resubmit.",
  },
  {
    code: 429,
    name: "Too Many Requests",
    category: "4xx",
    description: "The client has sent too many requests in a given time period.",
    whenYoullSeeThis: "API rate limiting, brute-force protection, or quota exceeded on third-party APIs.",
    commonCauses: ["Rate limit exceeded", "Too many login attempts", "API quota hit"],
    whatToDo: "Check Retry-After header. Implement exponential backoff: wait 1s, 2s, 4s, 8s before retrying.",
    codeExample: "if (res.status === 429) {\n  const retryAfter = res.headers.get('Retry-After');\n  await sleep(retryAfter ? Number(retryAfter) * 1000 : 1000);\n}",
  },
  {
    code: 500,
    name: "Internal Server Error",
    category: "5xx",
    description: "The server encountered an unexpected error.",
    whenYoullSeeThis: "Unhandled exception in server code, database crash, or misconfiguration on the server side.",
    commonCauses: ["Unhandled exception", "Database connection failure", "Null reference in API code"],
    whatToDo: "Retry once. If persistent, check server logs. This is a server bug — not your fault as a client.",
  },
  {
    code: 502,
    name: "Bad Gateway",
    category: "5xx",
    description: "The server acting as a gateway received an invalid response from upstream.",
    whenYoullSeeThis: "Reverse proxy (nginx, Cloudflare) cannot reach the backend, or backend crashed mid-request.",
    commonCauses: ["Backend server down", "Proxy misconfiguration", "Upstream timeout"],
    whatToDo: "Retry after a delay. Check if the API service is up. Often transient during deployments.",
  },
  {
    code: 503,
    name: "Service Unavailable",
    category: "5xx",
    description: "The server is temporarily unable to handle the request.",
    whenYoullSeeThis: "Server overloaded, maintenance mode, or deliberate traffic shedding.",
    commonCauses: ["Server maintenance", "Overload / traffic spike", "Health check failing"],
    whatToDo: "Check Retry-After header. Implement retry with backoff. Show maintenance message to users.",
  },
  {
    code: 504,
    name: "Gateway Timeout",
    category: "5xx",
    description: "The gateway did not receive a timely response from the upstream server.",
    whenYoullSeeThis: "Backend took too long to respond — slow database query, long-running job, or network issue between proxy and app.",
    commonCauses: ["Slow database query", "Long API processing", "Proxy timeout too short"],
    whatToDo: "Retry with backoff. Optimize slow endpoints. Consider async processing for long operations.",
  },
  {
    code: 507,
    name: "Insufficient Storage",
    category: "5xx",
    description: "The server cannot store the representation needed to complete the request.",
    whenYoullSeeThis: "WebDAV operations when disk is full, or storage quota exceeded on server.",
    commonCauses: ["Disk full on server", "Storage quota exceeded", "WebDAV write failure"],
    whatToDo: "Contact server admin. Free up storage or increase quota.",
  },
];

export const STATUS_CATEGORY_LABELS: Record<StatusCategory, string> = {
  "1xx": "Informational",
  "2xx": "Success",
  "3xx": "Redirect",
  "4xx": "Client Error",
  "5xx": "Server Error",
};

export const STATUS_CATEGORY_COLORS: Record<StatusCategory, string> = {
  "1xx": "text-blue-600 bg-blue-500/10 border-blue-500/30",
  "2xx": "text-green-600 bg-green-500/10 border-green-500/30",
  "3xx": "text-amber-600 bg-amber-500/10 border-amber-500/30",
  "4xx": "text-orange-600 bg-orange-500/10 border-orange-500/30",
  "5xx": "text-red-600 bg-red-500/10 border-red-500/30",
};

export function filterStatusCodes(
  codes: StatusCode[],
  query: string,
  category: StatusCategory | "all",
): StatusCode[] {
  const q = query.trim().toLowerCase();
  return codes.filter((code) => {
    if (category !== "all" && code.category !== category) return false;
    if (!q) return true;
    return (
      String(code.code).includes(q) ||
      code.name.toLowerCase().includes(q) ||
      code.description.toLowerCase().includes(q) ||
      code.whenYoullSeeThis.toLowerCase().includes(q) ||
      code.commonCauses.some((c) => c.toLowerCase().includes(q))
    );
  });
}

export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    "<mark>$1</mark>",
  );
}
