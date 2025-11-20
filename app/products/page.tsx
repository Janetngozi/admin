'use client';

import React, { useState } from 'react';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';
import ProductFilters from './components/ProductFilters';
import ProductGrid from './components/ProductGrid';
import ProductList from './components/ProductList';
import NotificationBanner from './components/NotificationBanner';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlistModal, setWishlistModal] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 1000],
    brands: [] as string[],
    writingType: [] as string[],
    paperType: [] as string[],
    color: [] as string[],
    packSize: [] as string[],
    availability: [] as string[],
  });

  const handleAddToWishlist = (productId: string, isFavorited: boolean) => {
    // isFavorited: true => item was added, false => item was removed
    setWishlistModal({
      type: 'success',
      message: isFavorited
        ? `An item was successfully added to your wishlist.`
        : `item was successfully removed from thr wishlist`,
    });

    setTimeout(() => {
      setWishlistModal({ type: null, message: '' });
    }, 3000);
  };

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner with Frame110 - Full Width (adjusted to match design) */}
      <div
        className="relative h-[480px] bg-cover bg-right"
        style={{ backgroundImage: 'url(/frame110.png)', backgroundPosition: 'right center' }}
      >
        {/* keep background light; remove dark overlay to match design */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Office Products</h1>
            <div className="flex items-center gap-2 text-base text-black justify-center">
              <span>Products</span>
              <span>&gt;</span>
              <span className="underline">Office products</span>
              <span>&gt;</span>
              <span>Binders & accessories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist notification bar (placed immediately after hero) */}
      {wishlistModal.type && (
        <NotificationBanner
          type={wishlistModal.type}
          message={wishlistModal.message}
          onClose={() => setWishlistModal({ type: null, message: '' })}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-64 shrink-0">
            <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Products Section */}
          <main className="flex-1">
            {/* View Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">Showing 12 of 1203 products</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title="Grid View"
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  title="List View"
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Products Display */}
            {viewMode === 'grid' ? (
              <ProductGrid onWishlistClick={handleAddToWishlist} />
            ) : (
              <ProductList onWishlistClick={handleAddToWishlist} />
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12 mb-12">
              <button className="px-3 py-2 border rounded hover:bg-gray-100 text-gray-800">‹</button>
              <button className="px-3 py-2 border rounded bg-blue-500 text-white">1</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-100 text-gray-800">2</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-100 text-gray-800">3</button>
              <button className="px-3 py-2 border rounded hover:bg-gray-100 text-gray-800">›</button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
