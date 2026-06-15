export function calculateDiscount(
  originalPrice: number,
  discountPercent: number,
): {
  discountAmount: number;
  finalPrice: number;
  savings: number;
} {
  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;
  return { discountAmount, finalPrice, savings: discountAmount };
}

export function calculateDiscountPercent(
  originalPrice: number,
  finalPrice: number,
): number {
  return ((originalPrice - finalPrice) / originalPrice) * 100;
}

export function calculateOriginalPrice(
  finalPrice: number,
  discountPercent: number,
): number {
  return finalPrice / (1 - discountPercent / 100);
}
