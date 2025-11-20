'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WishlistItem, WishlistContextType } from '@/lib/types/Wishlist';
import { wishlistApi } from '@/lib/api/client';
import { useSession } from 'next-auth/react';
import { getWishlist, saveWishlist, clearWishlist as clearWishlistStorage } from '@/lib/utils/wishlistStorage';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from database or localStorage
  const refreshWishlist = async () => {
    if (!session?.user) {
      // Fallback to localStorage if not logged in
      const wishlist = getWishlist();
      setItems(wishlist);
      setIsLoaded(true);
      return;
    }

    try {
      setIsLoaded(false);
      const response = await wishlistApi.get();
      if (response.success && response.data) {
        setItems(response.data.items || []);
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, [session]);

  const addItem = async (item: WishlistItem) => {
    if (!session?.user) {
      // Fallback to localStorage
      setItems((prev) => {
        const exists = prev.find((w) => w.id === item.id);
        if (exists) return prev;
        
        const updated = [item, ...prev];
        saveWishlist(updated);
        return updated;
      });
      return;
    }

    try {
      const productId = item.productId || item.id;
      const response = await wishlistApi.addItem(productId);
      if (response.success) {
        await refreshWishlist();
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  const removeItem = async (id: string) => {
    if (!session?.user) {
      // Fallback to localStorage
      setItems((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        saveWishlist(updated);
        return updated;
      });
      return;
    }

    try {
      const response = await wishlistApi.removeItem(id);
      if (response.success) {
        await refreshWishlist();
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const clearWishlist = async () => {
    if (!session?.user) {
      setItems([]);
      clearWishlistStorage();
      return;
    }

    // Clear all items one by one (or we could add a bulk delete endpoint)
    try {
      for (const item of items) {
        await wishlistApi.removeItem(item.id);
      }
      await refreshWishlist();
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
    }
  };

  const addAllToCart = (onAddToCart: (items: WishlistItem[]) => void) => {
    onAddToCart(items);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, clearWishlist, addAllToCart }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
