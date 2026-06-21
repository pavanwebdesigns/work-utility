export const JWT_COLORS = {
  header: "#FB715B",
  payload: "#A855F7",
  signature: "#22D3EE",
} as const;

export const JWT_CLAIM_LABELS: Record<string, string> = {
  iss: "Issuer",
  sub: "Subject",
  aud: "Audience",
  exp: "Expiration Time",
  nbf: "Not Before",
  iat: "Issued At",
  jti: "JWT ID",
};

export const SAMPLE_JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vLXVzZXItMTIzIiwibmFtZSI6IldvcmtVdGlsaXRpZXMgRGVtbyIsImlzcyI6Indvcmt1dGlsaXRpZXMuY29tIiwiaWF0IjoxNzgyMDIzNTkxLCJleHAiOjE3ODQ2MTU1OTF9.lqHZ-_lMyTV36yZ4p8u4-4DOwAnBv5PmcGzkmHXTIqU";

export const SAMPLE_JWT_SECRET = "demo-secret-key";

export type JwtParts = {
  header: string;
  payload: string;
  signature: string;
};

export type ExpiryInfo = {
  hasExp: boolean;
  isExpired: boolean;
  expiresAtFormatted: string | null;
  expiresInLabel: string | null;
  badgeType: "expired" | "valid" | "none";
  statusMessage: string;
};

export interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  parts: JwtParts;
  algorithm: string | null;
  expiry: ExpiryInfo;
}

export type VerificationResult = {
  valid: boolean;
  error?: string;
  pending?: boolean;
};

