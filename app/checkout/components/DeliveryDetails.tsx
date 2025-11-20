"use client";

import React from 'react';
import { ChevronDown, ChevronUp, Truck } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

interface DeliveryDetailsFormData {
  shippingMethod: 'standard' | 'express' | 'overnight';
}

interface DeliveryDetailsProps {
  isExpanded: boolean;
  onToggle: () => void;
  formData: DeliveryDetailsFormData;
  onFormDataChange: (data: DeliveryDetailsFormData) => void;
  isCompleted: boolean;
}

export default function DeliveryDetails({
  isExpanded,
  onToggle,
  formData,
  onFormDataChange,
  isCompleted,
}: DeliveryDetailsProps) {
  const { items } = useCart();

  const handleMethodChange = () => {
    onFormDataChange({
      ...formData,
      shippingMethod: 'standard',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col items-start">
          <h3 className="font-semibold text-gray-900 text-base">Delivery Method</h3>
          {isCompleted && (
            <p className="text-sm text-gray-600 mt-1">
              Door Delivery - Arrives between 3-5 days
            </p>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200 space-y-6">
          {/* Delivery Options Header */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-200">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Door delivery</h4>
            </div>
            <div className="text-right">
              <h4 className="text-lg font-semibold text-gray-900">Arrives between 3-5 days</h4>
            </div>
          </div>

          {/* Door Delivery Card */}
          <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-4">
              {/* Radio Button */}
              <div className="mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>

              {/* Delivery Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-4 h-4 text-gray-600" />
                  <h5 className="font-semibold text-gray-900">Door Delivery</h5>
                </div>
                <p className="text-sm text-gray-600">Arrives between 3-5 days</p>
                <p className="text-sm font-semibold text-gray-900 mt-2">FREE</p>
              </div>
            </div>
          </div>

          {/* Products in Order */}
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">What you are getting</h4>
            
            <div className="space-y-3">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No items in cart</p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onToggle}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
