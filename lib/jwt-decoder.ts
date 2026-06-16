export interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean;
  expiresAt: string | null;
}

function decodeBase64Url(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  return decodeURIComponent(
    binary
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
}

export function decodeJWT(token: string): DecodedJWT {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format. Expected 3 parts separated by dots.");
  }

  const header = JSON.parse(decodeBase64Url(parts[0])) as Record<string, unknown>;
  const payload = JSON.parse(decodeBase64Url(parts[1])) as Record<string, unknown>;
  const signature = parts[2];

  let isExpired = false;
  let expiresAt: string | null = null;

  if (payload.exp && typeof payload.exp === "number") {
    const expDate = new Date(payload.exp * 1000);
    expiresAt = expDate.toLocaleString();
    isExpired = expDate < new Date();
  }

  return { header, payload, signature, isExpired, expiresAt };
}
