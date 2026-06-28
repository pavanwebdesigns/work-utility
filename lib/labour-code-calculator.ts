export type CityType = "metro" | "non-metro";
export type PfPreference = "standard" | "full";

export type LabourCodeInput = {
  annualCtc: number;
  currentBasicPercent: number;
  cityType: CityType;
  pfPreference: PfPreference;
};

export type SalaryStructure = {
  basicAnnual: number;
  basicMonthly: number;
  hraAnnual: number;
  hraMonthly: number;
  employeePfAnnual: number;
  employeePfMonthly: number;
  employerPfAnnual: number;
  employerPfMonthly: number;
  specialAllowanceAnnual: number;
  specialAllowanceMonthly: number;
  takeHomeAnnual: number;
  takeHomeMonthly: number;
};

export type LabourCodeResult = {
  current: SalaryStructure;
  afterCode: SalaryStructure;
  professionalTaxAnnual: number;
  pfCorpusIncreaseAnnual: number;
  takeHomeChangeMonthly: number;
  takeHomeChangeAnnual: number;
  gratuityAccrualIncreaseMonthly: number;
};

const MIN_WAGE_FLOOR_ANNUAL = 150_000;
const PF_CAP_MONTHLY = 1_800;
const PF_CAP_ANNUAL = PF_CAP_MONTHLY * 12;
const PROFESSIONAL_TAX_ANNUAL = 2_400;

function hraRate(cityType: CityType): number {
  return cityType === "metro" ? 0.5 : 0.4;
}

function calculatePf(basicAnnual: number, pfPreference: PfPreference): number {
  const uncapped = basicAnnual * 0.12;
  if (pfPreference === "standard") {
    return Math.min(uncapped, PF_CAP_ANNUAL);
  }
  return uncapped;
}

function buildStructure(
  annualCtc: number,
  basicAnnual: number,
  cityType: CityType,
  pfPreference: PfPreference,
): SalaryStructure {
  const hraAnnual = basicAnnual * hraRate(cityType);
  const employeePfAnnual = calculatePf(basicAnnual, pfPreference);
  const employerPfAnnual = calculatePf(basicAnnual, pfPreference);
  const specialAllowanceAnnual = Math.max(
    0,
    annualCtc - basicAnnual - hraAnnual - employerPfAnnual,
  );
  const takeHomeAnnual =
    annualCtc -
    employeePfAnnual -
    employerPfAnnual -
    PROFESSIONAL_TAX_ANNUAL;

  return {
    basicAnnual,
    basicMonthly: basicAnnual / 12,
    hraAnnual,
    hraMonthly: hraAnnual / 12,
    employeePfAnnual,
    employeePfMonthly: employeePfAnnual / 12,
    employerPfAnnual,
    employerPfMonthly: employerPfAnnual / 12,
    specialAllowanceAnnual,
    specialAllowanceMonthly: specialAllowanceAnnual / 12,
    takeHomeAnnual,
    takeHomeMonthly: takeHomeAnnual / 12,
  };
}

function gratuityMonthlyAccrual(basicMonthly: number): number {
  return (basicMonthly / 26) * 15;
}

export function calculateLabourCodeImpact(
  input: LabourCodeInput,
): LabourCodeResult | null {
  const { annualCtc, currentBasicPercent, cityType, pfPreference } = input;

  if (annualCtc <= 0 || currentBasicPercent <= 0) return null;

  const currentBasicAnnual = annualCtc * (currentBasicPercent / 100);
  const newBasicAnnual = Math.max(
    annualCtc * 0.5,
    MIN_WAGE_FLOOR_ANNUAL,
  );

  const current = buildStructure(
    annualCtc,
    currentBasicAnnual,
    cityType,
    pfPreference,
  );
  const afterCode = buildStructure(
    annualCtc,
    newBasicAnnual,
    cityType,
    pfPreference,
  );

  const pfCorpusIncreaseAnnual =
    afterCode.employeePfAnnual +
    afterCode.employerPfAnnual -
    (current.employeePfAnnual + current.employerPfAnnual);

  const takeHomeChangeAnnual =
    afterCode.takeHomeAnnual - current.takeHomeAnnual;

  return {
    current,
    afterCode,
    professionalTaxAnnual: PROFESSIONAL_TAX_ANNUAL,
    pfCorpusIncreaseAnnual,
    takeHomeChangeMonthly: takeHomeChangeAnnual / 12,
    takeHomeChangeAnnual,
    gratuityAccrualIncreaseMonthly:
      gratuityMonthlyAccrual(afterCode.basicMonthly) -
      gratuityMonthlyAccrual(current.basicMonthly),
  };
}
