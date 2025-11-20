"use client";

import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  reviewCount?: number;
}

interface Props {
  product: Product;
  onWishlist: (productId: string, isFavorited: boolean) => void;
  onAddToCart?: (message: string) => void;
}

export default function ProductDetails({ product, onWishlist, onAddToCart }: Props) {
  const [qty, setQty] = React.useState(1);
  const [fav, setFav] = React.useState(false);
  const { addItem } = useCart();

  const toggleFav = () => {
    setFav((s) => {
      const next = !s;
      onWishlist(product.id, next);
      return next;
    });
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
    });
    onAddToCart?.(
      `${product.name} ${qty > 1 ? `(${qty} items)` : ''} added to cart successfully!`
    );
    setQty(1);
  };

  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 13;

  return (
    <div className="flex flex-col h-full">
      {/* Product name and wishlist */}
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <button onClick={toggleFav} className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Add to favorites">
          <Heart className="w-6 h-6" fill={fav ? '#ef4444' : 'none'} stroke={fav ? '#ef4444' : '#d1d5db'} />
        </button>
      </div>

      {/* Rating and review count */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">{reviewCount} rating(s)</span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-4xl font-bold text-gray-900">${product.price}</span>
      </div>

      {/* Description */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Quantity selector and Add to cart */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded-lg bg-white">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100">−</button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="w-16 text-center font-bold text-lg text-gray-900 border-l border-r border-gray-300 focus:outline-none"
          />
          <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
        </div>

        <button 
          onClick={handleAddToCart}
          className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Add to cart
        </button>
      </div>

      {/* SKU and Availability */}
      <div className="text-sm text-gray-600 space-y-1 border-t border-gray-200 pt-4">
        <p><span className="font-medium text-gray-700">SKU:</span> SHP-FPM-001</p>
        <p><span className="font-medium text-gray-700">Availability:</span> <span className="text-green-600 font-medium">In stock</span></p>
      </div>
    </div>
  );
}
