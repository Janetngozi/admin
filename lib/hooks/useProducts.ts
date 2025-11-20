'use client';

import { useState, useEffect } from 'react';
import { productsApi } from '@/lib/api/client';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  tags: string[];
  inStock: boolean;
  stockQty: number;
  isFeatured?: boolean;
}

export function useProducts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productsApi.getAll(params);
        
        if (response.success && response.data) {
          setProducts(response.data.products);
          setPagination(response.data.pagination);
        } else {
          setError(response.error || 'Failed to fetch products');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [params?.page, params?.limit, params?.category, params?.search, params?.minPrice, params?.maxPrice, params?.featured]);

  return { products, isLoading, error, pagination };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productsApi.getById(id);
        
        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          setError(response.error || 'Product not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, isLoading, error };
}

