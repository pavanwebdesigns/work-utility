export function encodeURL(url: string): string {
  return encodeURIComponent(url);
}

export function decodeURL(url: string): string {
  return decodeURIComponent(url);
}

export function encodeURIFull(url: string): string {
  return encodeURI(url);
}

export function isEncoded(str: string): boolean {
  try {
    return str !== decodeURIComponent(str);
  } catch {
    return false;
  }
}
