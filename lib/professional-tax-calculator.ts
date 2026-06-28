import {
  NO_PT_STATES,
  PROFESSIONAL_TAX_DATA,
  PT_TAX_SAVING_RATE,
  type StateData,
} from "@/lib/professional-tax-data";

export type PTGender = "male" | "female";

export type ProfessionalTaxResult = {
  stateKey: string;
  stateName: string;
  monthlySalary: number;
  gender: PTGender;
  noPtState: boolean;
  exempt: boolean;
  exemptReason?: string;
  monthlyPT: number;
  februaryPT: number | null;
  annualPT: number;
  incomeTaxSaving: number;
  halfYearlyNote?: string;
  stateNotes?: string;
  februaryNote?: string;
};

function getMonthlyPT(
  salary: number,
  state: StateData,
  gender: PTGender,
): { pt: number; exempt: boolean; exemptReason?: string } {
  if (
    state.womenExemptUpto &&
    gender === "female" &&
    salary <= state.womenExemptUpto
  ) {
    return {
      pt: 0,
      exempt: true,
      exemptReason: `Maharashtra women earning up to ₹${state.womenExemptUpto.toLocaleString("en-IN")}/month are exempt from Professional Tax.`,
    };
  }

  for (const slab of state.slabs) {
    if (
      salary >= slab.minSalary &&
      (slab.maxSalary === null || salary <= slab.maxSalary)
    ) {
      return { pt: slab.monthlyPT, exempt: false };
    }
  }

  return { pt: 0, exempt: false };
}

function calculateAnnualPT(monthlyPT: number, state: StateData): number {
  if (monthlyPT === 0) return 0;
  if (state.hasFebruaryExtra) {
    const februaryPT = monthlyPT + (state.extraFebruaryAmount ?? 0);
    return monthlyPT * 11 + februaryPT;
  }
  return monthlyPT * 12;
}

function getFebruaryPT(monthlyPT: number, state: StateData): number | null {
  if (!state.hasFebruaryExtra || monthlyPT === 0) return null;
  return monthlyPT + (state.extraFebruaryAmount ?? 0);
}

export function calculateProfessionalTax(input: {
  stateKey: string;
  monthlySalary: number;
  gender: PTGender;
}): ProfessionalTaxResult | null {
  if (input.monthlySalary < 0) return null;

  if (input.stateKey === "no_pt") {
    return {
      stateKey: "no_pt",
      stateName: "No PT State",
      monthlySalary: input.monthlySalary,
      gender: input.gender,
      noPtState: true,
      exempt: true,
      exemptReason: `Your state does not levy Professional Tax. States without PT include ${NO_PT_STATES.slice(0, 5).join(", ")}, and others.`,
      monthlyPT: 0,
      februaryPT: null,
      annualPT: 0,
      incomeTaxSaving: 0,
    };
  }

  const state = PROFESSIONAL_TAX_DATA[input.stateKey];
  if (!state) return null;

  const { pt, exempt, exemptReason } = getMonthlyPT(
    input.monthlySalary,
    state,
    input.gender,
  );

  const februaryPT = getFebruaryPT(pt, state);
  const annualPT = calculateAnnualPT(pt, state);

  return {
    stateKey: input.stateKey,
    stateName: state.name,
    monthlySalary: input.monthlySalary,
    gender: input.gender,
    noPtState: false,
    exempt,
    exemptReason,
    monthlyPT: pt,
    februaryPT,
    annualPT,
    incomeTaxSaving: annualPT * PT_TAX_SAVING_RATE,
    halfYearlyNote: state.halfYearly
      ? `${state.name} levies PT half-yearly. Consult your employer for exact billing cycle.`
      : undefined,
    stateNotes: state.notes,
    februaryNote:
      state.hasFebruaryExtra && pt > 0
        ? "February PT is ₹300 (not ₹200) — this is the Maharashtra annual total adjustment to reach ₹2,500."
        : undefined,
  };
}
