export const INDEXNOW_HOST = "workutilities.com";

export const INDEXNOW_URLS = [
  "https://workutilities.com/",
  "https://workutilities.com/tools/pdf-compress",
  "https://workutilities.com/tools/image-compress",
  "https://workutilities.com/tools/photo-resizer",
  "https://workutilities.com/tools/pdf-to-word",
  "https://workutilities.com/tools/word-to-pdf",
  "https://workutilities.com/tools/image-to-pdf",
  "https://workutilities.com/tools/bg-remove",
  "https://workutilities.com/tools/pdf-merge",
  "https://workutilities.com/tools/pdf-split",
  "https://workutilities.com/tools/pdf-unlock",
  "https://workutilities.com/tools/qr-code-generator",
  "https://workutilities.com/tools/word-counter",
  "https://workutilities.com/tools/age-calculator",
  "https://workutilities.com/aadhaar-photo-size",
  "https://workutilities.com/pan-card-photo-size",
  "https://workutilities.com/passport-photo-size-india",
  "https://workutilities.com/visa-photo-size",
  "https://workutilities.com/driving-licence-photo-size",
];

export function getIndexNowKey(): string | undefined {
  return process.env.INDEXNOW_KEY?.trim();
}

export function getIndexNowKeyLocation(key: string): string {
  return `https://${INDEXNOW_HOST}/${key}.txt`;
}
