'use client';

import Image from 'next/image';
import { WishlistItem } from '@/lib/types/Wishlist';

interface WishlistTableProps {
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
}

export default function WishlistTable({
  items,
  onRemove,
  onAddToCart,
}: WishlistTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">Image</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">Product name</th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-900">Unit price</th>
            <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900">Add</th>
            <th className="text-center py-4 px-4 text-sm font-semibold text-gray-900">Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
              {/* Image */}
              <td className="py-4 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-xs text-gray-500">No image</span>
                    </div>
                  )}
                </div>
              </td>

              {/* Product Name */}
              <td className="py-4 px-4">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
              </td>

              {/* Unit Price */}
              <td className="py-4 px-4">
                <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
              </td>

              {/* Add to Cart Button */}
              <td className="py-4 px-4 text-center">
                <button
                  onClick={() => onAddToCart(item)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  Add to cart
                </button>
              </td>

              {/* Remove Button */}
              <td className="py-4 px-4 text-center">
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-600 hover:text-red-700 text-lg font-bold transition-colors"
                  title="Remove from wishlist"
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
