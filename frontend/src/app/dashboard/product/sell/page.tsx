import { Layout } from '@/components';
import { ROUTES } from '@/constants';
import { authOptions } from '@/lib';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { createParser, createSearchParamsCache } from 'nuqs/server';
import { Product } from '@/types';

import { CartPage } from './components/cart-page';

const jsonArrayParser = createParser({
  parse(query: string) {
    // If the query does not start with [, add square brackets.
    if (!query.trim().startsWith('[')) {
      query = `[${query}]`;
    }
    return JSON.parse(query);
  },
  serialize(value: Product[]) {
    return JSON.stringify(value);
  },
}).withDefault([]);

const searchParamsCache = createSearchParamsCache({
  products: jsonArrayParser, // use your custom parser that wraps the value in [ ]
});

export default async function SellCartServer({
  params,
}: {
  params: Promise<{ products?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTES.LOGIN);
  }
  const cacheProducts = searchParamsCache.parse(params);
  const products = (await cacheProducts).products;

  return (
    <Layout>
      <CartPage
        token={session.user.accessToken || ''}
        initialState={products}
      />
    </Layout>
  );
}
