import { WishlistItem } from '@/lib/types/Wishlist';

const WISHLIST_STORAGE_KEY = 'stec_wishlist';

export const saveWishlist = (items: WishlistItem[]): void => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save wishlist:', error);
  }
};

export const getWishlist = (): WishlistItem[] => {
  try {
    const wishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Failed to get wishlist:', error);
    return [];
  }
};

export const addToWishlist = (item: WishlistItem): WishlistItem[] => {
  const wishlist = getWishlist();
  const exists = wishlist.find((w) => w.id === item.id);
  
  if (!exists) {
    const updated = [item, ...wishlist];
    saveWishlist(updated);
    return updated;
  }
  return wishlist;
};

export const removeFromWishlist = (id: string): WishlistItem[] => {
  const wishlist = getWishlist();
  const updated = wishlist.filter((item) => item.id !== id);
  saveWishlist(updated);
  return updated;
};

export const clearWishlist = (): void => {
  try {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear wishlist:', error);
  }
};
