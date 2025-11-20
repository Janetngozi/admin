"use client";

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useProducts } from '@/lib/hooks/useProducts';

interface ProductGridProps {
  onWishlistClick: (productId: string, success: boolean) => void;
  onAddToCart?: (message: string) => void;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

export default function ProductGrid({ 
  onWishlistClick, 
  onAddToCart, 
  limit,
  category,
  search,
  minPrice,
  maxPrice,
  featured,
}: ProductGridProps) {
  const { products, isLoading } = useProducts({
    limit: limit || 20,
    category,
    search,
    minPrice,
    maxPrice,
    featured,
  });
  
  const { addItem } = useCart();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();

  // Check which items are in wishlist
  const isFavorite = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const toggleFavorite = async (product: typeof products[0]) => {
    const wasFavorite = isFavorite(product.id);
    
    if (wasFavorite) {
      // Remove from wishlist
      await removeFromWishlist(product.id);
    } else {
      // Add to wishlist
      await addToWishlist({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '',
        quantity: 1,
      });
    }
    onWishlistClick(product.id, !wasFavorite);
  };

  const handleAddToCart = async (product: typeof products[0]) => {
    await addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || '',
    });
    onAddToCart?.(`${product.name} added to cart!`);
  };

  const productsToDisplay = limit ? products.slice(0, limit) : products;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (productsToDisplay.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {productsToDisplay.map((product) => (
        <div key={product.id} className="group flex flex-col">
          {/* Product Image */}
          <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden h-56 md:h-64">
            <Link href={`/products/${product.id}`} className="block w-full h-full">
              <img
                src={product.images?.[0] || '/Rectangle 10.png'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(product)}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              aria-label="Add to favorites"
            >
              <Heart
                className="w-5 h-5"
                fill={isFavorite(product.id) ? '#ef4444' : 'none'}
                stroke={isFavorite(product.id) ? '#ef4444' : '#d1d5db'}
              />
            </button>
          </div>

          {/* Product Info */}
          <div className="flex flex-col grow">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-10">
              <Link href={`/products/${product.id}`} className="hover:underline">{product.name}</Link>
            </h3>
            <div className="flex items-center justify-between mb-4 mt-auto">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => handleAddToCart(product)}
            className="w-full py-2 px-4 border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-900 font-medium rounded-lg transition-colors duration-200 text-sm"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
