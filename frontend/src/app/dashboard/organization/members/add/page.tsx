import { Layout } from '@/components';
import { authOptions } from '@/lib';
import { getServerSession } from 'next-auth';
import { MEMBER_LEVEL, ROUTES } from '@/constants';
import { redirect } from 'next/navigation';
import { AddMembersPage } from './components/add-member';

export default async function MembersPageServer() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    redirect(ROUTES.LOGIN);
  }

  if (session?.user?.level === MEMBER_LEVEL.REGISTER) {
    redirect(ROUTES.LIST_PRODUCTS);
  }

  if (session?.user?.level === MEMBER_LEVEL.SELLER) {
    redirect(ROUTES.HISTORY);
  }

  return (
    <Layout>
      <AddMembersPage
        token={session.user?.accessToken || ''}
        orgId={session.user?.orgId || ''}
      />
    </Layout>
  );
}
