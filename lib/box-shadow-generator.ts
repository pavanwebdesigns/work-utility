export type ShadowLayer = {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  colorR: number;
  colorG: number;
  colorB: number;
  opacity: number;
  inset: boolean;
};

export type PreviewShape = "square" | "rounded" | "pill" | "circle";
export type PreviewBackground = "white" | "grey" | "dark" | "gradient";

export type BoxShadowPresetId =
  | "subtle"
  | "default"
  | "medium"
  | "large"
  | "apple"
  | "colored-glow";

let shadowLayerId = 0;

export function createShadowLayer(
  partial?: Partial<Omit<ShadowLayer, "id">>,
): ShadowLayer {
  shadowLayerId += 1;
  return {
    id: `shadow-${shadowLayerId}`,
    offsetX: 0,
    offsetY: 4,
    blur: 8,
    spread: 0,
    colorR: 0,
    colorG: 0,
    colorB: 0,
    opacity: 15,
    inset: false,
    ...partial,
  };
}

export const DEFAULT_SHADOW_LAYERS: ShadowLayer[] = [
  createShadowLayer({
    offsetX: 0,
    offsetY: 4,
    blur: 6,
    spread: 0,
    opacity: 10,
  }),
];

function layerColor(layer: ShadowLayer): string {
  const alpha = (layer.opacity / 100).toFixed(2);
  return `rgba(${layer.colorR}, ${layer.colorG}, ${layer.colorB}, ${alpha})`;
}

function layerToCss(layer: ShadowLayer): string {
  const inset = layer.inset ? "inset " : "";
  return `${inset}${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px ${layerColor(layer)}`;
}

export function generateBoxShadowCss(layers: ShadowLayer[]): string {
  if (layers.length === 0) {
    return `.shadow {\n  box-shadow: none;\n}`;
  }
  const value = layers.map(layerToCss).join(",\n    ");
  return `.shadow {\n  box-shadow:\n    ${value};\n}`;
}

function closestTailwindShadow(layers: ShadowLayer[]): string | null {
  if (layers.length !== 1) return null;
  const l = layers[0];
  if (l.inset || l.spread !== 0) return null;
  if (l.offsetX !== 0) return null;

  const presets: Array<{ class: string; y: number; blur: number; opacity: number }> = [
    { class: "shadow-sm", y: 1, blur: 2, opacity: 5 },
    { class: "shadow", y: 1, blur: 3, opacity: 10 },
    { class: "shadow-md", y: 4, blur: 6, opacity: 10 },
    { class: "shadow-lg", y: 10, blur: 15, opacity: 10 },
    { class: "shadow-xl", y: 20, blur: 25, opacity: 10 },
    { class: "shadow-2xl", y: 25, blur: 50, opacity: 25 },
  ];

  for (const p of presets) {
    if (
      Math.abs(l.offsetY - p.y) <= 2 &&
      Math.abs(l.blur - p.blur) <= 4 &&
      Math.abs(l.opacity - p.opacity) <= 8 &&
      l.colorR === 0 &&
      l.colorG === 0 &&
      l.colorB === 0
    ) {
      return p.class;
    }
  }
  return null;
}

export function generateBoxShadowTailwind(layers: ShadowLayer[]): string {
  const cssValue = layers.map(layerToCss).join(", ");
  const twClass = closestTailwindShadow(layers);

  if (twClass) {
    return `<div class="${twClass}">
  <!-- content -->
</div>`;
  }

  const escaped = cssValue.replace(/ /g, "_");
  return `<div class="[box-shadow:${escaped}]">
  <!-- content -->
</div>

<!-- Tailwind built-in utilities (shadow-sm through shadow-2xl) work for single standard shadows. -->
<!-- For multi-layer or colored shadows, use arbitrary values or extend tailwind.config.js. -->`;
}

export function boxShadowInlineStyle(layers: ShadowLayer[]): string {
  return layers.map(layerToCss).join(", ");
}

export const BOX_SHADOW_PRESETS: Record<
  BoxShadowPresetId,
  { label: string; layers: Omit<ShadowLayer, "id">[] }
> = {
  subtle: {
    label: "Subtle",
    layers: [
      {
        offsetX: 0,
        offsetY: 1,
        blur: 2,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 5,
        inset: false,
      },
    ],
  },
  default: {
    label: "Default",
    layers: [
      {
        offsetX: 0,
        offsetY: 4,
        blur: 6,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 10,
        inset: false,
      },
    ],
  },
  medium: {
    label: "Medium",
    layers: [
      {
        offsetX: 0,
        offsetY: 4,
        blur: 6,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 7,
        inset: false,
      },
      {
        offsetX: 0,
        offsetY: 2,
        blur: 4,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 6,
        inset: false,
      },
    ],
  },
  large: {
    label: "Large",
    layers: [
      {
        offsetX: 0,
        offsetY: 10,
        blur: 15,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 10,
        inset: false,
      },
      {
        offsetX: 0,
        offsetY: 4,
        blur: 6,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 5,
        inset: false,
      },
    ],
  },
  apple: {
    label: "Apple-style",
    layers: [
      {
        offsetX: 0,
        offsetY: 2,
        blur: 4,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 4,
        inset: false,
      },
      {
        offsetX: 0,
        offsetY: 4,
        blur: 12,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 8,
        inset: false,
      },
      {
        offsetX: 0,
        offsetY: 8,
        blur: 24,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 6,
        inset: false,
      },
    ],
  },
  "colored-glow": {
    label: "Colored Glow",
    layers: [
      {
        offsetX: 0,
        offsetY: 0,
        blur: 20,
        spread: 0,
        colorR: 99,
        colorG: 102,
        colorB: 241,
        opacity: 40,
        inset: false,
      },
      {
        offsetX: 0,
        offsetY: 4,
        blur: 6,
        spread: 0,
        colorR: 0,
        colorG: 0,
        colorB: 0,
        opacity: 5,
        inset: false,
      },
    ],
  },
};

export function presetToLayers(presetId: BoxShadowPresetId): ShadowLayer[] {
  return BOX_SHADOW_PRESETS[presetId].layers.map((layer) =>
    createShadowLayer(layer),
  );
}

export function previewShapeClass(shape: PreviewShape): string {
  switch (shape) {
    case "square":
      return "rounded-none";
    case "rounded":
      return "rounded-2xl";
    case "pill":
      return "rounded-full px-12";
    case "circle":
      return "rounded-full h-32 w-32";
  }
}

export const PREVIEW_BACKGROUNDS: Record<PreviewBackground, string> = {
  white: "#ffffff",
  grey: "#f1f5f9",
  dark: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
  gradient:
    "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
};
