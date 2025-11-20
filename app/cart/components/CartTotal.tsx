"use client";

import React from 'react';
import Link from 'next/link';

interface CartTotalProps {
  subtotal: number;
  discount: number;
  total: number;
}

export default function CartTotal({ subtotal, discount, total }: CartTotalProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Cart Total</h3>

      {/* Subtotal */}
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="text-base text-gray-600">Subtotal</span>
        <span className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-base text-gray-600">Discount</span>
          <span className="text-base font-medium text-green-600">-${discount.toFixed(2)}</span>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center py-3 border-t border-gray-200 pt-4">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center rounded-lg transition-colors"
      >
        Checkout
      </Link>
    </div>
  );
}
