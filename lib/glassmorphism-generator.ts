export type GlassBackground = "gradient" | "photo" | "dark";

export type GlassPresetId =
  | "default"
  | "frosted-dark"
  | "ice-blue"
  | "warm-amber"
  | "bold"
  | "minimal";

export type GlassSettings = {
  blur: number;
  transparency: number;
  saturation: number;
  colorR: number;
  colorG: number;
  colorB: number;
  borderRadius: number;
  borderEnabled: boolean;
  borderOpacity: number;
  shadowEnabled: boolean;
  shadowIntensity: number;
};

export const DEFAULT_GLASS: GlassSettings = {
  blur: 12,
  transparency: 15,
  saturation: 150,
  colorR: 255,
  colorG: 255,
  colorB: 255,
  borderRadius: 16,
  borderEnabled: true,
  borderOpacity: 40,
  shadowEnabled: true,
  shadowIntensity: 50,
};

export const GLASS_PRESETS: Record<
  GlassPresetId,
  { label: string; settings: GlassSettings }
> = {
  default: { label: "Default Glass", settings: DEFAULT_GLASS },
  "frosted-dark": {
    label: "Frosted Dark",
    settings: {
      ...DEFAULT_GLASS,
      colorR: 20,
      colorG: 20,
      colorB: 30,
      transparency: 25,
      blur: 16,
      borderOpacity: 20,
    },
  },
  "ice-blue": {
    label: "Ice Blue",
    settings: {
      ...DEFAULT_GLASS,
      colorR: 200,
      colorG: 230,
      colorB: 255,
      blur: 20,
      saturation: 180,
    },
  },
  "warm-amber": {
    label: "Warm Amber",
    settings: {
      ...DEFAULT_GLASS,
      colorR: 255,
      colorG: 240,
      colorB: 210,
      transparency: 20,
      saturation: 140,
    },
  },
  bold: {
    label: "Bold Glass",
    settings: {
      ...DEFAULT_GLASS,
      transparency: 8,
      blur: 24,
      borderOpacity: 60,
      shadowIntensity: 70,
    },
  },
  minimal: {
    label: "Minimal",
    settings: {
      ...DEFAULT_GLASS,
      transparency: 25,
      blur: 6,
      borderOpacity: 25,
      shadowEnabled: false,
    },
  },
};

function rgba(settings: GlassSettings, alphaOverride?: number): string {
  const alpha =
    alphaOverride ?? settings.transparency / 100;
  return `rgba(${settings.colorR}, ${settings.colorG}, ${settings.colorB}, ${alpha.toFixed(2)})`;
}

function shadowValue(intensity: number): string {
  const blur = Math.round(intensity / 2);
  return `0 4px ${blur}px rgba(0, 0, 0, ${(intensity / 200).toFixed(2)})`;
}

function tailwindBlurClass(blur: number): string {
  if (blur <= 4) return "backdrop-blur-sm";
  if (blur <= 8) return "backdrop-blur";
  if (blur <= 12) return "backdrop-blur-md";
  if (blur <= 16) return "backdrop-blur-lg";
  if (blur <= 24) return "backdrop-blur-xl";
  return "backdrop-blur-2xl";
}

function tailwindRadiusClass(radius: number): string {
  if (radius <= 4) return "rounded";
  if (radius <= 8) return "rounded-lg";
  if (radius <= 12) return "rounded-xl";
  if (radius <= 16) return "rounded-2xl";
  if (radius <= 24) return "rounded-3xl";
  return `[border-radius:${radius}px]`;
}

export function generateGlassCss(settings: GlassSettings): string {
  const bg = rgba(settings);
  const border = settings.borderEnabled
    ? `  border: 1px solid rgba(${settings.colorR}, ${settings.colorG}, ${settings.colorB}, ${(settings.borderOpacity / 100).toFixed(2)});\n`
    : "";
  const shadow = settings.shadowEnabled
    ? `  box-shadow: ${shadowValue(settings.shadowIntensity)};\n`
    : "";
  const fallbackAlpha = Math.min(0.85, settings.transparency / 100 + 0.6);

  return `.glass {
  background: ${bg};
  backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);
  -webkit-backdrop-filter: blur(${settings.blur}px) saturate(${settings.saturation}%);
  border-radius: ${settings.borderRadius}px;
${border}${shadow}}

/* Firefox fallback (doesn't support backdrop-filter) */
@supports not (backdrop-filter: blur(1px)) {
  .glass {
    background: ${rgba(settings, fallbackAlpha)};
  }
}`;
}

export function generateGlassTailwind(settings: GlassSettings): string {
  const opacity = Math.max(1, Math.round(settings.transparency / 5) * 5);
  const borderOpacity = Math.max(5, Math.round(settings.borderOpacity / 5) * 5);
  const classes = [
    `bg-white/${opacity}`,
    tailwindBlurClass(settings.blur),
    settings.saturation >= 150 ? "backdrop-saturate-150" : "",
    tailwindRadiusClass(settings.borderRadius),
    settings.borderEnabled ? `border border-white/${borderOpacity}` : "",
    settings.shadowEnabled ? "shadow-lg" : "",
    `[backdrop-filter:blur(${settings.blur}px)_saturate(${settings.saturation}%)]`,
  ]
    .filter(Boolean)
    .join(" ");

  return `<div class="${classes}">
  <!-- content -->
</div>

<!-- Note: Some values use Tailwind arbitrary syntax for precise blur/saturate. -->
<!-- The CSS tab gives full control with Firefox @supports fallback. -->`;
}

export function generateGlassVariables(settings: GlassSettings): string {
  const bg = rgba(settings);
  const border = rgba(settings, settings.borderOpacity / 100);

  return `:root {
  --glass-bg: ${bg};
  --glass-blur: ${settings.blur}px;
  --glass-saturate: ${settings.saturation}%;
  --glass-radius: ${settings.borderRadius}px;
  --glass-border: ${border};
  --glass-shadow: ${settings.shadowEnabled ? shadowValue(settings.shadowIntensity) : "none"};
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  border-radius: var(--glass-radius);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

@supports not (backdrop-filter: blur(1px)) {
  .glass {
    background: ${rgba(settings, Math.min(0.85, settings.transparency / 100 + 0.6))};
  }
}`;
}

export function glassInlineStyle(
  settings: GlassSettings,
): Record<string, string | number | undefined> {
  return {
    background: rgba(settings),
    backdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
    WebkitBackdropFilter: `blur(${settings.blur}px) saturate(${settings.saturation}%)`,
    borderRadius: `${settings.borderRadius}px`,
    border: settings.borderEnabled
      ? `1px solid rgba(${settings.colorR}, ${settings.colorG}, ${settings.colorB}, ${settings.borderOpacity / 100})`
      : undefined,
    boxShadow: settings.shadowEnabled
      ? shadowValue(settings.shadowIntensity)
      : undefined,
  };
}
