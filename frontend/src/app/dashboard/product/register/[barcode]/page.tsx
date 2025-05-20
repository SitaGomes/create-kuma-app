import { ROUTES } from '@/constants';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions, fetchProductByBarcodeAsync } from '@/lib';
import { ProductForm } from '@/app/dashboard/components/product-form';
import { Layout } from '@/components';

export default async function RegisterPageServer({
  params,
}: {
  params: Promise<{ barcode: string }>;
}) {
  const barcode = (await params).barcode;
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    redirect(ROUTES.LOGIN);
  }

  if (!barcode) {
    redirect(ROUTES.HOME);
  }

  const productExists = await fetchProductByBarcodeAsync(
    session.user.accessToken || '',
    barcode,
  );

  if (productExists) {
    redirect(`${ROUTES.EDIT}/${barcode}`);
  }

  const product = {
    barcode,
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    imageUrl: '',
    id: '',
    minimumQuantity: 0,
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  return (
    <Layout>
      <ProductForm token={session.user.accessToken || ''} product={product} />
    </Layout>
  );
}
