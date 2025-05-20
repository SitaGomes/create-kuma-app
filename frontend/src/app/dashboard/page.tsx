import { getServerSession } from 'next-auth';
import { authOptions, fetchReportsAsync } from '@/lib';
import { Layout } from '@/components';
import { MEMBER_LEVEL, ROUTES } from '@/constants';
import { HomePage } from './components/home-page';
import { redirect } from 'next/navigation';

export default async function HomePageServer() {
  const session = await getServerSession(authOptions);
  if (session?.user?.level === MEMBER_LEVEL.REGISTER) {
    redirect(ROUTES.LIST_PRODUCTS);
  }

  const report = await fetchReportsAsync(session?.user?.accessToken || '');

  return (
    <Layout>
      <HomePage report={report} />
    </Layout>
  );
}
