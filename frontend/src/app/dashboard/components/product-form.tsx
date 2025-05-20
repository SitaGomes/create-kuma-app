'use client';

import { Button } from '@/components';
import { ROUTES } from '@/constants';
import { notify } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

const schema = zod.object({
  name: zod
    .string()
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  barcode: zod.string(),
  description: zod.string(),
  price: zod.number().min(0),
  minimumQuantity: zod.number().min(1),
  quantity: zod.number().min(0),
  imageUrl: zod.string().optional(),
});

export type ProductForm = zod.infer<typeof schema>;

type Product = {
  id: string;
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  minimumQuantity: number;
  description: string;
  imageUrl: string;
  createdDate: Date;
  updatedDate: Date;
};

type ProductFormProps = {
  token: string;
  product: Product;
};

export const ProductForm = ({ token, product }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      name: product?.name || '',
      barcode: product?.barcode || '',
      price: product?.price || 1,
      quantity: product?.quantity || 1,
      minimumQuantity: product?.minimumQuantity || 1,
      description: product?.description || '',
      imageUrl: product?.imageUrl || '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: ProductForm) => {
    setLoading(true);
    if (product?.id) {
      try {
        console.log(token, {
          ...data,
          id: product.id,
          createdDate: product.createdDate,
          imageUrl: product.imageUrl,
          updatedDate: new Date(),
        });
        notify({ message: 'Produto atualizado com sucesso!', type: 'success' });
        router.push(ROUTES.LIST_PRODUCTS);
      } catch (error) {
        const e = error as Error;
        console.error(e);
        notify({ message: 'Erro ao atualizar produto', type: 'error' });
        return;
      } finally {
        setLoading(false);
      }
      return;
    } else {
      try {
        console.log(token, {
          ...data,
          id: '',
          imageUrl: '',
          updatedDate: new Date(),
          createdDate: new Date(),
        });
        notify({ message: 'Produto cadastrado com sucesso!', type: 'success' });
        router.push(ROUTES.LIST_PRODUCTS);
      } catch (error) {
        const e = error as Error;
        console.error(e);
        notify({ message: 'Erro ao cadastrar produto', type: 'error' });
        return;
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className="w-full p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">
        {product?.id ? 'Atualizar' : 'Cadastrar novo'} produto
      </h1>

      {/* Barcode */}
      <div className="flex flex-col">
        <label htmlFor="barcode" className="font-medium mb-1">
          Código de Barra
        </label>
        <input
          {...register('barcode')}
          type="text"
          className={`border border-gray-300 rounded p-2 ${
            !!product?.barcode ? 'bg-gray-200 cursor-not-allowed' : ''
          }`}
          placeholder="Ex: 123456789"
          disabled={!!product?.barcode}
        />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium mb-1">
          Nome
        </label>
        <input
          {...register('name')}
          type="text"
          className="border border-gray-300 rounded p-2"
          placeholder="Nome do produto"
        />
        {errors?.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label htmlFor="description" className="font-medium mb-1">
          Descrição
        </label>
        <input
          {...register('description')}
          type="text"
          className="border border-gray-300 rounded p-2"
          placeholder="Breve descrição"
        />
        {errors?.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <label htmlFor="price" className="font-medium mb-1">
          Preço
        </label>
        <input
          {...register('price', { valueAsNumber: true })}
          type="number"
          className="border border-gray-300 rounded p-2"
        />
        {errors?.price && (
          <span className="text-red-500 text-sm">{errors.price.message}</span>
        )}
      </div>

      {/* Quantity */}
      <div className="flex flex-col">
        <label htmlFor="quantity" className="font-medium mb-1">
          Quantidade
        </label>
        <input
          {...register('quantity', { valueAsNumber: true })}
          type="number"
          className="border border-gray-300 rounded p-2"
          placeholder="Ex: 10"
        />
        {errors?.quantity && (
          <span className="text-red-500 text-sm">
            {errors.quantity.message}
          </span>
        )}
      </div>

      {/* Minimum Quantity */}
      <div className="flex flex-col">
        <label htmlFor="quantity" className="font-medium mb-1">
          Quantidade minima
        </label>
        <input
          {...register('minimumQuantity', { valueAsNumber: true })}
          type="number"
          className="border border-gray-300 rounded p-2"
          placeholder="Ex: 10"
        />
        {errors?.minimumQuantity && (
          <span className="text-red-500 text-sm">
            {errors.minimumQuantity.message}
          </span>
        )}
      </div>

      {/* ImageUrl */}
      <div className="flex flex-col">
        <label htmlFor="imageUrl" className="font-medium mb-1">
          Foto (URL)
        </label>
        <input
          {...register('imageUrl')}
          type="text"
          className="border border-gray-300 rounded p-2"
          placeholder="Ex: https://example.com/image.jpg"
        />
        {errors?.imageUrl && (
          <span className="text-red-500 text-sm">
            {errors.imageUrl.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <Button loading={loading} type="submit" loadingText="Carregando...">
        {product?.id ? 'Atualizar' : 'Cadastrar'}
      </Button>
    </form>
  );
};
