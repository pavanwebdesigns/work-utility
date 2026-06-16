export type CompoundFrequency =
  | "annually"
  | "semi-annually"
  | "quarterly"
  | "monthly"
  | "daily";

const FREQUENCY_MAP: Record<CompoundFrequency, number> = {
  annually: 1,
  "semi-annually": 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  frequency: CompoundFrequency = "annually",
  monthlyContribution: number = 0,
): {
  finalAmount: number;
  totalInterest: number;
  totalContributions: number;
  yearlyBreakdown: { year: number; amount: number }[];
} {
  const n = FREQUENCY_MAP[frequency];
  const r = rate / 100;
  let amount = principal;
  const yearlyBreakdown: { year: number; amount: number }[] = [];

  for (let year = 1; year <= years; year++) {
    for (let period = 0; period < n; period++) {
      amount = amount * (1 + r / n);
    }
    if (monthlyContribution > 0) {
      amount += monthlyContribution * 12;
    }
    yearlyBreakdown.push({ year, amount: Math.round(amount) });
  }

  const totalContributions = principal + monthlyContribution * 12 * years;
  const totalInterest = amount - totalContributions;

  return {
    finalAmount: amount,
    totalInterest,
    totalContributions,
    yearlyBreakdown,
  };
}
