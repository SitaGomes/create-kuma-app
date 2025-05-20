import { getServerSession } from 'next-auth';
import { SearchPage } from './components/search-page';
import { Layout } from '@/components';
import { authOptions } from '@/lib';
import { MEMBER_LEVEL, ROUTES } from '@/constants';
import { redirect } from 'next/navigation';

export default async function RegisterPageServer() {
  const session = await getServerSession(authOptions);

  if (session?.user?.level === MEMBER_LEVEL.SELLER) {
    redirect(ROUTES.HISTORY);
  }

  return (
    <Layout>
      <SearchPage />
    </Layout>
  );
}
