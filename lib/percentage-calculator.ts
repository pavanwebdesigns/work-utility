export function percentOf(partPercent: number, whole: number): number | null {
  if (!Number.isFinite(partPercent) || !Number.isFinite(whole)) return null;
  return (partPercent / 100) * whole;
}

export function whatPercentIs(part: number, whole: number): number | null {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) {
    return null;
  }
  return (part / whole) * 100;
}

export function percentageChange(original: number, updated: number): number | null {
  if (!Number.isFinite(original) || !Number.isFinite(updated) || original === 0) {
    return null;
  }
  return ((updated - original) / original) * 100;
}

export function addSubtractPercentage(
  value: number,
  percent: number,
  operation: "add" | "subtract"
): number | null {
  if (!Number.isFinite(value) || !Number.isFinite(percent)) return null;
  const delta = (value * percent) / 100;
  return operation === "add" ? value + delta : value - delta;
}
