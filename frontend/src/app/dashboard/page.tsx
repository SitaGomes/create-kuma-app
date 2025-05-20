import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib';
import { Layout } from '@/components';
import { MEMBER_LEVEL, ROUTES } from '@/constants';
import { HomePage } from './components/home-page';
import { redirect } from 'next/navigation';

export default async function HomePageServer() {
  const session = await getServerSession(authOptions);
  if (session?.user?.level === MEMBER_LEVEL.REGISTER) {
    redirect(ROUTES.LIST_PRODUCTS);
  }

  return (
    <Layout>
      <HomePage report={[]} />
    </Layout>
  );
}
