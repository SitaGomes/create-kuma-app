import { Layout } from '@/components';
import { authOptions, fetchAllSellHistoriesAsync } from '@/lib';
import { ROUTES } from '@/constants';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { HistoryPage } from './components/HistoryPage';

export default async function SellProductServer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTES.LOGIN);
  }

  const history = await fetchAllSellHistoriesAsync(
    session.user.accessToken || '',
  );

  return (
    <Layout>
      <HistoryPage histories={history} />
    </Layout>
  );
}
