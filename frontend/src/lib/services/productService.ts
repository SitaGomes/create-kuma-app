'use server';
import { Product, AppHistory } from '@/types';
import { BASE_URL, REVALIDATE_TIME } from '../api';
import { revalidateTag } from 'next/cache';
import { CACHE } from '@/constants/CACHE';

export const fetchAllProductsAsync = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/product`, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: REVALIDATE_TIME, // 1 hour
        tags: [CACHE.PRODUCTS],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const products = await response.json();

    return products as Promise<Product[]>;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductByBarcodeAsync = async (
  token: string,
  productCode: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/product/barcode/${productCode}`, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: REVALIDATE_TIME * 3, // 3 hour
        tags: [`${CACHE.PRODUCT}-${productCode}`],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const text = await response.text();

    if (!text) {
      console.warn(
        `Empty response received for product barcode ${productCode}`,
      );
      return null;
    }

    const product = JSON.parse(text);
    return product as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchAllSellHistoriesAsync = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/product/history`, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: REVALIDATE_TIME, // 1 hour
        tags: [CACHE.HISTORIES],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const sellHistories = await response.json();

    return sellHistories as Promise<AppHistory[]>;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchSellHistoryAsync = async (token: string, id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/product/history/${id}`, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: REVALIDATE_TIME, // 1 hour
        tags: [`${CACHE.HISTORY}-${id}`],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const sellHistory = await response.json();

    return sellHistory as Promise<AppHistory>;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProductAsync = async (token: string, product: Product) => {
  try {
    await fetch(`${BASE_URL}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    revalidateTag(CACHE.PRODUCTS);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProductAsync = async (token: string, product: Product) => {
  try {
    await fetch(`${BASE_URL}/product`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    revalidateTag(CACHE.PRODUCTS);
    revalidateTag(`${CACHE.PRODUCT}-${product.barcode}`);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProductAsync = async (token: string, productId: string) => {
  try {
    await fetch(`${BASE_URL}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag(CACHE.PRODUCTS);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const sellCartAsync = async (token: string, products: Product[]) => {
  try {
    await fetch(`${BASE_URL}/product/sell`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(products),
    });

    revalidateTag(CACHE.CART_HISTORY);
  } catch (error) {
    console.error('Error selling cart:', error);
    throw error;
  }
};
