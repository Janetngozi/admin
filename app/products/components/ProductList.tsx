'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/lib/context/CartContext';

interface ProductListProps {
  onWishlistClick: (productId: string, success: boolean) => void;
  onAddToCart?: (message: string) => void;
}

export default function ProductList({ onWishlistClick, onAddToCart }: ProductListProps) {
  const [favorites, setFavorites] = React.useState<{ [key: string]: boolean }>({});
  const { addItem } = useCart();

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    onWishlistClick(id, !favorites[id]);
  };

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    onAddToCart?.(`${product.name} added to cart!`);
  };

  return (
    <div className="space-y-4">
      {PRODUCTS.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex gap-4">
          {/* Product Image */}
          <div className="w-32 h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
            <Link href={`/products/${product.id}`} className="block w-full h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="font-bold text-base text-gray-900 mb-1">
                  <Link href={`/products/${product.id}`} className="hover:underline">{product.name}</Link>
                </h4>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>

              <button
                onClick={() => toggleFavorite(product.id)}
                className="p-2 rounded-full transition-shadow duration-200 shrink-0"
                title="Add to favorites"
              >
                <Heart
                  className="w-5 h-5"
                  fill={favorites[product.id] ? '#ef4444' : 'none'}
                  stroke={favorites[product.id] ? '#ef4444' : '#d1d5db'}
                />
              </button>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
              <button 
                onClick={() => handleAddToCart(product)}
                className="py-2 px-6 border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-900 font-medium rounded-lg transition-colors duration-200 text-sm"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
