export type LoanTermYears = 15 | 20 | 30;

export type DownPaymentMode = "percent" | "dollar";

export type PropertyTaxMode = "annual" | "percent";

export type MortgageInputs = {
  homePrice: number;
  downPaymentMode: DownPaymentMode;
  downPaymentPercent: number;
  downPaymentDollar: number;
  loanTermYears: LoanTermYears;
  interestRatePercent: number;
  propertyTaxMode: PropertyTaxMode;
  propertyTaxAnnual: number;
  propertyTaxPercent: number;
  homeownersInsuranceAnnual: number;
  hoaMonthly: number;
  pmiRatePercent: number;
  extraMonthlyPayment: number;
};

export type AmortizationRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  totalPayment: number;
  remainingBalance: number;
};

export type MortgageResult = {
  downPayment: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  payoffDate: Date;
  hasPmi: boolean;
  pmiRemovedMonth: number | null;
  schedule: AmortizationRow[];
  extraPaymentSummary: {
    newPayoffDate: Date;
    monthsSaved: number;
    interestSaved: number;
    newTotalInterest: number;
  } | null;
};

const DEFAULT_PMI_RATE = 0.75;

export function downPaymentFromInputs(inputs: MortgageInputs): number {
  if (inputs.downPaymentMode === "percent") {
    return (Math.max(0, inputs.downPaymentPercent) / 100) * inputs.homePrice;
  }
  return Math.min(Math.max(0, inputs.downPaymentDollar), inputs.homePrice);
}

export function monthlyPayment(
  principal: number,
  annualRatePercent: number,
  termYears: number,
): number {
  if (principal <= 0) return 0;
  const r = annualRatePercent / 12 / 100;
  const n = termYears * 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

function propertyTaxAnnual(inputs: MortgageInputs): number {
  if (inputs.propertyTaxMode === "percent") {
    return (Math.max(0, inputs.propertyTaxPercent) / 100) * inputs.homePrice;
  }
  return Math.max(0, inputs.propertyTaxAnnual);
}

function buildAmortizationSchedule(
  loanAmount: number,
  annualRatePercent: number,
  termYears: number,
  extraMonthly: number,
  homePrice: number,
  downPayment: number,
): {
  schedule: AmortizationRow[];
  totalInterest: number;
  payoffDate: Date;
  pmiRemovedMonth: number | null;
} {
  const monthlyRate = annualRatePercent / 12 / 100;
  const basePayment = monthlyPayment(loanAmount, annualRatePercent, termYears);
  const maxMonths = termYears * 12 + 360;
  const hasPmi = downPayment / homePrice < 0.2;

  let balance = loanAmount;
  let totalInterest = 0;
  let pmiRemovedMonth: number | null = null;
  const schedule: AmortizationRow[] = [];
  const startDate = new Date();

  for (let month = 1; month <= maxMonths && balance > 0.005; month++) {
    const interest = balance * monthlyRate;
    let principal = Math.max(0, basePayment - interest);
    let extra = Math.max(0, extraMonthly);

    if (principal + extra > balance) {
      extra = Math.max(0, balance - principal);
      if (principal > balance) {
        principal = balance;
        extra = 0;
      }
    }

    const payment = interest + principal;
    const totalPayment = payment + extra;
    const newBalance = Math.max(0, balance - principal - extra);

    if (hasPmi && pmiRemovedMonth === null && newBalance / homePrice <= 0.8) {
      pmiRemovedMonth = month;
    }

    balance = newBalance;
    totalInterest += interest;

    schedule.push({
      month,
      payment,
      principal,
      interest,
      extraPayment: extra,
      totalPayment,
      remainingBalance: balance,
    });

    if (balance <= 0.005) {
      const payoffDate = new Date(startDate);
      payoffDate.setMonth(startDate.getMonth() + month);
      return {
        schedule,
        totalInterest,
        payoffDate,
        pmiRemovedMonth: hasPmi ? (pmiRemovedMonth ?? month) : null,
      };
    }
  }

  const payoffDate = new Date(startDate);
  payoffDate.setMonth(startDate.getMonth() + schedule.length);
  return { schedule, totalInterest, payoffDate, pmiRemovedMonth };
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult | null {
  const homePrice = Math.max(0, inputs.homePrice);
  if (homePrice <= 0) return null;

  const downPayment = downPaymentFromInputs(inputs);
  const loanAmount = Math.max(0, homePrice - downPayment);
  if (loanAmount <= 0) return null;

  const rate = Math.max(0, inputs.interestRatePercent);
  const term = inputs.loanTermYears;

  const monthlyPI = monthlyPayment(loanAmount, rate, term);
  const propTaxAnnual = propertyTaxAnnual(inputs);
  const monthlyPropertyTax = propTaxAnnual / 12;
  const monthlyInsurance = Math.max(0, inputs.homeownersInsuranceAnnual) / 12;
  const monthlyHoa = Math.max(0, inputs.hoaMonthly);

  const hasPmi = downPayment / homePrice < 0.2;
  const pmiRate = inputs.pmiRatePercent > 0 ? inputs.pmiRatePercent : DEFAULT_PMI_RATE;
  const monthlyPmi = hasPmi ? (loanAmount * (pmiRate / 100)) / 12 : 0;

  const baseSchedule = buildAmortizationSchedule(
    loanAmount,
    rate,
    term,
    0,
    homePrice,
    downPayment,
  );

  let extraPaymentSummary: MortgageResult["extraPaymentSummary"] = null;
  if (inputs.extraMonthlyPayment > 0) {
    const extraSchedule = buildAmortizationSchedule(
      loanAmount,
      rate,
      term,
      inputs.extraMonthlyPayment,
      homePrice,
      downPayment,
    );
    extraPaymentSummary = {
      newPayoffDate: extraSchedule.payoffDate,
      monthsSaved: baseSchedule.schedule.length - extraSchedule.schedule.length,
      interestSaved: baseSchedule.totalInterest - extraSchedule.totalInterest,
      newTotalInterest: extraSchedule.totalInterest,
    };
  }

  const totalMonthly =
    monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPmi + monthlyHoa;

  return {
    downPayment,
    loanAmount,
    monthlyPrincipalAndInterest: monthlyPI,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyPmi,
    monthlyHoa,
    totalMonthlyPayment: totalMonthly,
    totalInterestPaid: baseSchedule.totalInterest,
    payoffDate: baseSchedule.payoffDate,
    hasPmi,
    pmiRemovedMonth: baseSchedule.pmiRemovedMonth,
    schedule: baseSchedule.schedule,
    extraPaymentSummary,
  };
}

export function amortizationToCsv(rows: AmortizationRow[]): string {
  const header =
    "Month,Payment,Principal,Interest,Extra Payment,Total Payment,Remaining Balance";
  const lines = rows.map(
    (r) =>
      `${r.month},${r.payment.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.extraPayment.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBalance.toFixed(2)}`,
  );
  return [header, ...lines].join("\n");
}

export function formatPayoffDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}
