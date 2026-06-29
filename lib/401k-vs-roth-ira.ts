export const FEDERAL_TAX_BRACKETS = [10, 12, 22, 24, 32, 35, 37] as const;

export type FederalBracket = (typeof FEDERAL_TAX_BRACKETS)[number];

export const LIMITS_2026 = {
  fourOhOneK: 24_500,
  ira: 7_500,
  iraCatchUp: 8_600,
} as const;

export const ROTH_IRA_INCOME_LIMITS = {
  singlePhaseOut: { start: 150_000, end: 168_000 },
  mfjPhaseOut: { start: 236_000, end: 252_000 },
} as const;

export const FOUR_OH_ONE_K_VS_ROTH_DISCLAIMER =
  "Based on 2026 IRS rules. Tax laws change. Consult a CFP or CPA for personalized retirement planning.";

export type AccountScenario = {
  label: string;
  annualContribution: number;
  taxSavingToday: number;
  netAnnualCost: number;
  futureBalance: number;
  taxOnWithdrawal: number;
  netRetirementMoney: number;
  rmdsRequired: boolean;
};

export type VerdictType = "roth" | "traditional" | "equal";

export type FourOhOneKVsRothResult = {
  years: number;
  annualContribution: number;
  currentCombinedRate: number;
  retirementCombinedRate: number;
  expectedReturn: number;
  traditional: AccountScenario;
  roth401k: AccountScenario;
  rothIra: AccountScenario;
  verdict: VerdictType;
  verdictMessage: string;
};

function futureValueAnnuity(
  annualPayment: number,
  annualRate: number,
  years: number,
): number {
  if (years <= 0 || annualPayment <= 0) return 0;
  if (annualRate === 0) return annualPayment * years;
  const r = annualRate / 100;
  return annualPayment * ((Math.pow(1 + r, years) - 1) / r);
}

function getVerdict(
  currentRate: number,
  retirementRate: number,
): { verdict: VerdictType; message: string } {
  if (currentRate < retirementRate) {
    return {
      verdict: "roth",
      message:
        "🏆 Roth is better. You'll pay lower taxes now than later.",
    };
  }
  if (currentRate > retirementRate) {
    return {
      verdict: "traditional",
      message:
        "🏆 Traditional is better. You'll pay lower taxes in retirement.",
    };
  }
  return {
    verdict: "equal",
    message:
      "⚖️ Both are roughly equal. Consider Roth for tax flexibility and no RMDs.",
  };
}

function buildRothScenario(
  label: string,
  annualContribution: number,
  futureBalance: number,
  rmdsRequired: boolean,
): AccountScenario {
  return {
    label,
    annualContribution,
    taxSavingToday: 0,
    netAnnualCost: annualContribution,
    futureBalance,
    taxOnWithdrawal: 0,
    netRetirementMoney: futureBalance,
    rmdsRequired,
  };
}

export function calculate401kVsRothIra(input: {
  currentAge: number;
  retirementAge: number;
  annualContribution: number;
  currentFederalBracket: FederalBracket;
  retirementFederalBracket: FederalBracket;
  stateTaxRate: number;
  expectedReturn: number;
}): FourOhOneKVsRothResult | null {
  const {
    currentAge,
    retirementAge,
    annualContribution,
    currentFederalBracket,
    retirementFederalBracket,
    stateTaxRate,
    expectedReturn,
  } = input;

  if (
    currentAge < 18 ||
    retirementAge <= currentAge ||
    annualContribution <= 0 ||
    expectedReturn < 0
  ) {
    return null;
  }

  const years = retirementAge - currentAge;
  const currentCombinedRate = currentFederalBracket + stateTaxRate;
  const retirementCombinedRate = retirementFederalBracket + stateTaxRate;

  const traditionalFv = futureValueAnnuity(
    annualContribution,
    expectedReturn,
    years,
  );
  const rothFv = futureValueAnnuity(annualContribution, expectedReturn, years);
  const iraContribution = Math.min(annualContribution, LIMITS_2026.ira);
  const rothIraFv = futureValueAnnuity(
    iraContribution,
    expectedReturn,
    years,
  );

  const traditionalTaxSaving =
    annualContribution * (currentCombinedRate / 100);
  const traditionalNetCost =
    annualContribution * (1 - currentCombinedRate / 100);
  const traditionalTaxOnWithdrawal =
    traditionalFv * (retirementCombinedRate / 100);

  const { verdict, message } = getVerdict(
    currentCombinedRate,
    retirementCombinedRate,
  );

  return {
    years,
    annualContribution,
    currentCombinedRate,
    retirementCombinedRate,
    expectedReturn,
    traditional: {
      label: "Traditional 401k",
      annualContribution,
      taxSavingToday: traditionalTaxSaving,
      netAnnualCost: traditionalNetCost,
      futureBalance: traditionalFv,
      taxOnWithdrawal: traditionalTaxOnWithdrawal,
      netRetirementMoney: traditionalFv - traditionalTaxOnWithdrawal,
      rmdsRequired: true,
    },
    roth401k: buildRothScenario(
      "Roth 401k",
      annualContribution,
      rothFv,
      false,
    ),
    rothIra: buildRothScenario(
      "Roth IRA",
      iraContribution,
      rothIraFv,
      false,
    ),
    verdict,
    verdictMessage: message,
  };
}
