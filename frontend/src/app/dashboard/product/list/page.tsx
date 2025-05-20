import { redirect } from 'next/navigation';
import { MEMBER_LEVEL, ROUTES } from '@/constants';
import { Layout } from '@/components';
import { ListProductPage } from './components/list-products';
import { authOptions, fetchAllProductsAsync } from '@/lib';
import { getServerSession } from 'next-auth';

export default async function HomePageServer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTES.LOGIN);
  }

  if (session?.user?.level === MEMBER_LEVEL.SELLER) {
    redirect(ROUTES.HISTORY);
  }

  const products = await fetchAllProductsAsync(session.user.accessToken || '');

  return (
    <Layout>
      <ListProductPage products={products} />
    </Layout>
  );
}
