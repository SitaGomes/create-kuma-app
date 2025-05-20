import { Layout } from '@/components';

import { RegisterPage } from './components/register-page';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib';
import { redirect } from 'next/navigation';
import { MEMBER_LEVEL, ROUTES } from '@/constants';

export default async function RegisterPageServer() {
  const session = await getServerSession(authOptions);

  if (session?.user?.level === MEMBER_LEVEL.SELLER) {
    redirect(ROUTES.HISTORY);
  }

  return (
    <Layout>
      <RegisterPage />
    </Layout>
  );
}
