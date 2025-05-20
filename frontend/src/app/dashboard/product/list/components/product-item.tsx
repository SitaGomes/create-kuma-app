import { ROUTES } from '@/constants';
import { Product } from '@/types';
import { formatCurrency } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { LuPencil } from 'react-icons/lu';

type ProductItemProps = {
  product: Product;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link key={product.id} href={`${ROUTES.EDIT}/${product.barcode}`}>
      <li className="flex items-center justify-between p-4 rounded bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-4">
          <Image
            src={
              product.imageUrl ||
              'https://previews.123rf.com/images/canbiri/canbiri1806/canbiri180600031/103430610-box-simple-flat-design-vector-drawing-draft.jpg'
            }
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
            width={80}
            height={80}
          />

          <div>
            <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Código de barras: {product.barcode}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Quantidade: {product.quantity}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Preço: <b>{formatCurrency(product.price)}</b>
            </p>
          </div>
        </div>
        <div className="text-gray-800 dark:text-gray-100">
          <LuPencil size={22} />
        </div>
      </li>
    </Link>
  );
};
