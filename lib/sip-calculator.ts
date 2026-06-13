export type SipResult = {
  totalInvested: number;
  estimatedReturns: number;
  maturityValue: number;
  yearlyBreakdown: {
    year: number;
    invested: number;
    returns: number;
  }[];
};

export function calculateSipReturns(
  monthlyInvestment: number,
  annualRatePercent: number,
  years: number
): SipResult | null {
  if (monthlyInvestment <= 0 || years <= 0 || annualRatePercent < 0) {
    return null;
  }

  const months = Math.round(years * 12);
  const monthlyRate = annualRatePercent / 12 / 100;

  let maturityValue: number;
  if (monthlyRate === 0) {
    maturityValue = monthlyInvestment * months;
  } else {
    const growth = Math.pow(1 + monthlyRate, months);
    maturityValue =
      monthlyInvestment *
      ((growth - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const totalInvested = monthlyInvestment * months;
  const estimatedReturns = maturityValue - totalInvested;

  const yearlyBreakdown: SipResult["yearlyBreakdown"] = [];
  const totalYears = Math.max(1, Math.ceil(years));

  for (let year = 1; year <= totalYears; year++) {
    const elapsedMonths = Math.min(year * 12, months);
    let yearMaturity: number;

    if (monthlyRate === 0) {
      yearMaturity = monthlyInvestment * elapsedMonths;
    } else {
      const growth = Math.pow(1 + monthlyRate, elapsedMonths);
      yearMaturity =
        monthlyInvestment *
        ((growth - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    const invested = monthlyInvestment * elapsedMonths;
    yearlyBreakdown.push({
      year,
      invested,
      returns: Math.max(0, yearMaturity - invested),
    });
  }

  return {
    totalInvested,
    estimatedReturns,
    maturityValue,
    yearlyBreakdown,
  };
}
