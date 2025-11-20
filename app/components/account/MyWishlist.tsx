'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/lib/context/WishlistContext';

export default function MyWishlist() {
  const { items: wishlistItems, removeItem } = useWishlist();
  
  // Get the first 5 items to display in account page
  const displayItems = wishlistItems.slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
        <Link href="/wishlist" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All
        </Link>
      </div>

      {displayItems.length === 0 ? (
        <p className="text-gray-600 text-center py-8">Your wishlist is empty</p>
      ) : (
        <div className="space-y-3">
          {displayItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
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

              {/* Product Info */}
              <div className="grow">
                <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                <p className="text-blue-600 font-semibold text-sm">${item.price}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700 text-lg font-bold transition-colors"
                title="Remove from wishlist"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
