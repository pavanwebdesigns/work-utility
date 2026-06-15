export function calculateTip(
  billAmount: number,
  tipPercent: number,
  people: number,
): {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
  tipPerPerson: number;
} {
  const tipAmount = (billAmount * tipPercent) / 100;
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / people;
  const tipPerPerson = tipAmount / people;
  return { tipAmount, totalAmount, perPerson, tipPerPerson };
}

export const TIP_PRESETS = [5, 10, 15, 18, 20, 25];
