export type CagrMode = "find-cagr" | "find-fv" | "find-required";

export type CagrYearRow = {
  year: number;
  balance: number;
  gain: number;
};

export type CagrBenchmark = {
  name: string;
  range: string;
};

export const CAGR_BENCHMARKS: CagrBenchmark[] = [
  { name: "Savings Account", range: "3–4%" },
  { name: "FD (1–3 yr)", range: "6.5–7.5%" },
  { name: "PPF", range: "7.1%" },
  { name: "Nifty 50 (10yr avg)", range: "12–15%" },
  { name: "Mid Cap MF (10yr)", range: "14–17%" },
];

export const DEFAULT_INFLATION_RATE = 6;

export function ruleOf72Years(cagrPercent: number): number | null {
  if (cagrPercent <= 0) return null;
  return 72 / cagrPercent;
}

export function calculateCagr(
  initial: number,
  final: number,
  years: number,
): number | null {
  if (initial <= 0 || final <= 0 || years <= 0) return null;
  return (Math.pow(final / initial, 1 / years) - 1) * 100;
}

export function calculateAbsoluteReturn(initial: number, final: number): number {
  if (initial <= 0) return 0;
  return ((final - initial) / initial) * 100;
}

export function calculateRealCagr(
  cagrPercent: number,
  inflationPercent = DEFAULT_INFLATION_RATE,
): number {
  return ((1 + cagrPercent / 100) / (1 + inflationPercent / 100) - 1) * 100;
}

export function calculateFutureValue(
  initial: number,
  cagrPercent: number,
  years: number,
): number | null {
  if (initial <= 0 || years <= 0 || cagrPercent < 0) return null;
  return initial * Math.pow(1 + cagrPercent / 100, years);
}

export function calculateRequiredCagr(
  initial: number,
  target: number,
  years: number,
): number | null {
  if (initial <= 0 || target <= 0 || years <= 0) return null;
  return (Math.pow(target / initial, 1 / years) - 1) * 100;
}

export function buildYearlyGrowthTable(
  initial: number,
  cagrPercent: number,
  years: number,
): CagrYearRow[] {
  const rows: CagrYearRow[] = [];
  for (let year = 1; year <= years; year++) {
    const balance = calculateFutureValue(initial, cagrPercent, year) ?? initial;
    rows.push({
      year,
      balance,
      gain: balance - initial,
    });
  }
  return rows;
}

export type FindCagrResult = {
  mode: "find-cagr";
  initial: number;
  final: number;
  years: number;
  cagr: number;
  absoluteReturn: number;
  realCagr: number;
  doublingYears: number | null;
};

export type FindFvResult = {
  mode: "find-fv";
  initial: number;
  cagr: number;
  years: number;
  futureValue: number;
  totalGain: number;
  absoluteReturn: number;
  doublingYears: number | null;
  yearRows: CagrYearRow[];
};

export type FindRequiredResult = {
  mode: "find-required";
  initial: number;
  target: number;
  years: number;
  requiredCagr: number;
  doublingYears: number | null;
  niftyComparison: "above" | "below" | "within";
};

export function computeFindCagr(
  initial: number,
  final: number,
  years: number,
): FindCagrResult | null {
  const cagr = calculateCagr(initial, final, years);
  if (cagr === null) return null;
  return {
    mode: "find-cagr",
    initial,
    final,
    years,
    cagr,
    absoluteReturn: calculateAbsoluteReturn(initial, final),
    realCagr: calculateRealCagr(cagr),
    doublingYears: ruleOf72Years(cagr),
  };
}

export function computeFindFv(
  initial: number,
  cagrPercent: number,
  years: number,
): FindFvResult | null {
  const futureValue = calculateFutureValue(initial, cagrPercent, years);
  if (futureValue === null) return null;
  return {
    mode: "find-fv",
    initial,
    cagr: cagrPercent,
    years,
    futureValue,
    totalGain: futureValue - initial,
    absoluteReturn: calculateAbsoluteReturn(initial, futureValue),
    doublingYears: ruleOf72Years(cagrPercent),
    yearRows: buildYearlyGrowthTable(initial, cagrPercent, years),
  };
}

export function computeFindRequired(
  initial: number,
  target: number,
  years: number,
): FindRequiredResult | null {
  const requiredCagr = calculateRequiredCagr(initial, target, years);
  if (requiredCagr === null) return null;
  let niftyComparison: FindRequiredResult["niftyComparison"] = "within";
  if (requiredCagr > 15) niftyComparison = "above";
  else if (requiredCagr < 12) niftyComparison = "below";

  return {
    mode: "find-required",
    initial,
    target,
    years,
    requiredCagr,
    doublingYears: ruleOf72Years(requiredCagr),
    niftyComparison,
  };
}
