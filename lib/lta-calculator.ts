export interface LTAInput {
  ltaReceived: number;
  actualTravelExpense: number;
  numberOfTrips: number;
}

export function calculateLTA(input: LTAInput): {
  exemptAmount: number;
  taxableAmount: number;
} {
  const exemptAmount = Math.min(
    input.ltaReceived,
    input.actualTravelExpense,
  );
  const taxableAmount = Math.max(0, input.ltaReceived - exemptAmount);

  return {
    exemptAmount: Math.round(exemptAmount),
    taxableAmount: Math.round(taxableAmount),
  };
}

export const LTA_RULES = {
  maxJourneysPerBlock: 2,
  blockYears: 4,
  eligibleExpenses:
    "Air, rail, or bus fare for self and family only (not hotel, food, or local transport)",
};
