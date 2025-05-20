import { MEMBER_LEVEL, ROUTES } from '@/constants';
import { authOptions, fetchProductByBarcodeAsync } from '@/lib';
import { ProductForm } from '../../components/product-form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Layout } from '@/components';

export default async function EditProductServer({
  params,
}: {
  params: Promise<{ barcode: string }>;
}) {
  const barcode = (await params).barcode;

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTES.LOGIN);
  }

  if (session?.user?.level === MEMBER_LEVEL.SELLER) {
    redirect(ROUTES.HISTORY);
  }

  const product = await fetchProductByBarcodeAsync(
    session.user.accessToken || '',
    barcode,
  );

  if (!product) {
    redirect(ROUTES.LIST_PRODUCTS);
  }

  return (
    <Layout>
      <ProductForm token={session.user.accessToken || ''} product={product} />
    </Layout>
  );
}
