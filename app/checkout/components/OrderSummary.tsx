"use client";

import React from 'react';
import { useCart } from '@/lib/context/CartContext';

interface OrderSummaryProps {
  shippingCost?: number;
  taxRate?: number;
}

export default function OrderSummary({
  shippingCost = 0,
  taxRate = 0.1,
}: OrderSummaryProps) {
  const { items, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h3 className="font-semibold text-gray-900 text-base mb-4">Your Order</h3>

      {/* Column Headers */}
      <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-900">Product</p>
        <p className="text-sm font-semibold text-gray-900 text-center">Qty</p>
        <p className="text-sm font-semibold text-gray-900 text-right">Total</p>
      </div>

      {/* Products List */}
      <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-3 gap-2 items-start">
            <div className="flex-1">
              <p className="text-sm text-gray-900 font-medium">{item.name}</p>
            </div>
            <p className="text-sm text-gray-700 text-center">{item.quantity}</p>
            <p className="text-sm font-semibold text-gray-900 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total - with new background color */}
      <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-3 rounded-md" style={{ backgroundColor: '#323E44' }}>
        <span className="font-semibold">Order Total</span>
        <span className="text-xl font-bold">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
