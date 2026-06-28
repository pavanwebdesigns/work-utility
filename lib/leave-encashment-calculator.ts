export type LeaveEncashmentType = "during-service" | "retirement";
export type LeaveBasis = "private" | "government";

export type LeaveEncashmentResult = {
  monthlyBasic: number;
  leaveDays: number;
  encashmentType: LeaveEncashmentType;
  basis: LeaveBasis;
  encashmentAmount: number;
  privateSectorAmount: number;
  governmentAmount: number;
  taxExemption: number;
  taxableAmount: number;
  taxPayable: number;
  netAfterTax: number;
  slabRate: number;
  exemptionBreakdown: {
    actual: number;
    tenMonthsSalary: number;
    statutoryLimit: number;
    cashEquivalent: number;
    exemptAmount: number;
  };
};

export const LEAVE_ENCASHMENT_EXEMPTION_LIMIT = 2_500_000;

export const LEAVE_ENCASHMENT_DISCLAIMER =
  "Based on Indian Income Tax rules — Budget 2023 raised retirement leave encashment exemption to ₹25 lakhs. Encashment during service is fully taxable. Verify calculation basis with your employer HR policy.";

export function calculatePrivateEncashment(
  monthlyBasic: number,
  leaveDays: number,
): number {
  return (monthlyBasic / 26) * leaveDays;
}

export function calculateGovernmentEncashment(
  monthlyBasic: number,
  leaveDays: number,
): number {
  return ((monthlyBasic * 12) / 300) * leaveDays;
}

export function calculateLeaveEncashment(
  monthlyBasic: number,
  leaveDays: number,
  encashmentType: LeaveEncashmentType,
  basis: LeaveBasis,
  slabRatePercent: number,
): LeaveEncashmentResult | null {
  if (
    monthlyBasic <= 0 ||
    leaveDays < 1 ||
    leaveDays > 300 ||
    slabRatePercent < 0 ||
    slabRatePercent > 30
  ) {
    return null;
  }

  const privateSectorAmount = calculatePrivateEncashment(monthlyBasic, leaveDays);
  const governmentAmount = calculateGovernmentEncashment(monthlyBasic, leaveDays);
  const encashmentAmount =
    basis === "government" ? governmentAmount : privateSectorAmount;

  const tenMonthsSalary = monthlyBasic * 10;
  const statutoryLimit = LEAVE_ENCASHMENT_EXEMPTION_LIMIT;
  const cashEquivalent = encashmentAmount;

  let taxExemption = 0;
  if (encashmentType === "retirement") {
    taxExemption = Math.min(
      encashmentAmount,
      tenMonthsSalary,
      statutoryLimit,
      cashEquivalent,
    );
  }

  const taxableAmount = Math.max(0, encashmentAmount - taxExemption);
  const taxPayable = taxableAmount * (slabRatePercent / 100);
  const netAfterTax = encashmentAmount - taxPayable;

  return {
    monthlyBasic,
    leaveDays,
    encashmentType,
    basis,
    encashmentAmount,
    privateSectorAmount,
    governmentAmount,
    taxExemption,
    taxableAmount,
    taxPayable,
    netAfterTax,
    slabRate: slabRatePercent,
    exemptionBreakdown: {
      actual: encashmentAmount,
      tenMonthsSalary,
      statutoryLimit,
      cashEquivalent,
      exemptAmount: taxExemption,
    },
  };
}
