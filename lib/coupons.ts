export const MOCK_COUPONS = [
  { code: 'SAVE10', discount: 10, type: 'percentage' },
  { code: 'SAVE20', discount: 20, type: 'percentage' },
  { code: 'FLAT500', discount: 500, type: 'fixed' },
  { code: 'WELCOME', discount: 15, type: 'percentage' },
  { code: 'SPECIAL', discount: 25, type: 'percentage' },
  { code: 'SUMMER', discount: 30, type: 'percentage' },
];

export function validateCoupon(code: string) {
  const coupon = MOCK_COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());
  return coupon || null;
}

export function calculateDiscount(code: string, total: number) {
  const coupon = validateCoupon(code);
  if (!coupon) return 0;
  
  if (coupon.type === 'percentage') {
    return (total * coupon.discount) / 100;
  } else {
    return coupon.discount;
  }
}
