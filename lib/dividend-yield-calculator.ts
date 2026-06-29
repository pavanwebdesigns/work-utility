export const DIVIDEND_TDS_THRESHOLD = 5_000;
export const DIVIDEND_TDS_RATE = 10;
export const FD_COMPARISON_RATE = 7;

export const DIVIDEND_DISCLAIMER =
  "Dividend income is taxable at your applicable slab rate. TDS @ 10% if annual dividend from a company exceeds ₹5,000. NRIs are taxed at 20% TDS. This is not investment advice.";

export type DividendFrequency = "annual" | "semi-annual" | "quarterly";

export type PortfolioStock = {
  id: string;
  name: string;
  annualDps: number;
  cmp: number;
  shares: number;
};

export type SingleStockResult = {
  mode: "single";
  annualDps: number;
  cmp: number;
  purchasePrice: number;
  shares: number;
  frequency: DividendFrequency;
  currentYield: number;
  yieldOnCost: number;
  annualIncome: number;
  monthlyIncome: number;
  tdsApplicable: boolean;
  tdsAmount: number;
  netAnnualIncome: number;
  investedAmount: number;
  fdAnnualIncome: number;
  yieldVsFd: "higher" | "lower" | "equal";
};

export type PortfolioResult = {
  mode: "portfolio";
  stocks: PortfolioStock[];
  totalAnnualIncome: number;
  totalMonthlyIncome: number;
  weightedCurrentYield: number;
  totalInvested: number;
  fdAnnualIncome: number;
  tdsApplicable: boolean;
  tdsAmount: number;
  netAnnualIncome: number;
};

export function annualizeDps(
  dps: number,
  frequency: DividendFrequency,
): number {
  if (frequency === "semi-annual") return dps * 2;
  if (frequency === "quarterly") return dps * 4;
  return dps;
}

export function calculateSingleStockDividend(input: {
  annualDps: number;
  cmp: number;
  purchasePrice: number;
  shares: number;
  frequency: DividendFrequency;
}): SingleStockResult | null {
  const { annualDps, cmp, purchasePrice, shares, frequency } = input;
  if (annualDps <= 0 || cmp <= 0 || purchasePrice <= 0 || shares <= 0) {
    return null;
  }

  const annualPerShare = annualizeDps(annualDps, frequency);
  const currentYield = (annualPerShare / cmp) * 100;
  const yieldOnCost = (annualPerShare / purchasePrice) * 100;
  const annualIncome = annualPerShare * shares;
  const monthlyIncome = annualIncome / 12;
  const tdsApplicable = annualIncome > DIVIDEND_TDS_THRESHOLD;
  const tdsAmount = tdsApplicable
    ? annualIncome * (DIVIDEND_TDS_RATE / 100)
    : 0;
  const netAnnualIncome = annualIncome - tdsAmount;
  const investedAmount = purchasePrice * shares;
  const fdAnnualIncome = investedAmount * (FD_COMPARISON_RATE / 100);
  const yieldVsFd =
    annualIncome > fdAnnualIncome
      ? "higher"
      : annualIncome < fdAnnualIncome
        ? "lower"
        : "equal";

  return {
    mode: "single",
    annualDps: annualPerShare,
    cmp,
    purchasePrice,
    shares,
    frequency,
    currentYield,
    yieldOnCost,
    annualIncome,
    monthlyIncome,
    tdsApplicable,
    tdsAmount,
    netAnnualIncome,
    investedAmount,
    fdAnnualIncome,
    yieldVsFd,
  };
}

export function calculatePortfolioDividend(
  stocks: PortfolioStock[],
): PortfolioResult | null {
  const valid = stocks.filter(
    (s) => s.annualDps > 0 && s.cmp > 0 && s.shares > 0,
  );
  if (valid.length === 0) return null;

  let totalAnnualIncome = 0;
  let totalInvested = 0;
  let weightedYieldSum = 0;

  for (const stock of valid) {
    const income = stock.annualDps * stock.shares;
    const invested = stock.cmp * stock.shares;
    totalAnnualIncome += income;
    totalInvested += invested;
    weightedYieldSum += (stock.annualDps / stock.cmp) * 100 * invested;
  }

  const weightedCurrentYield =
    totalInvested > 0 ? weightedYieldSum / totalInvested : 0;
  const tdsApplicable = totalAnnualIncome > DIVIDEND_TDS_THRESHOLD;
  const tdsAmount = tdsApplicable
    ? totalAnnualIncome * (DIVIDEND_TDS_RATE / 100)
    : 0;

  return {
    mode: "portfolio",
    stocks: valid,
    totalAnnualIncome,
    totalMonthlyIncome: totalAnnualIncome / 12,
    weightedCurrentYield,
    totalInvested,
    fdAnnualIncome: totalInvested * (FD_COMPARISON_RATE / 100),
    tdsApplicable,
    tdsAmount,
    netAnnualIncome: totalAnnualIncome - tdsAmount,
  };
}
