"use client";

import React from 'react';
import { X } from 'lucide-react';

interface RemoveItemModalProps {
  isOpen: boolean;
  productName: string;
  onRemove: () => void;
  onAddToWishlist: () => void;
  onClose: () => void;
}

export default function RemoveItemModal({
  isOpen,
  productName,
  onRemove,
  onAddToWishlist,
  onClose,
}: RemoveItemModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative shadow-lg pointer-events-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Remove Item?</h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to remove this item from your cart?
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              onAddToWishlist();
              onClose();
            }}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Add to Wishlist
          </button>
          <button
            onClick={() => {
              onRemove();
              onClose();
            }}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