function decodeBase64Url(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  return decodeURIComponent(
    binary
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

export function base64UrlToBytes(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatExpiresIn(exp: number): string {
  const diff = exp * 1000 - Date.now();
  if (diff <= 0) return "expired";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  if (days > 0) return `${days} day${days === 1 ? "" : "s"}`;
  if (hours > 0) return `${hours} hour${hours === 1 ? "" : "s"}`;
  const minutes = Math.max(1, Math.floor(diff / 60000));
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}

export function getExpiryInfo(payload: Record<string, unknown>): ExpiryInfo {
  if (typeof payload.exp !== "number") {
    return {
      hasExp: false,
      isExpired: false,
      expiresAtFormatted: null,
      expiresInLabel: null,
      badgeType: "none",
      statusMessage: "No expiration set",
    };
  }

  const exp = payload.exp;
  const expiresAtFormatted = formatTimestamp(exp);
  const isExpired = exp * 1000 < Date.now();
  const expiresInLabel = formatExpiresIn(exp);

  if (isExpired) {
    return {
      hasExp: true,
      isExpired: true,
      expiresAtFormatted,
      expiresInLabel,
      badgeType: "expired",
      statusMessage: `Expired: ${expiresAtFormatted}`,
    };
  }

  return {
    hasExp: true,
    isExpired: false,
    expiresAtFormatted,
    expiresInLabel,
    badgeType: "valid",
    statusMessage: `Token Valid — expires in ${expiresInLabel}`,
  };
}

export function splitJwtToken(token: string): JwtParts | null {
  const parts = token.trim().split(".");
  if (parts.length !== 3 || parts.some((part) => !part)) return null;
  return {
    header: parts[0],
    payload: parts[1],
    signature: parts[2],
  };
}

export function decodeJWT(token: string): DecodedJWT {
  const parts = splitJwtToken(token);
  if (!parts) {
    throw new Error("Invalid JWT format. Expected 3 parts separated by dots.");
  }

  const header = JSON.parse(decodeBase64Url(parts.header)) as Record<
    string,
    unknown
  >;
  const payload = JSON.parse(decodeBase64Url(parts.payload)) as Record<
    string,
    unknown
  >;

  const algorithm =
    typeof header.alg === "string" ? header.alg.toUpperCase() : null;

  return {
    header,
    payload,
    signature: parts.signature,
    parts,
    algorithm,
    expiry: getExpiryInfo(payload),
  };
}

export function getAlgorithmFamily(
  algorithm: string | null
): "hmac" | "rsa" | "ec" | "unknown" {
  if (!algorithm) return "unknown";
  if (algorithm.startsWith("HS")) return "hmac";
  if (algorithm.startsWith("RS") || algorithm === "PS256") return "rsa";
  if (algorithm.startsWith("ES")) return "ec";
  return "unknown";
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const cleaned = pem
    .replace(/-----BEGIN[^-]+-----/g, "")
    .replace(/-----END[^-]+-----/g, "")
    .replace(/\s/g, "");
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function toBufferSource(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  ) as ArrayBuffer;
}

function decodeSecretInput(secret: string, base64Encoded: boolean): Uint8Array {
  if (base64Encoded) {
    const cleaned = secret.replace(/\s/g, "");
    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  return new TextEncoder().encode(secret);
}

function getHashForAlgorithm(algorithm: string): string | null {
  if (algorithm.endsWith("256")) return "SHA-256";
  if (algorithm.endsWith("384")) return "SHA-384";
  if (algorithm.endsWith("512")) return "SHA-512";
  return null;
}

function getEcCurve(algorithm: string): string | null {
  if (algorithm === "ES256") return "P-256";
  if (algorithm === "ES384") return "P-384";
  if (algorithm === "ES512") return "P-521";
  return null;
}

export async function verifyJwtSignature(
  token: string,
  keyInput: string,
  options: { base64Secret?: boolean } = {}
): Promise<VerificationResult> {
  if (!keyInput.trim()) {
    return { valid: false, pending: true };
  }

  const parts = splitJwtToken(token);
  if (!parts) {
    return { valid: false, error: "Invalid JWT format." };
  }

  let header: Record<string, unknown>;
  try {
    header = JSON.parse(decodeBase64Url(parts.header)) as Record<string, unknown>;
  } catch {
    return { valid: false, error: "Invalid JWT header." };
  }

  const algorithm =
    typeof header.alg === "string" ? header.alg.toUpperCase() : null;
  if (!algorithm) {
    return { valid: false, error: "Missing alg in JWT header." };
  }

  const hash = getHashForAlgorithm(algorithm);
  if (!hash) {
    return { valid: false, error: `Unsupported algorithm: ${algorithm}` };
  }

  const signedData = new TextEncoder().encode(`${parts.header}.${parts.payload}`);
  const signature = base64UrlToBytes(parts.signature);

  try {
    if (algorithm.startsWith("HS")) {
      const secretBytes = decodeSecretInput(keyInput, options.base64Secret ?? false);
      const key = await crypto.subtle.importKey(
        "raw",
        toBufferSource(secretBytes),
        { name: "HMAC", hash },
        false,
        ["verify"]
      );
      const valid = await crypto.subtle.verify(
        "HMAC",
        key,
        toBufferSource(signature),
        signedData
      );
      return { valid };
    }

    if (algorithm.startsWith("RS")) {
      const key = await crypto.subtle.importKey(
        "spki",
        pemToArrayBuffer(keyInput),
        { name: "RSASSA-PKCS1-v1_5", hash },
        false,
        ["verify"]
      );
      const valid = await crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5",
        key,
        toBufferSource(signature),
        signedData
      );
      return { valid };
    }

    if (algorithm === "PS256") {
      const key = await crypto.subtle.importKey(
        "spki",
        pemToArrayBuffer(keyInput),
        { name: "RSA-PSS", hash },
        false,
        ["verify"]
      );
      const valid = await crypto.subtle.verify(
        { name: "RSA-PSS", saltLength: 32 },
        key,
        toBufferSource(signature),
        signedData
      );
      return { valid };
    }

    if (algorithm.startsWith("ES")) {
      const namedCurve = getEcCurve(algorithm);
      if (!namedCurve) {
        return { valid: false, error: `Unsupported algorithm: ${algorithm}` };
      }
      const key = await crypto.subtle.importKey(
        "spki",
        pemToArrayBuffer(keyInput),
        { name: "ECDSA", namedCurve },
        false,
        ["verify"]
      );
      const valid = await crypto.subtle.verify(
        { name: "ECDSA", hash },
        key,
        toBufferSource(signature),
        signedData
      );
      return { valid };
    }

    return { valid: false, error: `Unsupported algorithm: ${algorithm}` };
  } catch {
    return { valid: false, error: "Verification failed. Check your secret or public key." };
  }
}

export function formatClaimValue(key: string, value: unknown): string {
  if (key === "exp" || key === "nbf" || key === "iat") {
    if (typeof value === "number") {
      return `${value} (${formatTimestamp(value)})`;
    }
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}
