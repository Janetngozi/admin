/**
 * API Client for backend communication
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include', // Important for NextAuth cookies
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}`,
      };
    }

    return data;
  } catch (error: any) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error.message || 'Network error',
    };
  }
}

// Products API
export const productsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.minPrice) searchParams.set('minPrice', params.minPrice.toString());
    if (params?.maxPrice) searchParams.set('maxPrice', params.maxPrice.toString());
    if (params?.featured) searchParams.set('featured', 'true');

    return fetchApi<{
      products: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>(`/api/products?${searchParams.toString()}`);
  },

  getById: async (id: string) => {
    return fetchApi<any>(`/api/products/${id}`);
  },
};

// Cart API
export const cartApi = {
  get: async () => {
    return fetchApi<{ items: any[] }>('/api/cart');
  },

  addItem: async (productId: string, quantity: number = 1) => {
    return fetchApi('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  updateQuantity: async (productId: string, quantity: number) => {
    return fetchApi(`/api/cart/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  removeItem: async (productId: string) => {
    return fetchApi(`/api/cart/${productId}`, {
      method: 'DELETE',
    });
  },

  clear: async () => {
    return fetchApi('/api/cart', {
      method: 'DELETE',
    });
  },
};

// Wishlist API
export const wishlistApi = {
  get: async () => {
    return fetchApi<{ items: any[] }>('/api/wishlist');
  },

  addItem: async (productId: string) => {
    return fetchApi('/api/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },

  removeItem: async (productId: string) => {
    return fetchApi(`/api/wishlist/${productId}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersApi = {
  create: async (orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddressId?: string;
    billingAddressId?: string;
    couponCode?: string;
  }) => {
    return fetchApi<{
      orderId: string;
      orderNumber: string;
      checkoutUrl: string;
    }>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async (params?: { status?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    return fetchApi<{
      orders: any[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>(`/api/orders?${searchParams.toString()}`);
  },

  getById: async (id: string) => {
    return fetchApi<any>(`/api/orders/${id}`);
  },
};

