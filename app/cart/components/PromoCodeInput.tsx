"use client";

import React, { useState } from 'react';
import { Copy, X, Check } from 'lucide-react';
import { validateCoupon } from '@/lib/coupons';

interface PromoCodeInputProps {
  onApplyCoupon: (code: string, discount: number) => void;
  appliedCoupon: string | null;
  onRemoveCoupon: () => void;
}

export default function PromoCodeInput({
  onApplyCoupon,
  appliedCoupon,
  onRemoveCoupon,
}: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    if (!code.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    const coupon = validateCoupon(code);
    if (!coupon) {
      setError('Invalid coupon code');
      setCode('');
      return;
    }

    onApplyCoupon(code.toUpperCase(), coupon.discount);
    setCode('');
    setError('');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (appliedCoupon) {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">Promo/Code</label>
        <div className="flex items-center gap-2 bg-gray-900 text-white p-2 rounded">
          <span className="flex-1 font-mono font-semibold text-sm">{appliedCoupon}</span>
          <button
            onClick={() => handleCopy(appliedCoupon)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={onRemoveCoupon}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-700">Promo/Code</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError('');
          }}
          placeholder="Your available coupons..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleApply}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors flex items-center justify-center"
          title="Apply coupon"
        >
          <Check size={18} />
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
