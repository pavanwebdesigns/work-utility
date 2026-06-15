export function encodeToBase64(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

export function decodeFromBase64(base64: string): string {
  return decodeURIComponent(escape(atob(base64)));
}

export async function encodeFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}
