export function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number =>
    b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

export function calculateHeight(
  width: number,
  ratioW: number,
  ratioH: number,
): number {
  return Math.round((width * ratioH) / ratioW);
}

export function calculateWidth(
  height: number,
  ratioW: number,
  ratioH: number,
): number {
  return Math.round((height * ratioW) / ratioH);
}

export const COMMON_RATIOS = [
  { label: "16:9", w: 16, h: 9, desc: "Widescreen, YouTube, HD TV" },
  { label: "4:3", w: 4, h: 3, desc: "Standard, older screens" },
  { label: "1:1", w: 1, h: 1, desc: "Square, Instagram" },
  { label: "3:2", w: 3, h: 2, desc: "DSLR photos, 35mm film" },
  { label: "9:16", w: 9, h: 16, desc: "Vertical video, Reels, TikTok" },
  { label: "4:5", w: 4, h: 5, desc: "Instagram portrait" },
  { label: "2:1", w: 2, h: 1, desc: "Panoramic, cinema" },
  { label: "21:9", w: 21, h: 9, desc: "Ultra-wide, cinematic" },
];
