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
  currentBlock: "2026–2029",
  previousBlock: "2022–2025",
  eligibleExpenses:
    "Air, rail, or bus fare for self and family only (not hotel, food, or local transport)",
  taxRegimeNote:
    "LTA exemption is available only under the Old Tax Regime — not the New Tax Regime (Section 115BAC).",
};
