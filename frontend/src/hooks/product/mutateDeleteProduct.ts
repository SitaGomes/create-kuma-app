import { deleteProductAsync } from '@/lib';

export const mutateDeleteProduct = async (
  userId: string,
  productId: string,
) => {
  const deleteProduct = async () => {
    try {
      const response = await deleteProductAsync(userId, productId);
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  return deleteProduct();
};
