import { updateProductAsync } from '@/lib';
import { Product } from '@/types';

export const mutateUpdateProduct = async (userId: string, product: Product) => {
  const updateProduct = async () => {
    try {
      const response = await updateProductAsync(userId, product);
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  return updateProduct();
};
