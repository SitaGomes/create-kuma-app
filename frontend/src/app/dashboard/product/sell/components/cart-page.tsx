'use client';
import {
  Button,
  CameraDialog,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components';
import { fetchProductByBarcodeAsync, notify, sellCartAsync } from '@/lib';
import { Product } from '@/types';
import { QuaggaJSResultObject } from '@ericblade/quagga2';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LuTrash } from 'react-icons/lu';

import { parseAsArrayOf, parseAsJson, useQueryState } from 'nuqs';

import zod from 'zod';

type CartPageProps = {
  token: string;
  initialState: Product[];
};

const product = zod.object({
  id: zod.string(),
  name: zod.string(),
  barcode: zod.string(),
  price: zod.number(),
  quantity: zod.number(),
  description: zod.string(),
  minimumQuantity: zod.number(),
  imageUrl: zod.string(),
  createdDate: zod.date(),
  updatedDate: zod.date(),
});

export const CartPage = ({ token, initialState }: CartPageProps) => {
  const [cart, setCart] = useQueryState(
    'products',
    parseAsArrayOf(parseAsJson(product.parse)).withDefault([]).withOptions({
      history: 'push',
    }),
  );

  const [open, setOpen] = useState(false);
  const [openSellDialog, setOpenSellDialog] = useState(false);
  const [isLoadingSellCart, setIsLoadingSellCart] = useState(false);

  const handleGetProduct = async (result: QuaggaJSResultObject) => {
    const productCode = result.codeResult.code || '';
    await handleAddProduct(productCode);
  };

  const handleAddProduct = async (productCode: string) => {
    try {
      const product = await fetchProductByBarcodeAsync(
        token || '',
        productCode,
      );

      if (!product) {
        notify({ message: 'Produto não encontrado', type: 'error' });
        return;
      }

      notify({ message: 'Produto adicionado ao carrinho', type: 'success' });
      setCart((cart) => {
        return cart ? [...cart, product] : [product];
      });
    } catch (err) {
      console.error(err);
      notify({ message: 'Produto não encontrado', type: 'error' });
      return;
    } finally {
      setOpen(false);
    }
  };

  const handleRemoveProduct = (index: number) => {
    setCart((cart) => (cart ? cart?.filter((_, i) => i !== index) : []));
  };

  const handleSellCart = async () => {
    setIsLoadingSellCart(true);
    try {
      await sellCartAsync(token, cart);
      notify({ message: 'Compra finalizada com sucesso', type: 'success' });
      setCart([]);
    } catch (err) {
      console.error(err);
      notify({ message: 'Erro ao finalizar a compra', type: 'error' });
    } finally {
      setIsLoadingSellCart(false);
      setOpenSellDialog(false);
    }
  };

  useEffect(() => {
    setCart(initialState);
  }, [initialState, setCart]);

  return (
    <div className="flex-grow flex flex-col gap-3">
      <div className="flex justify-between gap-3">
        <h1 className="text-2xl font-bold mb-2">Carrinho</h1>

        <CameraDialog
          open={open}
          onOpenChange={setOpen}
          title="Adicionar produto ao carrinho"
          handleGetProduct={handleGetProduct}
        >
          <Button>Adicionar produto</Button>
        </CameraDialog>
      </div>

      <div className="my-3 py-3 border-y-2 flex flex-col gap-3">
        {cart?.length === 0 ? (
          <>
            <p className="text-lg text-center text-gray-500">
              Nenhum produto adicionado ao carrinho
            </p>
          </>
        ) : (
          <>
            {cart?.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-3 bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      product.imageUrl ||
                      'https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA%3D'
                    }
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    width={64}
                    height={64}
                  />
                  <div>
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveProduct(index)}
                >
                  <div className="flex items-center gap-1">
                    <LuTrash />
                    Remover
                  </div>
                </Button>
              </div>
            ))}
          </>
        )}
      </div>

      <Dialog open={openSellDialog} onOpenChange={setOpenSellDialog}>
        <DialogTrigger asChild>
          <Button variant={'accept'} disabled={cart?.length === 0}>
            Confirmar compra
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full lg:max-w-3xl">
          <DialogTitle>Confirmar compra dos produtos</DialogTitle>
          <Button
            variant={'accept'}
            onClick={handleSellCart}
            loading={isLoadingSellCart}
            loadingText="Finalizando compra..."
          >
            Finalizar compra
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
