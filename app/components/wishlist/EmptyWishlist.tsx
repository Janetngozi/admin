'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <Image
          src="/love.png"
          alt="Empty wishlist"
          width={120}
          height={120}
          className="w-32 h-32 object-contain"
        />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">See something you love? Save it here</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Add items to your wishlist and access them anytime you want
      </p>

      <Link
        href="/products"
        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Start shopping
      </Link>
    </div>
  );
}
