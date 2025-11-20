'use client';

import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
}

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const products: Product[] = [
    {
      id: 1,
      name: 'Fateboard Workbase - Floor Mat',
      price: 150,
      image: '/Rectangle 10.png',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'SHARPE Fine Point Markers - Pack of 12',
      price: 150,
      image: '/Rectangle 11.png',
      isFavorite: false,
    },
    {
      id: 3,
      name: 'BLABLUI NOTEBOOKS Flexible Binding - 3 Subjects',
      price: 150,
      image: '/Rectangle 12.png',
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Oral Antibacterial Foaming Hand Wash, 1,200 mL',
      price: 150,
      image: '/Rectangle 13.png',
      isFavorite: false,
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  // Get visible products for grid
  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(products[(currentIndex + i) % products.length]);
    }
    return visible;
  };

  const visibleProducts = getVisibleProducts();

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Best sellers
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrevSlide}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400" />
            </button>
            <button
              onClick={handleNextSlide}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Next products"
            >
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Product Image */}
              <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden h-56 md:h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className="w-5 h-5"
                    fill={favorites[product.id] ? '#ef4444' : 'none'}
                    stroke={favorites[product.id] ? '#ef4444' : '#d1d5db'}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col grow">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-10">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4 mt-auto">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full py-2 px-4 border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-medium rounded-lg transition-colors duration-200 text-sm">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
