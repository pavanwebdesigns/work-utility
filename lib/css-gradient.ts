export type GradientType = "linear" | "radial" | "conic";

export type ColorStop = {
  id: string;
  color: string;
  position: number;
};

export type GradientPreset = {
  name: string;
  type: GradientType;
  angle: number;
  stops: Omit<ColorStop, "id">[];
};

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    name: "Sunset",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#ff6b6b", position: 0 },
      { color: "#feca57", position: 50 },
      { color: "#ff9ff3", position: 100 },
    ],
  },
  {
    name: "Ocean",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ],
  },
  {
    name: "Midnight",
    type: "linear",
    angle: 160,
    stops: [
      { color: "#0f2027", position: 0 },
      { color: "#203a43", position: 50 },
      { color: "#2c5364", position: 100 },
    ],
  },
  {
    name: "Pastel Dawn",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#fbc2eb", position: 0 },
      { color: "#a6c1ee", position: 100 },
    ],
  },
  {
    name: "Forest",
    type: "linear",
    angle: 145,
    stops: [
      { color: "#134e5e", position: 0 },
      { color: "#71b280", position: 100 },
    ],
  },
  {
    name: "Candy",
    type: "conic",
    angle: 0,
    stops: [
      { color: "#f093fb", position: 0 },
      { color: "#f5576c", position: 33 },
      { color: "#4facfe", position: 66 },
      { color: "#f093fb", position: 100 },
    ],
  },
];

export function createStopId(): string {
  return `stop-${Math.random().toString(36).slice(2, 9)}`;
}

export function buildGradientCss(
  type: GradientType,
  angle: number,
  stops: ColorStop[]
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopStr = sorted
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  if (type === "linear") {
    return `linear-gradient(${angle}deg, ${stopStr})`;
  }
  if (type === "radial") {
    return `radial-gradient(circle at center, ${stopStr})`;
  }
  return `conic-gradient(from ${angle}deg, ${stopStr})`;
}

export function buildBackgroundProperty(
  type: GradientType,
  angle: number,
  stops: ColorStop[]
): string {
  return `background: ${buildGradientCss(type, angle, stops)};`;
}
