import { createProductAsync } from '@/lib';
import { Product } from '@/types';

export const mutateCreateProduct = async (token: string, product: Product) => {
  const createProduct = async () => {
    try {
      const response = await createProductAsync(token, product);
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  return createProduct();
};
