export type SwpMode = "duration" | "corpus-needed";

export type SwpYearRow = {
  year: number;
  openingBalance: number;
  withdrawn: number;
  returns: number;
  closingBalance: number;
};

export type SwpDurationResult = {
  mode: "duration";
  corpus: number;
  monthlyWithdrawal: number;
  annualReturn: number;
  neverDepletes: boolean;
  totalMonths: number;
  years: number;
  monthsRemainder: number;
  totalWithdrawn: number;
  totalReturnsEarned: number;
  yearRows: SwpYearRow[];
  fdMonthlyIncome: number;
  monthlyReturnAtStart: number;
};

export type SwpCorpusNeededResult = {
  mode: "corpus-needed";
  monthlyIncomeNeeded: number;
  withdrawalYears: number;
  annualReturn: number;
  corpusRequired: number;
  totalWithdrawn: number;
  returnsFundingGap: number;
};

export const SWP_DISCLAIMER =
  "SWP projections assume constant returns — actual mutual fund returns vary. Capital gains tax on withdrawals not included in corpus depletion math.";

function monthlyRate(annualReturnPercent: number): number {
  return annualReturnPercent / 100 / 12;
}

export function simulateSwpDepletion(
  corpus: number,
  monthlyWithdrawal: number,
  annualReturnPercent: number,
  maxMonths = 600,
): {
  neverDepletes: boolean;
  totalMonths: number;
  yearRows: SwpYearRow[];
  totalWithdrawn: number;
  totalReturnsEarned: number;
} {
  const r = monthlyRate(annualReturnPercent);
  let balance = corpus;
  let month = 0;
  let totalWithdrawn = 0;
  let totalReturnsEarned = 0;
  const yearRows: SwpYearRow[] = [];

  const monthlyReturnAtStart = corpus * r;
  if (monthlyWithdrawal <= monthlyReturnAtStart && r > 0) {
    return {
      neverDepletes: true,
      totalMonths: Infinity,
      yearRows: [],
      totalWithdrawn: 0,
      totalReturnsEarned: 0,
    };
  }

  let yearOpening = balance;
  let yearWithdrawn = 0;
  let yearReturns = 0;

  while (balance > 0 && month < maxMonths) {
    month++;
    const interest = balance * r;
    totalReturnsEarned += interest;
    yearReturns += interest;
    balance += interest;

    const withdrawal = Math.min(monthlyWithdrawal, balance);
    balance -= withdrawal;
    totalWithdrawn += withdrawal;
    yearWithdrawn += withdrawal;

    if (month % 12 === 0 || balance <= 0) {
      yearRows.push({
        year: Math.ceil(month / 12),
        openingBalance: yearOpening,
        withdrawn: yearWithdrawn,
        returns: yearReturns,
        closingBalance: Math.max(0, balance),
      });
      yearOpening = balance;
      yearWithdrawn = 0;
      yearReturns = 0;
    }

    if (balance <= 0) break;
  }

  return {
    neverDepletes: false,
    totalMonths: month,
    yearRows,
    totalWithdrawn,
    totalReturnsEarned,
  };
}

export function calculateSwpDuration(
  corpus: number,
  monthlyWithdrawal: number,
  annualReturnPercent: number,
): SwpDurationResult | null {
  if (corpus <= 0 || monthlyWithdrawal <= 0 || annualReturnPercent < 0) {
    return null;
  }

  const sim = simulateSwpDepletion(corpus, monthlyWithdrawal, annualReturnPercent);
  const r = monthlyRate(annualReturnPercent);
  const monthlyReturnAtStart = corpus * r;
  const fdMonthlyIncome = (corpus * 0.07) / 12;

  if (sim.neverDepletes) {
    return {
      mode: "duration",
      corpus,
      monthlyWithdrawal,
      annualReturn: annualReturnPercent,
      neverDepletes: true,
      totalMonths: Infinity,
      years: Infinity,
      monthsRemainder: 0,
      totalWithdrawn: 0,
      totalReturnsEarned: 0,
      yearRows: [],
      fdMonthlyIncome,
      monthlyReturnAtStart,
    };
  }

  const years = Math.floor(sim.totalMonths / 12);
  const monthsRemainder = sim.totalMonths % 12;

  return {
    mode: "duration",
    corpus,
    monthlyWithdrawal,
    annualReturn: annualReturnPercent,
    neverDepletes: false,
    totalMonths: sim.totalMonths,
    years,
    monthsRemainder,
    totalWithdrawn: sim.totalWithdrawn,
    totalReturnsEarned: sim.totalReturnsEarned,
    yearRows: sim.yearRows,
    fdMonthlyIncome,
    monthlyReturnAtStart,
  };
}

export function calculateSwpCorpusNeeded(
  monthlyIncomeNeeded: number,
  withdrawalYears: number,
  annualReturnPercent: number,
): SwpCorpusNeededResult | null {
  if (
    monthlyIncomeNeeded <= 0 ||
    withdrawalYears <= 0 ||
    annualReturnPercent < 0
  ) {
    return null;
  }

  const r = monthlyRate(annualReturnPercent);
  const n = withdrawalYears * 12;
  let corpusRequired: number;

  if (r === 0) {
    corpusRequired = monthlyIncomeNeeded * n;
  } else {
    corpusRequired =
      (monthlyIncomeNeeded * (1 - Math.pow(1 + r, -n))) / r;
  }

  const totalWithdrawn = monthlyIncomeNeeded * n;
  const returnsFundingGap = totalWithdrawn - corpusRequired;

  return {
    mode: "corpus-needed",
    monthlyIncomeNeeded,
    withdrawalYears,
    annualReturn: annualReturnPercent,
    corpusRequired,
    totalWithdrawn,
    returnsFundingGap,
  };
}
