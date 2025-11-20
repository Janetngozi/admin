"use client";

import React from 'react';
import ProductGrid from './ProductGrid';
import { getRelatedProducts } from '@/lib/products';

interface RelatedProductsProps {
  productId: string;
}

export default function RelatedProducts({ productId }: RelatedProductsProps) {
  // simple reuse of ProductGrid with related products from database
  return (
    <div className="space-y-12">
      <section className="pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Best sellers</h3>
        <ProductGrid onWishlistClick={() => {}} />
      </section>

      <section className="pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recently viewed</h3>
        <ProductGrid onWishlistClick={() => {}} />
      </section>

      <section className="pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">You may also like</h3>
        <ProductGrid onWishlistClick={() => {}} />
      </section>
    </div>
  );
}
