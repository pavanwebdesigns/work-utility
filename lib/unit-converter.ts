export type UnitCategory =
  | "length"
  | "weight"
  | "temperature"
  | "area"
  | "volume"
  | "speed"
  | "data";

export type UnitDefinition = {
  id: string;
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

export const UNIT_CATEGORIES: Record<
  UnitCategory,
  { label: string; units: UnitDefinition[] }
> = {
  length: {
    label: "Length",
    units: [
      { id: "km", label: "Kilometers (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "m", label: "Meters (m)", toBase: (v) => v, fromBase: (v) => v },
      { id: "cm", label: "Centimeters (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: "mi", label: "Miles (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: "ft", label: "Feet (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "in", label: "Inches (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  weight: {
    label: "Weight",
    units: [
      { id: "kg", label: "Kilograms (kg)", toBase: (v) => v, fromBase: (v) => v },
      { id: "g", label: "Grams (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "lb", label: "Pounds (lbs)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { id: "oz", label: "Ounces (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { id: "t", label: "Metric Tons (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    ],
  },
  temperature: {
    label: "Temperature",
    units: [
      {
        id: "c",
        label: "Celsius (°C)",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        id: "f",
        label: "Fahrenheit (°F)",
        toBase: (v) => ((v - 32) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 + 32,
      },
      {
        id: "k",
        label: "Kelvin (K)",
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ],
  },
  area: {
    label: "Area",
    units: [
      { id: "sqm", label: "Square Meters (sq m)", toBase: (v) => v, fromBase: (v) => v },
      { id: "sqft", label: "Square Feet (sq ft)", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { id: "acre", label: "Acres", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      { id: "ha", label: "Hectares (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    ],
  },
  volume: {
    label: "Volume",
    units: [
      { id: "l", label: "Liters (L)", toBase: (v) => v, fromBase: (v) => v },
      { id: "ml", label: "Milliliters (mL)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "gal", label: "US Gallons (gal)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { id: "cuft", label: "Cubic Feet (cu ft)", toBase: (v) => v * 28.3168, fromBase: (v) => v / 28.3168 },
    ],
  },
  speed: {
    label: "Speed",
    units: [
      { id: "kmh", label: "Kilometers/hour (km/h)", toBase: (v) => v, fromBase: (v) => v },
      { id: "mph", label: "Miles/hour (mph)", toBase: (v) => v * 1.60934, fromBase: (v) => v / 1.60934 },
      { id: "ms", label: "Meters/second (m/s)", toBase: (v) => v * 3.6, fromBase: (v) => v / 3.6 },
    ],
  },
  data: {
    label: "Data",
    units: [
      { id: "kb", label: "Kilobytes (KB)", toBase: (v) => v, fromBase: (v) => v },
      { id: "mb", label: "Megabytes (MB)", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: "gb", label: "Gigabytes (GB)", toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / (1024 * 1024) },
      { id: "tb", label: "Terabytes (TB)", toBase: (v) => v * 1024 * 1024 * 1024, fromBase: (v) => v / (1024 * 1024 * 1024) },
    ],
  },
};

export function convertUnit(
  value: number,
  fromUnitId: string,
  toUnitId: string,
  category: UnitCategory
): number | null {
  if (!Number.isFinite(value)) return null;

  const units = UNIT_CATEGORIES[category].units;
  const fromUnit = units.find((unit) => unit.id === fromUnitId);
  const toUnit = units.find((unit) => unit.id === toUnitId);

  if (!fromUnit || !toUnit) return null;

  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
}

export function convertToAllUnits(
  value: number,
  fromUnitId: string,
  category: UnitCategory
): { unit: UnitDefinition; value: number }[] {
  const units = UNIT_CATEGORIES[category].units;
  const fromUnit = units.find((unit) => unit.id === fromUnitId);
  if (!fromUnit || !Number.isFinite(value)) return [];

  const baseValue = fromUnit.toBase(value);
  return units.map((unit) => ({
    unit,
    value: unit.fromBase(baseValue),
  }));
}

export function formatUnitValue(value: number, category: UnitCategory): string {
  if (category === "temperature") {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (Math.abs(value) >= 1000) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 4,
    }).format(value);
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 6,
  }).format(value);
}
