export const AVG_INFLATION_RATES = {
  US: 3.2,
  India: 6.5,
};

export function calculateInflation(
  amount: number,
  years: number,
  inflationRate: number,
): {
  futureValue: number;
  pastValue: number;
  purchasingPowerLoss: number;
} {
  const rate = inflationRate / 100;
  const futureValue = amount * Math.pow(1 + rate, years);
  const pastValue = amount / Math.pow(1 + rate, years);
  const purchasingPowerLoss = ((futureValue - amount) / futureValue) * 100;

  return {
    futureValue: Math.round(futureValue),
    pastValue: Math.round(pastValue),
    purchasingPowerLoss: Math.round(purchasingPowerLoss * 10) / 10,
  };
}
