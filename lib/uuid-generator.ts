export type UuidFormatOptions = {
  uppercase: boolean;
  hyphens: boolean;
};

export function generateUuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function generateUuids(count: number): string[] {
  const safeCount = Math.max(1, Math.min(100, Math.floor(count)));
  return Array.from({ length: safeCount }, () => generateUuidV4());
}

export function formatUuid(uuid: string, options: UuidFormatOptions): string {
  const normalized = uuid.toLowerCase();
  let formatted = options.hyphens ? normalized : normalized.replace(/-/g, "");
  if (options.uppercase) {
    formatted = formatted.toUpperCase();
  }
  return formatted;
}
