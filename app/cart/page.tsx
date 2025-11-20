"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/context/CartContext';
import { calculateDiscount } from '@/lib/coupons';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';
import CartItemsTable from './components/CartItemsTable';
import PromoCodeInput from './components/PromoCodeInput';
import CartTotal from './components/CartTotal';
import { NotificationBanner } from '@/app/products/components/NotificationBanner';
import ProductGrid from '@/app/products/components/ProductGrid';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'remove';
  } | null>(null);

  const handleApplyCoupon = (code: string, discountValue: number) => {
    setAppliedCoupon(code);
    const discountAmount = calculateDiscount(code, getCartTotal());
    setDiscount(discountAmount);
    setNotification({
      message: `Coupon "${code}" applied successfully!`,
      type: 'success',
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
  };

  const handleAddToWishlist = (item: any) => {
    // This will be integrated with wishlist context later
    removeItem(item.id);
    setNotification({
      message: `An order was added to your wishlist successfully`,
      type: 'success',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemoveItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    removeItem(itemId);
    setNotification({
      message: `An order was removed successfully`,
      type: 'remove',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleQuantityChanged = () => {
    setNotification({
      message: `Items quantity has been successfully updated`,
      type: 'success',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const subtotal = getCartTotal();
  const total = Math.max(0, subtotal - discount);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section with Cart Image - Full Width */}
          <div className="relative h-[480px] bg-cover bg-center -mt-4">
            <Image
              src="/cart.png"
              alt="Shopping Cart"
              fill
              className="object-cover"
            />
          </div>

          {/* Empty Cart Section */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg">
              <div className="mb-6">
                <Image
                  src="/cart2.png"
                  alt="Empty Cart"
                  width={200}
                  height={200}
                  className="w-80 h-auto"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart's feeling a little light.
              </h2>
              <p className="text-gray-600 text-center max-w-md mb-8">
                When you add items, they'll show up here for easy checkout.
              </p>
              <Link
                href="/products"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors mb-16"
              >
                Start shopping
              </Link>
            </div>

            {/* You may also like Section */}
            <div className="mt-16 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">You may also like</h3>
              <ProductGrid onWishlistClick={() => {}} limit={4} />
            </div>

            {/* Recently viewed Section */}
            <div className="mt-16 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">Recently viewed</h3>
              <ProductGrid onWishlistClick={() => {}} limit={4} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Cart Image - Full Width */}
        <div className="relative h-[480px] bg-cover bg-center -mt-4">
          <Image
            src="/cart.png"
            alt="Shopping Cart"
            fill
            className="object-cover"
          />
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="bg-green-600 text-white py-3 text-center">
            {notification.message}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Main Layout: Table on top, Promo Code on bottom-left, Cart Total on bottom-right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Full Width Table at Top */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <CartItemsTable
                  items={items}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onAddToWishlist={handleAddToWishlist}
                  onQuantityChanged={handleQuantityChanged}
                />
              </div>
            </div>

            {/* Bottom Row: Promo Code (Left) & Cart Total (Right) */}
            {/* Promo Code Section - Left */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <PromoCodeInput
                  onApplyCoupon={handleApplyCoupon}
                  appliedCoupon={appliedCoupon}
                  onRemoveCoupon={handleRemoveCoupon}
                />
              </div>
            </div>

            {/* Empty space in middle */}
            <div className="hidden lg:block"></div>

            {/* Cart Total - Right */}
            <div className="lg:col-span-1">
              <CartTotal
                subtotal={subtotal}
                discount={discount}
                total={total}
              />
            </div>
          </div>

          {/* Recently viewed Section */}
          <div className="mt-16 space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">Recently viewed</h3>
            <ProductGrid onWishlistClick={() => {}} limit={4} />
          </div>

          {/* You may also like Section */}
          <div className="mt-16 space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">You may also like</h3>
            <ProductGrid onWishlistClick={() => {}} limit={4} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
