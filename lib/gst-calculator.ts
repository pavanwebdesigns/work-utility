export type GstMode = "add" | "remove";

export type GstResult = {
  originalAmount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
};

export const GST_RATES = [0, 5, 12, 18, 28] as const;

export function calculateGst(
  amount: number,
  ratePercent: number,
  mode: GstMode
): GstResult | null {
  if (amount <= 0 || ratePercent < 0) return null;

  if (mode === "add") {
    const gstAmount = (amount * ratePercent) / 100;
    return {
      originalAmount: amount,
      gstAmount,
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      totalAmount: amount + gstAmount,
    };
  }

  const originalAmount = amount / (1 + ratePercent / 100);
  const gstAmount = amount - originalAmount;

  return {
    originalAmount,
    gstAmount,
    cgst: gstAmount / 2,
    sgst: gstAmount / 2,
    totalAmount: amount,
  };
}
