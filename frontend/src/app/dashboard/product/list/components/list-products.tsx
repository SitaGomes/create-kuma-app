'use client';
import { Button } from '@/components';
import { ROUTES } from '@/constants';
import { Product } from '@/types';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { LuBarcode, LuPlus } from 'react-icons/lu';
import { ProductItem } from './product-item';

type ListProductPageProps = {
  products: Product[];
};

export const ListProductPage = ({ products }: ListProductPageProps) => {
  const [filteredProducts, setFilterProducts] = useState(products);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    if (name) {
      setFilterProducts((currentProducts) => [
        ...currentProducts.filter((p) =>
          p.name.toLowerCase().includes(name.toLowerCase()),
        ),
      ]);
    } else {
      setFilterProducts(products);
    }
  };

  return (
    <div className="flex-grow flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-2">Produtos</h1>
      <div className="flex flex-col-reverse flex-wrap md:flex-row md:flex-nowrap justify-center md:justify-between items-center gap-2">
        <input
          type="text"
          onChange={onChange}
          className="rounded-sm p-2 w-full"
          placeholder="Pesquisar nome..."
        />
        <Link href={ROUTES.SEARCH}>
          <Button className="flex items-center gap-2">
            <LuBarcode />
            <p className="w-max">Pesquisar codigo</p>
          </Button>
        </Link>
        <Link href={ROUTES.REGISTER}>
          <Button className="flex items-center gap-2">
            <LuPlus />
            <p className="w-max">Registrar produto</p>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
