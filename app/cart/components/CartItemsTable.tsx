"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { CartItem } from '@/lib/context/CartContext';
import RemoveItemModal from './RemoveItemModal';

interface CartItemsTableProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddToWishlist: (item: CartItem) => void;
  onQuantityChanged?: () => void;
}

export default function CartItemsTable({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddToWishlist,
  onQuantityChanged,
}: CartItemsTableProps) {
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleRemoveClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setRemoveModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedItemId) {
      onRemoveItem(selectedItemId);
      setRemoveModalOpen(false);
      setSelectedItemId(null);
    }
  };

  const handleAddToWishlist = () => {
    if (selectedItemId) {
      const item = items.find((i) => i.id === selectedItemId);
      if (item) {
        onAddToWishlist(item);
      }
    }
  };

  const selectedItem = items.find((i) => i.id === selectedItemId);

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-2 border-gray-300 bg-gray-50">
              <th className="py-4 px-4 text-left text-xs font-semibold text-gray-900 w-24">Image</th>
              <th className="py-4 px-4 text-left text-xs font-semibold text-gray-900">Product name</th>
              <th className="py-4 px-4 text-left text-xs font-semibold text-gray-900 w-24">Unit price</th>
              <th className="py-4 px-4 text-left text-xs font-semibold text-gray-900 w-24">Quantity</th>
              <th className="py-4 px-4 text-left text-xs font-semibold text-gray-900 w-24">Total</th>
              <th className="py-4 px-4 text-center text-xs font-semibold text-gray-900 w-20">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-2 border-gray-300 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                {/* Product Image */}
                <td className="py-4 px-4">
                  <Link href={`/products/${item.id}`} className="block">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded border border-gray-200 hover:border-blue-400 transition-colors"
                    />
                  </Link>
                </td>

                {/* Product Name */}
                <td className="py-4 px-4">
                  <Link
                    href={`/products/${item.id}`}
                    className="text-sm text-gray-900 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                </td>

                {/* Unit Price */}
                <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                  ${item.price.toFixed(2)}
                </td>

                {/* Quantity Controls */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 border border-gray-300 rounded w-fit">
                    <button
                      onClick={() => {
                        onUpdateQuantity(item.id, Math.max(1, item.quantity - 1));
                        onQuantityChanged?.();
                      }}
                      className="px-2 py-0.5 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        onUpdateQuantity(item.id, Math.max(1, val));
                        onQuantityChanged?.();
                      }}
                      className="w-10 text-center text-sm font-bold border-0 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        onUpdateQuantity(item.id, item.quantity + 1);
                        onQuantityChanged?.();
                      }}
                      className="px-2 py-0.5 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Total */}
                <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

                {/* Remove Button */}
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => handleRemoveClick(item.id)}
                    className="inline-flex items-center justify-center text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Remove Item Modal */}
      <RemoveItemModal
        isOpen={removeModalOpen}
        productName={selectedItem?.name || ''}
        onRemove={handleConfirmRemove}
        onAddToWishlist={handleAddToWishlist}
        onClose={() => {
          setRemoveModalOpen(false);
          setSelectedItemId(null);
        }}
      />
    </>
  );
}
