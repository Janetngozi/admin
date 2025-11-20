"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';
import ProductGallery from '@/app/products/components/ProductGallery';
import ProductDetails from '@/app/products/components/ProductDetails';
import ProductTabs from '@/app/products/components/ProductTabs';
import RelatedProducts from '@/app/products/components/RelatedProducts';
import NotificationBanner from '@/app/products/components/NotificationBanner';
import { getProductById } from '@/lib/products';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const [banner, setBanner] = React.useState<{ type: 'success' | 'error' | 'remove'; message: string } | null>(null);

  const handleWishlist = (productId: string, isFavorited: boolean) => {
    setBanner({
      type: 'success',
      message: isFavorited
        ? 'An item was successfully added to your wishlist.'
        : 'item was successfully removed from your wishlist',
    });
    setTimeout(() => setBanner(null), 3000);
  };

  const handleAddToCart = (message: string) => {
    setBanner({
      type: 'success',
      message: message,
    });
    setTimeout(() => setBanner(null), 3000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page hero / breadcrumb area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-sm text-gray-600 mb-4">Products &gt; Office products &gt; Binders & accessories</div>
      </div>

      {/* Inline banner */}
      {banner && (
        <NotificationBanner type={banner.type} message={banner.message} onClose={() => setBanner(null)} />
      )}

      {/* Main product area */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <ProductGallery images={product.images || [product.image]} />
            </div>

            <div className="lg:col-span-7">
              <ProductDetails product={product} onWishlist={handleWishlist} onAddToCart={handleAddToCart} />
            </div>
          </div>

          <div className="mt-8">
            <ProductTabs product={product} />
          </div>
        </div>

        <div className="mt-8">
          <RelatedProducts productId={productId} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
