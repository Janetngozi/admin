'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useWishlist } from '@/lib/context/WishlistContext';
import { useCart } from '@/lib/context/CartContext';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';
import ProductGrid from '@/app/products/components/ProductGrid';
import WishlistTable from '@/app/components/wishlist/WishlistTable';
import SuccessNotification from '@/app/components/wishlist/SuccessNotification';
import ConfirmModal from '@/app/components/wishlist/ConfirmModal';
import EmptyWishlist from '@/app/components/wishlist/EmptyWishlist';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, addAllToCart } = useWishlist();
  const { addItem } = useCart();
  
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showAddAllModal, setShowAddAllModal] = useState(false);
  const [removeItemId, setRemoveItemId] = useState<string | null>(null);

  const handleAddToCart = (item: any) => {
    addItem(item);
    setNotification({ message: `${item.name} added to cart`, type: 'success' });
  };

  const handleRemoveItem = (itemId: string) => {
    setRemoveItemId(itemId);
  };

  const confirmRemoveItem = () => {
    if (removeItemId) {
      const item = items.find((i) => i.id === removeItemId);
      removeItem(removeItemId);
      setNotification({ message: `${item?.name} removed from wishlist`, type: 'success' });
      setRemoveItemId(null);
    }
  };

  const confirmClearWishlist = () => {
    clearWishlist();
    setNotification({ message: 'Wishlist cleared', type: 'success' });
    setShowClearModal(false);
  };

  const confirmAddAllToCart = () => {
    items.forEach((item) => {
      addItem(item);
    });
    setNotification({ message: 'All items added to cart', type: 'success' });
    setShowAddAllModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Banner */}
      <div className="relative h-96 w-full">
        <Image
          src="/wishlist.png"
          alt="Wishlist banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">My Wishlist</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="grow">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {items.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <div>
              {/* Buttons */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 font-medium">{items.length} items in your wishlist</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddAllModal(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add all to cart
                  </button>
                  <button
                    onClick={() => setShowClearModal(true)}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <WishlistTable
                  items={items}
                  onAddToCart={handleAddToCart}
                  onRemove={handleRemoveItem}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Best Sellers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Best sellers</h2>
            <ProductGrid 
              onWishlistClick={() => {}} 
              limit={4}
            />
          </section>

          {/* Recently Viewed */}
          <section className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently viewed</h2>
            <ProductGrid 
              onWishlistClick={() => {}} 
              limit={4}
            />
          </section>

          {/* You May Also Like */}
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You may also like</h2>
            <ProductGrid 
              onWishlistClick={() => {}} 
              limit={4}
            />
          </section>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      {removeItemId && (
        <ConfirmModal
          isOpen={true}
          title="Remove from Wishlist?"
          message="Are you sure you want to remove this item from your wishlist?"
          confirmText="Remove"
          isDangerous
          onConfirm={confirmRemoveItem}
          onCancel={() => setRemoveItemId(null)}
        />
      )}

      {showClearModal && (
        <ConfirmModal
          isOpen={true}
          title="Clear Wishlist?"
          message="Are you sure you want to remove all items from your wishlist? This action cannot be undone."
          confirmText="Clear"
          isDangerous
          onConfirm={confirmClearWishlist}
          onCancel={() => setShowClearModal(false)}
        />
      )}

      {showAddAllModal && (
        <ConfirmModal
          isOpen={true}
          title="Add All to Cart?"
          message={`Add all ${items.length} items to your cart?`}
          confirmText="Add to Cart"
          onConfirm={confirmAddAllToCart}
          onCancel={() => setShowAddAllModal(false)}
        />
      )}

      {/* Success Notification */}
      {notification && (
        <SuccessNotification
          message={notification.message}
          isVisible={true}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
