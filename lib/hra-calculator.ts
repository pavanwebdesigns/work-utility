export interface HRAInput {
  basicSalary: number;
  dearnessAllowance: number;
  hraReceived: number;
  rentPaid: number;
  isMetroCity: boolean;
}

export interface HRAResult {
  exemptHRA: number;
  taxableHRA: number;
  calculation: {
    actualHRA: number;
    percentOfBasic: number;
    rentMinusBasic10: number;
    exemptAmount: number;
  };
}

export function calculateHRA(input: HRAInput): HRAResult {
  const {
    basicSalary,
    dearnessAllowance,
    hraReceived,
    rentPaid,
    isMetroCity,
  } = input;

  const basicPlusDA = basicSalary + dearnessAllowance;

  const actualHRA = hraReceived;
  const percentOfBasic = basicPlusDA * (isMetroCity ? 0.5 : 0.4);
  const rentMinusBasic10 = Math.max(0, rentPaid - basicPlusDA * 0.1);

  const exemptAmount = Math.min(actualHRA, percentOfBasic, rentMinusBasic10);

  const exemptHRA = Math.max(0, exemptAmount);
  const taxableHRA = Math.max(0, hraReceived - exemptHRA);

  return {
    exemptHRA,
    taxableHRA,
    calculation: {
      actualHRA,
      percentOfBasic,
      rentMinusBasic10,
      exemptAmount,
    },
  };
}

export function annualHRA(monthly: number): number {
  return monthly * 12;
}
