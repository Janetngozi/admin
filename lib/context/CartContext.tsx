"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartApi } from '@/lib/api/client';
import { useSession } from 'next-auth/react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  productId?: string;
}

export interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getItemCount: () => number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from database on mount and when session changes
  const refreshCart = async () => {
    if (!session?.user) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await cartApi.get();
      if (response.success && response.data) {
        setItems(response.data.items || []);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [session]);

  const addItem = async (newItem: CartItem) => {
    if (!session?.user) {
      // Fallback to local storage if not logged in
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === newItem.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }
        return [...prevItems, newItem];
      });
      return;
    }

    try {
      const productId = newItem.productId || newItem.id;
      const response = await cartApi.addItem(productId, newItem.quantity);
      if (response.success) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!session?.user) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      return;
    }

    try {
      const response = await cartApi.removeItem(itemId);
      if (response.success) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(itemId);
      return;
    }

    if (!session?.user) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
      return;
    }

    try {
      const response = await cartApi.updateQuantity(itemId, quantity);
      if (response.success) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const clearCart = async () => {
    if (!session?.user) {
      setItems([]);
      return;
    }

    try {
      const response = await cartApi.clear();
      if (response.success) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
