import { calculateFdReturns } from "@/lib/fd-calculator";

export type RdPeriodRow = {
  period: number;
  label: string;
  deposited: number;
  interest: number;
  balance: number;
};

export type RdResult = {
  monthlyDeposit: number;
  annualRate: number;
  tenureMonths: number;
  totalDeposited: number;
  interestEarned: number;
  maturityValue: number;
  periodRows: RdPeriodRow[];
  fdComparison: {
    lumpSum: number;
    fdMaturity: number;
    difference: number;
    rdBetter: boolean;
  };
};

export function calculateRd(
  monthlyDeposit: number,
  annualRatePercent: number,
  tenureMonths: number,
): RdResult | null {
  if (
    monthlyDeposit < 500 ||
    monthlyDeposit > 100_000 ||
    tenureMonths < 3 ||
    tenureMonths > 120 ||
    annualRatePercent < 0
  ) {
    return null;
  }

  const quarters = Math.floor(tenureMonths / 3);
  if (quarters < 1) return null;

  const i = annualRatePercent / 4 / 100;
  const n = quarters;
  const maturityValue =
    monthlyDeposit *
    ((Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1 / 3)));

  const totalDeposited = monthlyDeposit * tenureMonths;
  const interestEarned = maturityValue - totalDeposited;

  const periodRows: RdPeriodRow[] = [];
  let balance = 0;

  for (let q = 1; q <= quarters; q++) {
    const monthsInQuarter = Math.min(3, tenureMonths - (q - 1) * 3);
    const quarterDeposit = monthlyDeposit * monthsInQuarter;
    balance += quarterDeposit;
    const interest = balance * i;
    balance += interest;
    periodRows.push({
      period: q,
      label: `Q${q}`,
      deposited: quarterDeposit,
      interest,
      balance,
    });
  }

  const fd = calculateFdReturns(
    totalDeposited,
    annualRatePercent,
    tenureMonths / 12,
    "quarterly",
  );
  const fdMaturity = fd?.maturityAmount ?? totalDeposited;

  return {
    monthlyDeposit,
    annualRate: annualRatePercent,
    tenureMonths,
    totalDeposited,
    interestEarned,
    maturityValue,
    periodRows,
    fdComparison: {
      lumpSum: totalDeposited,
      fdMaturity,
      difference: Math.abs(maturityValue - fdMaturity),
      rdBetter: maturityValue >= fdMaturity,
    },
  };
}
