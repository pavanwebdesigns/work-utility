import { getContrastRatio } from "@/lib/color-contrast";

export const TAILWIND_SHADES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type TailwindShade = (typeof TAILWIND_SHADES)[number];
export type ColorFormat = "hex" | "rgb" | "hsl";

export type PaletteStep = {
  shade: TailwindShade;
  hex: string;
  rgb: string;
  hsl: string;
  textOnWhite: boolean;
  textOnBlack: boolean;
  contrastLabel: "W" | "B";
};

const SHADE_LIGHTNESS: Record<TailwindShade, number | "base"> = {
  50: 97,
  100: 94,
  200: 86,
  300: 77,
  400: 66,
  500: "base",
  600: 54,
  700: 46,
  800: 38,
  900: 30,
  950: 14,
};

const SHADE_SATURATION: Record<TailwindShade, number | "base"> = {
  50: 0.55,
  100: 0.65,
  200: 0.75,
  300: 0.85,
  400: 0.92,
  500: "base",
  600: 0.95,
  700: 0.9,
  800: 0.85,
  900: 0.8,
  950: 0.75,
};

export function normalizeHex(hex: string): string | null {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return `#${h.toLowerCase()}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = normalizeHex(hex)!;
  return {
    r: parseInt(n.slice(1, 3), 16),
    g: parseInt(n.slice(3, 5), 16),
    b: parseInt(n.slice(5, 7), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) =>
    Math.round(Math.min(255, Math.max(0, v)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: (r + m) * 255,
    g: (g + m) * 255,
    b: (b + m) * 255,
  };
}

function formatRgb(r: number, g: number, b: number): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function formatHsl(h: number, s: number, l: number): string {
  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

function shadeToHex(
  baseHsl: { h: number; s: number; l: number },
  shade: TailwindShade,
): string {
  const lightnessTarget = SHADE_LIGHTNESS[shade];
  const satFactor = SHADE_SATURATION[shade];

  const l = lightnessTarget === "base" ? baseHsl.l : lightnessTarget;
  const s =
    satFactor === "base" ? baseHsl.s : Math.min(100, baseHsl.s * satFactor);

  const { r, g, b } = hslToRgb(baseHsl.h, s, l);
  return rgbToHex(r, g, b);
}

export function generatePalette(baseHex: string): PaletteStep[] | null {
  const normalized = normalizeHex(baseHex);
  if (!normalized) return null;

  const { r, g, b } = hexToRgb(normalized);
  const baseHsl = rgbToHsl(r, g, b);

  return TAILWIND_SHADES.map((shade) => {
    const hex =
      shade === 500 ? normalized : shadeToHex(baseHsl, shade);
    const rgbParts = hexToRgb(hex);
    const hslParts = rgbToHsl(rgbParts.r, rgbParts.g, rgbParts.b);
    const whiteContrast = getContrastRatio(hex, "#ffffff");
    const blackContrast = getContrastRatio(hex, "#000000");
    const textOnWhite = whiteContrast >= 4.5;
    const textOnBlack = blackContrast >= 4.5;

    return {
      shade,
      hex,
      rgb: formatRgb(rgbParts.r, rgbParts.g, rgbParts.b),
      hsl: formatHsl(hslParts.h, hslParts.s, hslParts.l),
      textOnWhite,
      textOnBlack,
      contrastLabel: textOnWhite ? "W" : "B",
    };
  });
}

export function formatPaletteValue(step: PaletteStep, format: ColorFormat): string {
  if (format === "rgb") return step.rgb;
  if (format === "hsl") return step.hsl;
  return step.hex;
}

export function generateTailwindConfig(
  palette: PaletteStep[],
  colorName = "brand",
): string {
  const entries = palette
    .map((step) => `          ${step.shade}: '${step.hex}',`)
    .join("\n");

  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ${colorName}: {
${entries}
        }
      }
    }
  }
}`;
}

export function generateCssVariables(
  palette: PaletteStep[],
  colorName = "brand",
): string {
  const entries = palette
    .map((step) => `  --color-${colorName}-${step.shade}: ${step.hex};`)
    .join("\n");

  return `:root {
${entries}
}`;
}
